
describe('RMD tests', function() {
  beforeEach(module('app'));

  describe('Generate the RMD object', function() {
    var rmdDefault,
        xmp_bridge,
        rmd;

    var xmp1 = '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c111 79.158325, 2015/09/10-01:10:20        ">   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">      <rdf:Description rdf:about=""            xmlns:xmp="http://ns.adobe.com/xap/1.0/"            xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/"            xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#"            xmlns:dc="http://purl.org/dc/elements/1.1/"            xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"            xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"            xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"            xmlns:rmd="http://universalimages.github.io/rmd/"            xmlns:stDim="http://ns.adobe.com/xap/1.0/sType/Dimensions#"            xmlns:stArea="http://ns.adobe.com/xmp/sType/Area#"            xmlns:tiff="http://ns.adobe.com/tiff/1.0/"            xmlns:exif="http://ns.adobe.com/exif/1.0/">         <xmp:CreatorTool>Adobe Photoshop CC 2015 (Macintosh)</xmp:CreatorTool>         <xmp:CreateDate>2015-12-02T10:24:06+01:00</xmp:CreateDate>         <xmp:MetadataDate>2016-01-14T11:40:05+01:00</xmp:MetadataDate>         <xmp:ModifyDate>2016-01-14T11:40:05+01:00</xmp:ModifyDate>         <xmpMM:InstanceID>xmp.iid:619c3432-494f-43b8-9613-b5893203e834</xmpMM:InstanceID>         <xmpMM:DocumentID>adobe:docid:photoshop:cdc3194f-d964-1178-a3d2-b21d2a454d5f</xmpMM:DocumentID>         <xmpMM:OriginalDocumentID>xmp.did:5968a119-cfab-4e17-84fc-635cd4b3c61b</xmpMM:OriginalDocumentID>         <xmpMM:History>            <rdf:Seq>               <rdf:li rdf:parseType="Resource">                  <stEvt:action>created</stEvt:action>                  <stEvt:instanceID>xmp.iid:5968a119-cfab-4e17-84fc-635cd4b3c61b</stEvt:instanceID>                  <stEvt:when>2015-12-02T10:24:06+01:00</stEvt:when>                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Macintosh)</stEvt:softwareAgent>               </rdf:li>               <rdf:li rdf:parseType="Resource">                  <stEvt:action>saved</stEvt:action>                  <stEvt:instanceID>xmp.iid:a1b863e7-2200-4a9a-b50a-9ce459ccfe5a</stEvt:instanceID>                  <stEvt:when>2015-12-02T10:24:06+01:00</stEvt:when>                  <stEvt:softwareAgent>Adobe Photoshop CC 2015 (Macintosh)</stEvt:softwareAgent>                  <stEvt:changed>/</stEvt:changed>               </rdf:li>               <rdf:li rdf:parseType="Resource">                  <stEvt:action>saved</stEvt:action>                  <stEvt:instanceID>xmp.iid:f45ea2ff-a3f9-4325-ae1e-f5f296276134</stEvt:instanceID>                  <stEvt:when>2015-12-02T11:01:41+01:00</stEvt:when>                  <stEvt:softwareAgent>Adobe Photoshop Lightroom 6.0 (Macintosh)</stEvt:softwareAgent>                  <stEvt:changed>/metadata</stEvt:changed>               </rdf:li>               <rdf:li rdf:parseType="Resource">                  <stEvt:action>saved</stEvt:action>                  <stEvt:instanceID>xmp.iid:104bfa5d-06b4-43b8-9141-41bf5eae059c</stEvt:instanceID>                  <stEvt:when>2016-01-12T14:47:56+01:00</stEvt:when>                  <stEvt:softwareAgent>Adobe Photoshop CC 2022 (Macintosh)</stEvt:softwareAgent>                  <stEvt:changed>/</stEvt:changed>               </rdf:li>               <rdf:li rdf:parseType="Resource">                  <stEvt:action>saved</stEvt:action>                  <stEvt:instanceID>xmp.iid:619c3432-494f-43b8-9613-b5893203e834</stEvt:instanceID>                  <stEvt:when>2016-01-14T11:40:05+01:00</stEvt:when>                  <stEvt:softwareAgent>Adobe Photoshop CC 2022 (Macintosh)</stEvt:softwareAgent>                  <stEvt:changed>/</stEvt:changed>               </rdf:li>            </rdf:Seq>         </xmpMM:History>         <dc:format>image/jpeg</dc:format>         <dc:creator>            <rdf:Seq>               <rdf:li>Simon Bächler</rdf:li>            </rdf:Seq>         </dc:creator>         <dc:title>            <rdf:Alt>               <rdf:li xml:lang="x-default">Test 1</rdf:li>            </rdf:Alt>         </dc:title>         <dc:rights>            <rdf:Alt>               <rdf:li xml:lang="x-default">Simon Bächler</rdf:li>            </rdf:Alt>         </dc:rights>         <xmpRights:Marked>True</xmpRights:Marked>         <crs:RawFileName>Noncrop.jpg</crs:RawFileName>         <photoshop:LegacyIPTCDigest>DCD04206CEBECC9F4499C64C50CECFA0</photoshop:LegacyIPTCDigest>         <photoshop:ColorMode>3</photoshop:ColorMode>         <rmd:MinWidth>360</rmd:MinWidth>         <rmd:Interpolation>linear</rmd:Interpolation>         <rmd:AppliedToDimensions rdf:parseType="Resource">            <stDim:w>640</stDim:w>            <stDim:h>480</stDim:h>            <stDim:unit>pixel</stDim:unit>         </rmd:AppliedToDimensions>         <rmd:SafeArea rdf:parseType="Resource">            <stArea:unit>normalized</stArea:unit>            <stArea:x>0.300000</stArea:x>            <stArea:y>0.600000</stArea:y>            <stArea:w>0.500000</stArea:w>            <stArea:h>0.500000</stArea:h>         </rmd:SafeArea>         <rmd:PivotPoint rdf:parseType="Resource">            <stArea:x>0.380000</stArea:x>            <stArea:y>0.660000</stArea:y>            <stArea:unit>normalized</stArea:unit>         </rmd:PivotPoint>         <rmd:RecommendedFrames>            <rdf:Bag>               <rdf:li rdf:parseType="Resource">                  <stArea:x>0.500000</stArea:x>                  <stArea:y>0.500000</stArea:y>                  <stArea:w>0.800000</stArea:w>                  <stArea:h>0.800000</stArea:h>                  <stArea:unit>normalized</stArea:unit>                  <rmd:MaxWidth>360.000000</rmd:MaxWidth>               </rdf:li>            </rdf:Bag>         </rmd:RecommendedFrames>         <rmd:AllowedDerivates rdf:parseType="Resource">            <rmd:Crop>all</rmd:Crop>         </rmd:AllowedDerivates>         <tiff:ImageWidth>640</tiff:ImageWidth>         <tiff:ImageLength>480</tiff:ImageLength>         <tiff:BitsPerSample>            <rdf:Seq>               <rdf:li>8</rdf:li>               <rdf:li>8</rdf:li>               <rdf:li>8</rdf:li>            </rdf:Seq>         </tiff:BitsPerSample>         <tiff:PhotometricInterpretation>2</tiff:PhotometricInterpretation>         <tiff:Orientation>1</tiff:Orientation>         <tiff:SamplesPerPixel>3</tiff:SamplesPerPixel>         <tiff:XResolution>720000/10000</tiff:XResolution>         <tiff:YResolution>720000/10000</tiff:YResolution>         <tiff:ResolutionUnit>2</tiff:ResolutionUnit>         <exif:ExifVersion>0221</exif:ExifVersion>         <exif:ColorSpace>65535</exif:ColorSpace>         <exif:PixelXDimension>640</exif:PixelXDimension>         <exif:PixelYDimension>480</exif:PixelYDimension>      </rdf:Description>   </rdf:RDF></x:xmpmeta>'

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

      inject(function (_rmdDefault_, _rmdBridge_, _XMPBridge_) {
        rmdDefault = _rmdDefault_;
        rmd = _rmdBridge_;
        xmp_bridge = _XMPBridge_;
      });
    });

    it('uses the correct base', function() {
      expect(typeof rmdDefault.xmpmeta).toBe('object');
      expect(rmdDefault.xmpmeta.RDF.Description.MinWidth).toBe(undefined);
      expect(rmdDefault.xmpmeta.RDF.Description.Interpolation.__text).toBe('linear');
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
        expect(rmd.xmp.xmpmeta.RDF.Description.InstanceID.__text).toBe('xmp.iid:619c3432-494f-43b8-9613-b5893203e834');
      });

    });




  });
});