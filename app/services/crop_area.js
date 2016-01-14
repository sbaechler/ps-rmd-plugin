angular.module('app')
.directive('cropAreas', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/crop_areas.html',
    link: function(scope, element, attr) {
    }
  };
})

.directive('cropArea', ['lodash', function(_){

  var areaTemplate = {
    "unit": {
        "__prefix": "stArea",
        "__text": "normalized"
    },
    "x": {
      "__prefix": "stArea",
      "__text": "0.500000"
    },
    "y": {
      "__prefix": "stArea",
      "__text": "0.500000"
    },
    "w": {
      "__prefix": "stArea",
      "__text": "0.500000"
    },
    "h": {
      "__prefix": "stArea",
      "__text": "0.500000"
    },
    "_rdf:parseType": "Resource",
    "__prefix": "rmd"
  };

  return {
    restrict: 'E',
    templateUrl: '../templates/crop_area.html',
    scope: {
      title: '@',
      struct: '=struct'
    },
    link: function(scope, element, attr) {
      _.defaultsDeep(scope.struct, areaTemplate);

    }
  };
}]);

