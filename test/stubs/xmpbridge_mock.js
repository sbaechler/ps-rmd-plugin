module(function($provide) {
  $provide.service('XMPBridge', function(){
    this.onInit = jasmine.createSpy('onInit').andCallFake(function(){
      return function(initHandler) {
        initHandler({isError: false, statusMessage: 'mocked Init Handler'});
      };
    });
  });
});