angular.module('app')
.factory('RMD', ['XMPBridge', 'xmlNamespaces', 'lodash',
  function(XMPBridge, Namespaces, _) {

  // TODO: store metadata for different targets (=files)
  var targets = {};
  var ns = Namespaces.rmd;

  var RMD = function() {
    this._asyncOps = 0;
    this.rmd = {
      'AppliedToDimensions' : {
        'stDim:w': 0,
        'stDim:h': 0,
        'stDim:unit': 'pixel'
      },
      'AllowedDerivates': {
        Crop: 'all'
      },
      'SafeArea': {
        'stArea:x': 0,
        'stArea:y': 0,
        'stArea:w': 1,
        'stArea:h': 1,
        'stArea:unit': 'normalized'
      },
      'PivotPoint': {
        'stArea:x': 0.5,
        'stArea:y': 0.5
      }
    };

    this.getFromXMP = function() {
      var self = this;
      var xmpKey;
      XMPBridge.onInit(function(state) {
        if(!state.isError) {
          XMPBridge.getTargetName(function(targetName) {
            self.targetName = targetName;
          });
          _.forOwn(self.rmd, function getXMPValue(value, key, obj, parent) {
            if(value instanceof Array) {
              // skip for now. TODO: implement this.
            } else if(typeof value === 'object') {  // value is a struct
              _.forOwn(value, function(v, k, o) {
                getXMPValue(v, k, o, key);
              });
            } else {  // value is a base type
              xmpKey = parent === undefined ? key : xmpKey = parent + '/' + key;
              console.log('getting value for ' + xmpKey);
              XMPBridge.read(ns, xmpKey, function(value) {
                obj[key] = value;
              });
            }
          });
        } else {
          throw new Error('Failed to load XMP Bridge.');
        }
      });

    };
  };

  var rmd = new RMD();
  rmd.getFromXMP();

  return rmd;

}]);
