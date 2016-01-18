(function(){

angular.module('app')
.factory('csInterface', function(){
  var csInterface = new CSInterface();

  return csInterface;
})
.factory('CSEvent', function(){
  return CSEvent;
});

}());