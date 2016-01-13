(function(global) {
  themeManager.init();

  var app = angular.module('app', ['ngLodash']);

  app.controller('MainController', ['$scope', 'csInterface', 'RMD',
    function ($scope, csInterface, RMD) {

      // csInterface.evalScript('sayHello()');

      $scope.greeting = 'Hallo';
      $scope.rmd = RMD.rmd;

      // TODO: Remove debugging exposures.
      global._scope = $scope;
      global.RMD = RMD;

    }
  ])
  .directive('xmpExtract', ['XMPBridge', 'xmlNamespaces', function(XMPBridge, ns){
    return {
      restrict: 'A',
      link: function(scope, elm, attrs){

        scope.allowedDerivates_Crop = true;

        XMPBridge.onInit(function(state) {
          if(!state.isError) {
            // retrieve a descriptive name for the active target item (e.g. active document, footage, ...)
            XMPBridge.getTargetName(function(targetName) {
              scope.targetName = targetName;
              scope.$apply();
            });
            XMPBridge.read(ns.exif, 'PixelXDimension', function(value){
              scope.xDimension = value;
              scope.$apply();
            });
            global.bridge = XMPBridge;
            global.ns = ns;


          } else {
            throw new Error('Failed to load XMP Bridge.');
          }
        });
      }
    }
  }]);

}(window));
