angular.module('app')
.factory('RMD', ['XMPBridge', 'xmlNamespaces', 'lodash', 'x2js', 'rmdDefault',
  function(XMPBridge, Namespaces, _, x2js, rmdDefault) {

  // TODO: store metadata for different targets (=files)
  var targets = {};
  var ns = Namespaces.rmd;

  var RMD = function() {
    this.xmp = rmdDefault;

    this.getXMP = function() {
      var self = this;
      XMPBridge.onInit(function(state) {
        if(!state.isError) {
          XMPBridge.getTargetName(function(targetName) {
            self.targetName = targetName;
          });
          XMPBridge.getRawXmp(function(xmp) {
            var new_xmp = x2js.xml_str2json(xmp);
            _.defaultsDeep(self.xmp, new_xmp);
          });
        } else {
          throw new Error('Failed to load XMP Bridge.');
        }
      });

    };
  };

  var rmd = new RMD();
  rmd.getXMP();

  return rmd;

}]);
