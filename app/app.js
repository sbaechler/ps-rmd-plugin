(function() {

  var app = angular.module('app', []);

  app.controller('MainController', ['$scope', 'csInterface', 'themeManager',
    function ($scope, csInterface, themeManager) {
      themeManager.init();

      // csInterface.evalScript('sayHello()');

      $scope.greeting = 'Hallo';
    }]);
}());