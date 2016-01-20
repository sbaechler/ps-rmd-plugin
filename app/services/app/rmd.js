angular.module('app')
.factory('rmdBridge', ['XMPBridge', 'xmlNamespaces', 'lodash', 'x2js', 'rmdDefault',
  function(XMPBridge, Namespaces, _, x2js, rmdDefault) {

  // TODO: store metadata for different targets (=files)
  // var targets = {};

  var RMD = function() {
    this.xmp = {};
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
              console.log(x2js.xml_str2json(xmp));
              self.xmp = x2js.xml_str2json(xmp);
              _.defaultsDeep(self.xmp, _.cloneDeep(rmdDefault));
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
      console && console.log('Storing XMP');
      // this._removeEmptyNodes(this.xmp.xmpmeta);
      // remove Angular.js hints
      var cleanObj = JSON.parse(angular.toJson(this.xmp));

      var xml = x2js.json2xml_str(cleanObj);
      console.log(xml);
      return new Promise(function(resolve) {
        XMPBridge.setRawXmp(xml, resolve);
      });
    };

    //this._removeEmptyNodes = function removeEmptyNodes(parent) {
    //  _.forOwn(parent, function(value, key) {
    //    if (typeof value === 'object') {
    //      if(value.__prefix === 'rmd' && value.__text === undefined) {
    //        // empty node
    //        console.log('removing ', parent, key);
    //        delete parent[key];
    //      } else {
    //        removeEmptyNodes(value);
    //      }
    //    }
    //  });
    //};

  };

  var rmd = new RMD();

  return rmd;

}]);
