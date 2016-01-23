
describe('RMD tests', function() {
  beforeEach(module('app'));

  describe('Generate the RMD object', function() {
    var rmdDefault,
        xmp_bridge,
        _,
        rmd;

    var xmp1 = '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        ">   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">      <rdf:Description rdf:about=""            xmlns:cc="http://creativecommons.org/ns#"            xmlns:dc="http://purl.org/dc/elements/1.1/"            xmlns:xmp="http://ns.adobe.com/xap/1.0/"            xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/"            xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#"            xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"            xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"            xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"            xmlns:rmd="http://universalimages.github.io/rmd/0.1/"            xmlns:stArea="http://ns.adobe.com/xmp/sType/Area#"            xmlns:tiff="http://ns.adobe.com/tiff/1.0/"            xmlns:exif="http://ns.adobe.com/exif/1.0/">         <cc:attributionName>Simon Bächler</cc:attributionName>         <cc:legalcode rdf:resource="http://creativecommons.org/licenses/by/4.0/legalcode"/>         <cc:license rdf:resource="http://creativecommons.org/licenses/by/4.0/"/>         <dc:format>image/jpeg</dc:format>         <dc:rights>            <rdf:Alt>               <rdf:li xml:lang="x-default">This material is licensed to the public under the Creative Commons Attribution 4.0 International License http://creativecommons.org/licenses/by/4.0/</rdf:li>            </rdf:Alt>         </dc:rights>         <xmp:MetadataDate>2016-01-20T16:44:25+01:00</xmp:MetadataDate>         <xmp:CreateDate>2015-12-28T20:45:14+01:00</xmp:CreateDate>         <xmp:ModifyDate>2016-01-20T16:44:25+01:00</xmp:ModifyDate>         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Macintosh)</xmp:CreatorTool>         <xmpMM:DocumentID>adobe:docid:photoshop:2bf59d2d-000a-1179-89d4-836638752ea6</xmpMM:DocumentID>         <xmpMM:InstanceID>xmp.iid:27f6d593-9a46-4692-adb0-4ec1481caadb</xmpMM:InstanceID>         <xmpMM:OriginalDocumentID>xmp.did:9cd6437d-5183-4117-9343-fb4ff423c2df</xmpMM:OriginalDocumentID>         <xmpMM:History>            <rdf:Seq>               <rdf:li rdf:parseType="Resource">                  <stEvt:action>saved</stEvt:action>                  <stEvt:changed>/metadata</stEvt:changed>                  <stEvt:instanceID>xmp.iid:12333ae8-5755-4f92-8c7a-d497ee191c6a</stEvt:instanceID>                  <stEvt:softwareAgent>Adobe Photoshop Lightroom 6.0 (Macintosh)</stEvt:softwareAgent>                  <stEvt:when>2015-12-28T20:45:14+01:00</stEvt:when>               </rdf:li>               <rdf:li rdf:parseType="Resource">                  <stEvt:action>saved</stEvt:action>                  <stEvt:instanceID>xmp.iid:61f1ceb2-9994-49e0-a94d-1bdbbb21836e</stEvt:instanceID>                  <stEvt:when>2016-01-19T09:48:33+01:00</stEvt:when>                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Macintosh)</stEvt:softwareAgent>                  <stEvt:changed>/</stEvt:changed>               </rdf:li>               <rdf:li rdf:parseType="Resource">                  <stEvt:action>saved</stEvt:action>                  <stEvt:instanceID>xmp.iid:27f6d593-9a46-4692-adb0-4ec1481caadb</stEvt:instanceID>                  <stEvt:when>2016-01-20T16:44:25+01:00</stEvt:when>                  <stEvt:softwareAgent>Adobe Photoshop CC 2022 (Macintosh)</stEvt:softwareAgent>                  <stEvt:changed>/</stEvt:changed>               </rdf:li>            </rdf:Seq>         </xmpMM:History>         <xmpRights:Marked>True</xmpRights:Marked>         <xmpRights:WebStatement>http://www.stellanera.com</xmpRights:WebStatement>         <xmpRights:UsageTerms>            <rdf:Alt>               <rdf:li xml:lang="x-default">This material is licensed to the public under the Creative Commons Attribution 4.0 International License http://creativecommons.org/licenses/by/4.0/</rdf:li>            </rdf:Alt>         </xmpRights:UsageTerms>         <crs:RawFileName>Crop-Test-1.jpg</crs:RawFileName>         <photoshop:LegacyIPTCDigest>033433DFA38188D7F18E69ED035030B0</photoshop:LegacyIPTCDigest>         <photoshop:ColorMode>3</photoshop:ColorMode>         <photoshop:ICCProfile>sRGB IEC61966-2.1</photoshop:ICCProfile>         <rmd:Interpolation>step</rmd:Interpolation>         <rmd:PivotPoint rdf:parseType="Resource">            <stArea:x>0.500000</stArea:x>            <stArea:y>0.500000</stArea:y>         </rmd:PivotPoint>         <rmd:AllowedDerivates rdf:parseType="Resource">            <rmd:Crop>visibilityOnly</rmd:Crop>         </rmd:AllowedDerivates>         <rmd:RecommendedFrames>            <rdf:Bag>               <rdf:li rdf:parseType="Resource">                  <stArea:w>0.500000</stArea:w>                  <stArea:x>0.250000</stArea:x>                  <stArea:y>0.250000</stArea:y>                  <stArea:h>0.500000</stArea:h>                  <rmd:MaxAspectRatio>1.000000</rmd:MaxAspectRatio>               </rdf:li>            </rdf:Bag>         </rmd:RecommendedFrames>         <rmd:CropArea rdf:parseType="Resource">            <stArea:x>0.420000</stArea:x>            <stArea:y>0.390000</stArea:y>            <stArea:w>0.830000</stArea:w>            <stArea:h>0.800000</stArea:h>         </rmd:CropArea>         <tiff:ImageWidth>400</tiff:ImageWidth>         <tiff:ImageLength>400</tiff:ImageLength>         <tiff:BitsPerSample>            <rdf:Seq>               <rdf:li>8</rdf:li>               <rdf:li>8</rdf:li>               <rdf:li>8</rdf:li>            </rdf:Seq>         </tiff:BitsPerSample>         <tiff:PhotometricInterpretation>2</tiff:PhotometricInterpretation>         <tiff:Orientation>1</tiff:Orientation>         <tiff:SamplesPerPixel>3</tiff:SamplesPerPixel>         <tiff:XResolution>1500000/10000</tiff:XResolution>         <tiff:YResolution>1500000/10000</tiff:YResolution>         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>         <exif:ExifVersion>0221</exif:ExifVersion>         <exif:ColorSpace>1</exif:ColorSpace>         <exif:PixelXDimension>400</exif:PixelXDimension>         <exif:PixelYDimension>400</exif:PixelYDimension>      </rdf:Description>   </rdf:RDF></x:xmpmeta>';
    
    beforeEach(function() {

      module({
        'XMPBridge': {
          onInit : jasmine.createSpy('onInit').and.callFake(function(initHandler){
            initHandler({isError: false, statusMessage: 'mocked Init Handler'});
          }),
          isMockObject: true,
          getRawXmp: jasmine.createSpy('getRawXmp').and.callFake(function(callback) {
            callback(xmp1);
          }),
          getTargetName: jasmine.createSpy('getTargetName').and.callFake(
            function(callback) {
              callback('Jasmine');
            }
          )
        }
      });

      inject(function (_rmdDefault_, _rmdBridge_, _XMPBridge_, _lodash_) {
        rmdDefault = _rmdDefault_;
        rmd = _rmdBridge_;
        xmp_bridge = _XMPBridge_;
        _ = _lodash_;
      });
    });

    it('uses the correct base', function() {
      expect(typeof rmdDefault.xmpmeta).toBe('object');
      expect(rmdDefault.xmpmeta.RDF.Description.MinWidth).toBe(undefined);
      expect(rmdDefault.xmpmeta.RDF.Description['_rmd:Interpolation']).toBe('linear');
      // value that gets added later.
      expect(rmdDefault.xmpmeta.RDF.Description.InstanceID).toBe(undefined);
      expect(xmp_bridge.isMockObject).toBe(true);
    });

    describe('Initialize the xmp object', function() {
      beforeEach(function(done){
        rmd.extractXMP().then(done).catch(done.fail);
        expect(xmp_bridge.onInit).toHaveBeenCalledTimes(1);
        expect(xmp_bridge.getRawXmp).toHaveBeenCalledTimes(1);
        expect(xmp_bridge.getTargetName).toHaveBeenCalledTimes(1);
      });

      it('Extracts Data from the XML', function() {
        expect(rmd).not.toBe(undefined);
        expect(typeof rmd.extractXMP).toBe('function');
        expect(rmd.targetName).toBe('Jasmine');
        expect(rmd.xmp.xmpmeta.RDF.Description.InstanceID).not.toBe(undefined);
        expect(rmd.xmp.xmpmeta.RDF.Description.InstanceID.__text).toBe('xmp.iid:27f6d593-9a46-4692-adb0-4ec1481caadb');
      });

      it('Compresses Area restrictions', function(){
        var areaValues = {"w":{"__prefix":"stArea","__text":"0.500000"},"x":{"__prefix":"stArea","__text":"0.250000"},"y":{"__prefix":"stArea","__text":"0.250000"},"h":{"__prefix":"stArea","__text":"0.500000"},"MaxAspectRatio":{"__prefix":"rmd","__text":"1.000000"},"MinAspectRatio":{"__prefix":"rmd","__text":"0.5"},"MinWidth":{"__prefix":"rmd","__text":"320"},"MaxWidth":{"__prefix":"rmd","__text":"360"},"_rdf:parseType":"Resource","__prefix":"rdf"}
        var oldAreaValues = _.clone(areaValues);
        rmd._compressAreaNode(areaValues);
        expect(areaValues['_rmd:MinWidth']).toBe(oldAreaValues.MinWidth.__text);
        expect(areaValues['_rmd:MaxWidth']).toBe(oldAreaValues.MaxWidth.__text);
        expect(areaValues['_rmd:MinAspectRatio']).toBe(oldAreaValues.MinAspectRatio.__text);
        expect(areaValues['_rmd:MaxAspectRatio']).toBe(oldAreaValues.MaxAspectRatio.__text);
        expect(areaValues.MinWidth).toBe(undefined);
        expect(areaValues.MaxWidth).toBe(undefined);
        expect(areaValues.MinAspectRatio).toBe(undefined);
        expect(areaValues.MaxAspectRatio).toBe(undefined);
      });

    });




  });
});