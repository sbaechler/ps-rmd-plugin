describe('MainController Test', function(){


  var mockCsInterface = {
    getExtensionID: jasmine.createSpy('getExtensionID').and.callFake(function(){
      return 'test.universalimages';
    }),
    dispatchEvent: jasmine.createSpy('dispatchEvent').and.callFake(function(){}),
    evalScript: jasmine.createSpy('evalScript').and.callFake(function(name, callback){
      if(callback) {
        callback('{}');
      }
    }),
    addEventListener: jasmine.createSpy('addEventListener').and.callFake(function(){})
  };
  var RMD = { };
  var mockCSEvent = function(){};
  var rmdDefault,
      _,
      psEvent,
      rmdFrameStruct,
      csInterface,
      controller,
      activeArea,
      scope;

  var areaValues = {"_obj":"rectangle","bottom":{"_unit":"pixelsUnit","_value":307},"left":{"_unit":"pixelsUnit","_value":84},"right":{"_unit":"pixelsUnit","_value":280},"top":{"_unit":"pixelsUnit","_value":83}};

  beforeEach(function(done) {
    module('app', function($provide){
      $provide.value('csInterface', mockCsInterface);
      $provide.value('rmdBridge', RMD);
      $provide.value('CSEvent', mockCSEvent);
    });

    inject(function(_rmdDefault_,_lodash_,_psEvent_,_rmdFrameStruct_,
                    _csInterface_, $controller, $rootScope) {
      rmdDefault = _rmdDefault_;  // The default XMP object
      _ = _lodash_;
      psEvent = _psEvent_;  // Photoshop Event IDs Enum
      rmdFrameStruct = _rmdFrameStruct_;  // Template for a RMD Frame
      csInterface = _csInterface_;

      RMD.extractXMP = function(){
        return new Promise(function(resolve){
          RMD.xmp = _.cloneDeep(rmdDefault);
          scope.rmd = RMD.xmp.xmpmeta.RDF.Description;
          resolve();
        });
      };

      RMD.targetName = 'Controller Spec';

      scope = $rootScope.$new();

      controller = $controller('MainController', {
        $scope: scope,
        csInterface: csInterface,
        RMD: RMD
      });
      scope.documentSize = {width: 400, height: 400};


      scope.$digest();
    });
    done();

  });

  it('Initialized correctly', function(){
    expect(typeof scope.addCropArea).toBe('function');
    expect(typeof scope.commit).toBe('function');
    expect(typeof scope.rmd).toBe('object');
    expect(typeof scope.rmd.AppliedToDimensions).toBe('object');
    expect(scope.rmd.MinWidth).toBe(undefined);
  });
  it('Correctly creates nodes for an area', function() {
    var node;
    expect(typeof scope.rmd.SafeArea).toBe('undefined');
    expect(typeof scope.rmd.CropArea).toBe('undefined');
    expect(typeof scope.rmd.RecommendedFrames).toBe('object');
    expect(typeof scope.rmd.RecommendedFrames.Bag.li).toBe('object');
    expect(scope.rmd.RecommendedFrames.Bag.li.length).toBe(0);

    // add the default crop area
    scope.addCropArea('default');
    expect(typeof scope.rmd.CropArea).toBe('object');
    expect(scope.rmd.CropArea.x).toBe(undefined);
    expect(scope.rmd.CropArea.y).toBe(undefined);
    expect(scope.rmd.CropArea.w).toBe(undefined);
    expect(scope.rmd.CropArea.h).toBe(undefined);
    expect(scope.rmd.CropArea['_stArea:x']).toBe('0.500000');
    expect(scope.rmd.CropArea['_stArea:y']).not.toBe(undefined);
    expect(scope.rmd.CropArea['_stArea:w']).not.toBe(undefined);
    expect(scope.rmd.CropArea['_stArea:h']).not.toBe(undefined);
    expect(scope.rmd.MaxWidth).toBe(undefined);
    expect(scope.rmd['_rmd:MaxWidth']).toBe(undefined);

    // add a recommended area
    scope.addCropArea();
    node = scope.rmd.RecommendedFrames.Bag.li;
    expect(node.length).toBe(1);
    expect(node[0]).not.toBe(undefined);
    expect(node[0]['_stArea:x']).toBe('0.500000');
    expect(node[0]['_rmd:MaxWidth']).toBe(undefined);
    expect(node[0]['_rmd:MaxWidth']).toBe(undefined);
  });

  it('Correctly removes an area', function() {
    var node;
    scope.rmd.SafeArea = {};
    expect(typeof scope.rmd.SafeArea).toBe('object');
    scope.removeCropArea('safe');
    expect(scope.rmd.SafeArea).toBe(undefined);
    scope.addCropArea();
    node = scope.rmd.RecommendedFrames.Bag.li;
    expect(node[0]).not.toBe(undefined);
    scope.removeCropArea(0);
    expect(node.length).toBe(0);
  });

  it('Returns the right active area', function() {
    scope.addCropArea('safe');
    scope.addCropArea('default');
    scope.addCropArea();
    scope.setActiveArea('safe');
    expect(scope.isAreaActive('safe')).toBe(true);
    expect(scope.isAreaActive('default')).toBe(false);
    expect(scope.isAreaActive()).toBe(false);

    activeArea = scope.getNodeForActiveArea();
    // safe area
    expect(activeArea['_stArea:x']).toBe('0.500000');
    expect(activeArea['_rmd:MinWidth']).toBe(undefined);
    expect(activeArea['_rmd:MaxWidth']).toBe(undefined);

    scope.setActiveArea('default');
    expect(scope.isAreaActive('default')).toBe(true);
    activeArea = scope.getNodeForActiveArea();
    expect(activeArea['_stArea:x']).toBe('0.500000');
    expect(activeArea['_rmd:MinWidth']).toBe(undefined);
    expect(activeArea['_rmd:MaxWidth']).toBe(undefined);

    scope.setActiveArea(0);
    expect(scope.isAreaActive(0)).toBe(true);
    activeArea = scope.getNodeForActiveArea();
    expect(activeArea['_stArea:x']).toBe('0.500000');
    expect(activeArea['rmd:MinWidth']).toBe(undefined);
    expect(activeArea['rmd:MaxWidth']).toBe(undefined);
  });

  it('Correctly sets the area values', function() {
    scope.addCropArea();
    scope.setActiveArea(0);
    activeArea = scope.getNodeForActiveArea();
    expect(activeArea['_stArea:x']).toBe('0.500000');
    expect(activeArea['_stArea:y']).toBe('0.500000');
    expect(activeArea['_stArea:w']).toBe('0.900000');
    expect(activeArea['_stArea:h']).toBe('0.900000');

    scope.setAreaValues(areaValues);
    expect(activeArea['_stArea:x']).toBe('0.455');
    expect(activeArea['_stArea:y']).toBe('0.4875');
    expect(activeArea['_stArea:w']).toBe('0.49');
    expect(activeArea['_stArea:h']).toBe('0.56');

  });

  it('Creates the right selection in Photoshop', function(){
    var calls;
    scope.addCropArea('safe');
    scope.setActiveArea('safe');
    calls = csInterface.evalScript.calls.count();
    expect(csInterface.evalScript).toHaveBeenCalledTimes(calls);
    scope.setSelectionFromRmd();
    expect(csInterface.evalScript).toHaveBeenCalledTimes(calls+1);
    expect(csInterface.evalScript.calls.mostRecent().args).toEqual(
        ['makeSelection({"left":20,"top":20,"right":380,"bottom":380})']);
  });

});
