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
            "MinWidth": {
              "__prefix": "rmd",
              "__text": "360"
            },
            "Interpolation": {
              "__prefix": "rmd",
              "__text": "linear"
            },
            "AppliedToDimensions": {
              "w": {
                "__prefix": "stDim",
                "__text": "0"
              },
              "h": {
                "__prefix": "stDim",
                "__text": "0"
              },
              "unit": {
                "__prefix": "stDim",
                "__text": "pixel"
              },
              "_rdf:parseType": "Resource",
              "__prefix": "rmd"
            },
            "SafeArea": {
              "x": {
                "__prefix": "stArea",
                "__text": "0.500000"
              },
              "y": {
                "__prefix": "stArea",
                "__text": "0.500000"
              },
              "w": {
                "__prefix": "stArea",
                "__text": "0.900000"
              },
              "h": {
                "__prefix": "stArea",
                "__text": "0.900000"
              },
              "MaxWidth": {
                "__prefix": "rmd",
                "__text": ""
              },
              "_rdf:parseType": "Resource",
              "__prefix": "rmd"
            },
            "PivotPoint": {
              "x": {
                "__prefix": "stArea",
                "__text": "0.380000"
              },
              "y": {
                "__prefix": "stArea",
                "__text": "0.660000"
              },
              "_rdf:parseType": "Resource",
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
              "Crop": {
                "__prefix": "rmd",
                "__text": "all"
              },
              "_rdf:parseType": "Resource",
              "__prefix": "rmd"
            },
            "_xmlns:xmp": "http://ns.adobe.com/xap/1.0/",
            "_xmlns:xmpMM": "http://ns.adobe.com/xap/1.0/mm/",
            "_xmlns:stEvt": "http://ns.adobe.com/xap/1.0/sType/ResourceEvent#",
            "_xmlns:dc": "http://purl.org/dc/elements/1.1/",
            "_xmlns:xmpRights": "http://ns.adobe.com/xap/1.0/rights/",
            "_xmlns:rmd": "http://universalimages.github.io/rmd/",
            "_xmlns:stDim": "http://ns.adobe.com/xap/1.0/sType/Dimensions#",
            "_xmlns:stArea": "http://ns.adobe.com/xmp/sType/Area#",
            "_xmlns:exif": "http://ns.adobe.com/exif/1.0/",
            "_rdf:about": "",
            "__prefix": "rdf"
          },
          "_xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
          "__prefix": "rdf"
        }
        ,
        "_xmlns:x": "adobe:ns:meta/",
        "_x:xmptk": "Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        ",
        "__prefix": "x"
      }
    }
)
.constant('rmdFrameStruct', {
    "x": {
      "__prefix": "stArea",
      "__text": "0.500000"
    },
    "y": {
      "__prefix": "stArea",
      "__text": "0.500000"
    },
    "w": {
      "__prefix": "stArea",
      "__text": "0.900000"
    },
    "h": {
      "__prefix": "stArea",
      "__text": "0.900000"
    },
    "MaxWidth": {
      "__prefix": "rmd",
      "__text": ""
    },
    "MinWidth": {
      "__prefix": "rmd",
      "__text": ""
    },
    "MinAspectRatio": {
      "__prefix": "rmd",
      "__text": ""
    },
    "MaxAspectRatio": {
      "__prefix": "rmd",
      "__text": ""
    },
    "_rdf:parseType": "Resource",
    "__prefix": "rmd"
  }
);