angular.module('app')
.factory('rmdBridge', ['XMPBridge', 'xmlNamespaces', 'lodash', 'x2js', 'rmdDefault',
  function(XMPBridge, Namespaces, _, x2js, rmdDefault) {

  // TODO: store metadata for different targets (=files)
  // var targets = {};

  //function removeEmptyNodes(parent) {
  //  _.forOwn(parent, function(value, key) {
  //     if (value === null && typeof value === "object") {
  //      delete parent[key];
  //    } else if (typeof value === 'object') {
  //      removeEmptyNodes(value);
  //    }
  //  });
  //}

  var compressedNodes = ['MinWidth', 'MaxWidth', 'MinAspectRatio', 'MaxAspectRatio'];

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
              // console.log(x2js.xml_str2json(xmp));
              self.xmp = x2js.xml_str2json(xmp);
              self._compressAreaNodes(self.xmp.xmpmeta.RDF.Description);
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
      // console && console.log('Storing XMP');
      // remove Angular.js hints
      var cleanObj = JSON.parse(angular.toJson(this.xmp));
      // removeEmptyNodes(cleanObj.xmpmeta);

      var xml = x2js.json2xml_str(cleanObj);
      // console.log(xml);
      return new Promise(function(resolve) {
        XMPBridge.setRawXmp(xml, resolve);
      });
    };

    /**
     * Sets the Applied to Dimensions value.
     * @param documentSize - Object: {height, width}
     */
    this.setDocumentSize = function(documentSize) {
      this.xmp.xmpmeta.RDF.Description.AppliedToDimensions['_stDim:w'] = documentSize.width;
      this.xmp.xmpmeta.RDF.Description.AppliedToDimensions['_stDim:h'] = documentSize.height;
    };

    this._compressAreaNodes = function(root){
      root.CropArea && this._compressAreaNode(root.CropArea);
      root.SafeArea && this._compressAreaNode(root.SafeArea);
      if(root.RecommendedFrames && root.RecommendedFrames.Bag) {
        _.each(root.RecommendedFrames.Bag.li, function(node){
          this._compressAreaNode(node);
        }, this);
      }
    };

    this._compressAreaNode = function(node) {
      _.each(compressedNodes, function(key){
        if(typeof node[key] === 'object') {
          var details = node[key];
          if(details.__prefix !== undefined && details.__text !== undefined) {
            node['_' + details.__prefix + ':' + key] = details.__text;
          }
          delete node[key];
        }
      }, this);
    };

  };

  var rmd = new RMD();

  return rmd;

}]);
