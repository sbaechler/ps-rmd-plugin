(function() {

  var app = angular.module('app', []);

  app.controller('MainController', ['$scope', 'csInterface', function ($scope, csInterface) {
        csInterface.evalScript('sayHello()');
        $scope.greeting = 'Hallo';
      }]);


  themeManager.init();

}());