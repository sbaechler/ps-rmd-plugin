
describe('RMD tests', function() {
  beforeEach(module('app'));

  describe('Generate the RMD object', function() {
    var rmdDefault,
        rmd;

    beforeEach(inject(function(_rmdDefault_, _rmdBridge_, _XMPBridge_) {
      rmdDefault = _rmdDefault_;
      rmd = _rmdBridge_;
    }));

    it('uses the correct base', function() {
      expect(typeof rmdDefault.xmpmeta).toBe('object');
      expect(rmdDefault.xmpmeta.RDF.Description.MinWidth.__text).toBe('360');
    });

    it('creates the correct RMD object', function() {
      expect(rmd).not.toBe(undefined);
      expect(typeof rmd.extractXMP).toBe('function');
    });



  });
});