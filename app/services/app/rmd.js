angular.module('app')
.factory('rmdBridge', ['XMPBridge', 'xmlNamespaces', 'lodash', 'x2js', 'rmdDefault',
  function(XMPBridge, Namespaces, _, x2js, rmdDefault) {

  // TODO: store metadata for different targets (=files)
  // var targets = {};

  var RMD = function() {
    this.xmp = _.cloneDeep(rmdDefault);

    /**
     * Extracts the XMP metadata from the file and stores it in the xmp property.
     */
    this.extractXMP = function() {
      var self = this;
      return new Promise(function(resolve, reject) {
        XMPBridge.onInit(function(state) {
          if(!state.isError) {
            XMPBridge.getTargetName(function(targetName) {
              self.targetName = targetName;
            });
            XMPBridge.getRawXmp(function(xmp) {
              var new_xmp = x2js.xml_str2json(xmp);
              _.extend(self.xmp, new_xmp);
              resolve(self.xmp);
            });
          } else {
            reject('Failed to load XMP Bridge.');
          }
        });
      });
    };

    this.getTargetName = function(callback) {
      XMPBridge.getTargetName(function(targetName){
        callback(targetName);
      });
    };

    /**
     * Stores the XMP metadata in the file.
     */
    this.storeXMP = function() {
      var xml = x2js.json2xml_str(this.xmp);
      return new Promise(function(resolve) {
        XMPBridge.setRawXmp(xml, function(response){resolve(response);});
      });
    };

  };

  var rmd = new RMD();

  return rmd;

}]);
