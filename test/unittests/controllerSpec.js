describe('MainController Test', function(){


  var mockCsInterface = {
    getExtensionID: jasmine.createSpy('getExtensionID').and.callFake(function(){
      return 'test.universalimages';
    }),
    dispatchEvent: jasmine.createSpy('dispatchEvent').and.callFake(function(){}),
    evalScript: jasmine.createSpy('evalScript').and.callFake(function(name, callback){
      callback('{}');
    }),
    addEventListener: jasmine.createSpy('addEventListener').and.callFake(function(){})
  };
  var RMD = {
    extractXMP: function(){
      return new Promise(function(resolve){
        resolve();
      });
    }
  };
  var mockCSEvent = function(){};
  var rmdDefault,
      _,
      psEvent,
      rmdFrameStruct,
      scope;

  beforeEach(function() {
    module('app', function($provide){
      $provide.value('csInterface', mockCsInterface);
      $provide.value('rmdBridge', RMD);
      $provide.value('CSEvent', mockCSEvent);
    });

    inject(function(_rmdDefault_,_lodash_,_psEvent_,_rmdFrameStruct_) {
      rmdDefault = _rmdDefault_;  // The default XMP object
      _ = _lodash_;
      psEvent = _psEvent_;  // Photoshop Event IDs Enum
      rmdFrameStruct = _rmdFrameStruct_;  // Template for a RMD Frame
      RMD.xmp = _.clone(rmdFrameStruct);
      RMD.targetName = 'Controller Spec';

    });

    inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      $controller('MainController', {
        $scope: scope
      });

      scope.$digest();
    });

  });


  it('Initialized correctly', function(){

  });

});
