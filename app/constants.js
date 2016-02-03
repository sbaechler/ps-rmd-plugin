angular.module('app')
  .constant('psEvent', {
    make: 1298866208,
    delete: 1147958304,
    close: 1131180832,
    select: 1936483188,
    set: 1936028772
  })
  .constant('xmlNamespaces', {
    xmp: 'http://ns.adobe.com/xap/1.0/',
    rmd: 'http://universalimages.github.io/rmd/0.1/',
    stDim: 'http://ns.adobe.com/xap/1.0/sType/Dimensions#',
    stArea: 'http://ns.adobe.com/xmp/sType/Area#',
    exif: 'http://ns.adobe.com/exif/1.0/',
    dc: 'http://purl.org/dc/elements/1.1/'  // Dublin Core
  })
.constant('rmdDefault', {
      "xmpmeta": {
        "RDF": {
          "Description": {
            "AppliedToDimensions": {
              "_stDim:w": "0",
              "_stDim:h": "0",
              "_stDim:unit": "pixel",
              "__prefix": "rmd"
            },
            "RecommendedFrames": {
              "Bag": {
                "li": [],
                "__prefix": "rdf"
              },
              "__prefix": "rmd"
            },
            "AllowedDerivates": {
              "_rmd:Crop": "all",
              "__prefix": "rmd"
            },
            "_rmd:Interpolation": "linear",
            "_xmlns:rmd": "http://universalimages.github.io/rmd/0.1/",
            "_xmlns:stDim": "http://ns.adobe.com/xap/1.0/sType/Dimensions#",
            "_xmlns:stArea": "http://ns.adobe.com/xmp/sType/Area#"
          }
        }
      }
    }
)
.constant('rmdFrameStruct', {
    "_stArea:x": "0.500000",
    "_stArea:y": "0.500000",
    "_stArea:w": "0.900000",
    "_stArea:h": "0.900000",
    //"_rdf:parseType": "Resource",
    "__prefix": "rmd"
  }
);