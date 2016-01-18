(function(global, jasmine) {

  var hostEnvironment = '{"appVersion":"16.1.0","appSkinInfo":{"systemHighlightColor":{"alpha":0,"green":204,"blue":254,"red":163},"baseFontSize":10,"appBarBackgroundColorSRGB":{"antialiasLevel":0,"type":1,"color":{"alpha":255,"green":83,"blue":83,"red":83}},"appBarBackgroundColor":{"antialiasLevel":0,"type":1,"color":{"alpha":255,"green":83,"blue":83,"red":83}},"panelBackgroundColor":{"antialiasLevel":0,"type":1,"color":{"alpha":255,"green":83,"blue":83,"red":83}},"baseFontFamily":".AppleSystemUIFont","panelBackgroundColorSRGB":{"antialiasLevel":0,"type":1,"color":{"alpha":255,"green":83,"blue":83,"red":83}}},"appLocale":"de_DE","isAppOnline":false,"appUILocale":"de_DE","appName":"PHXS","appId":"PHXS"}'

  var hostCapabilities = '{"DISABLE_FLASH_EXTENSIONS":true,"EXTENDED_PANEL_ICONS":true,"SUPPORT_HTML_EXTENSIONS":true,"DELEGATE_APE_ENGINE":false,"EXTENDED_PANEL_MENU":true}';

  var ApplicationID = 'PHXS';

  //global.__adobe_cep__ = jasmine.createSpyObj('__adobe_cep__',
  //    ['getHostEnvironment']);

  global.__adobe_cep__ = {
    getHostEnvironment: function(){
      return hostEnvironment;
    },
    closeExtension: function () {},
    evalScript: function(script, callback) {
      if(script === '$.XMP.getRawXMP()') {
        callback('');
      }
      callback('undefined');
    },
    getHostCapabilities: function(){
      return hostCapabilities;
    },
    dispatchEvent: function(event) { },
    addEventListener: function(type, listener, obj) { },
    removeEventListener: function(type, listener, obj) {},
    requestOpenExtension: function(extensionId, params) {},
    getApplicationID: function() {
      return ApplicationID;
    },

    getExtensions: function(extensionsIdsStr) {
      return "[]";
    }


  }

}(window, jasmine));