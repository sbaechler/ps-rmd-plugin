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
    rmd: 'http://universalimages.github.io/rmd/',
    stDim: 'http://ns.adobe.com/xap/1.0/sType/Dimensions#',
    stArea: 'http://ns.adobe.com/xmp/sType/Area#',
    exif: 'http://ns.adobe.com/exif/1.0/',
    dc: 'http://purl.org/dc/elements/1.1/'  // Dublin Core
  })
;
