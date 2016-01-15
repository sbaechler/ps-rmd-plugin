/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

/* jshint ignore:start */
/**
* JSON - from: https://github.com/douglascrockford/JSON-js
*/
if(typeof JSON!=='object'){JSON={};}(function(){'use strict';function f(n){return n<10?'0'+n:n;}function this_value(){return this.valueOf();}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value;}var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
/**
* Array.forEach - from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/
Array.prototype.forEach||(Array.prototype.forEach=function(r,t){var o,n;if(null==this)throw new TypeError(" this is null or not defined");var e=Object(this),i=e.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(arguments.length>1&&(o=t),n=0;i>n;){var a;n in e&&(a=e[n],r.call(o,a,n,e)),n++}});
/* jshint ignore:end */

function getDocumentSize(){
  // Set photoshop preferences to use pixel units.
  var startRulerUnits = app.preferences.rulerUnits;
  var startTypeUnits = app.preferences.typeUnits;
  app.preferences.rulerUnits = Units.PIXELS;
  app.preferences.typeUnits = TypeUnits.PIXELS;

  var size = {width: app.activeDocument.width.value, height: app.activeDocument.height.value};

  // Reset the application preferences
  app.preferences.rulerUnits = startRulerUnits;
  app.preferences.typeUnits = startTypeUnits;
  return JSON.stringify(size);
}

function clearSelection() {
  app.activeDocument.selection.deselect();
}

/**
 * Selects the given region.
 * @param region - Array of four coordinates: left, top, right, bottom
 */
function makeSelection(r) {
  // LogIt('Region: ' + JSON.stringify(region) + ', ' + typeof region);
  var region = [
    [r.left, r.top], [r.right, r.top], [r.right, r.bottom],
      [r.left, r.bottom], [r.left, r.top]
  ];
  app.activeDocument.selection.select(region);
}


/*
 * ADOBE SYSTEMS INCORPORATED
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
 * terms of the Adobe license agreement accompanying it.  If you have received this file from a
 * source other than Adobe, then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 *
 * ---
 *
 * This file contains ExtendScript utilities that interact with the application DOM
 * and provide access to the current document and its associated metadata.
 *
 * The client-facing XMP service is available as $.XMP in the global ExtendScript
 * scope. It exposes a convenient and uniform interface for simple XMP properties
 * and abstracts from application-specific implementation details.
 *
 * If you need your panel to support an application other than Photoshop, Illustrator,
 * InDesign or Premiere you'd have to implement a new delegate object for it. In most
 * cases the XMPScriptAdapter may be a good starting point to customize for your needs.
 *
 */

if (typeof($) == 'undefined')
  $ = {};

/***************************************************************************************
 * -- DELEGATES ------------------------------------------------------------------------
 *
 * Each supported application must be addressed by a dedicated delegate object, which
 * handles operations that require application specific code. Those are identified by
 * a unique key and are being registered with the $.delegates map.
 *
 * Keys currently used are:
 *
 * PHXS = Photoshop
 * IDSN = InDesign
 * PPRO = Premiere Pro
 * ILST = Illustrator
 * AUDT = Audition
 *
 * Those correspond to the application ID that can be obtained via the CEP JavaScript
 * interface.
 *
 * e.g.: new CSInterface().getApplicationID()
 *
 **************************************************************************************/
$.delegates = (function (exports) {

  function findOrCreateDocument() {
    if (!app.documents.length) {
      app.documents.add();
    }

    return app.activeDocument;
  }

// -- metadata access strategies -------------------------------------------------------

  /**
   * The XMPScript library provides full access to the data model and support for
   * parsing and serializing XMP packets.
   *
   * This adapter is a generic delegate implementation that can be constructed with
   * a specialized accessor object that acts as a proxy to the application DOM. Every
   * accessor must satisfy the following API contract:
   *
   *
   * getTarget() [OPTIONAL]
   *    Returns a reference to an object which's metadata shall be displayed
   *    in the panel. e.g. some footage, the active document, ...
   *    Default: app.activeDocument
   *
   * getTargetName(target) [OPTIONAL]
   *    A descriptive name of the target item that is currently being displayed
   *    by the panel.
   *    Default: target.name
   *
   * getXmpPacket() [REQUIRED]
   *    The full XML/RDF serialized XMP packet.
   *
   * setXmpPacket(target, xmpPacket) [REQUIRED]
   *    Replaces the target's metadata in the application DOM with xmpPacket.
   */
  function XMPScriptAdapter(accessor) {

    // load the XMPScript library
    if (ExternalObject.AdobeXMPScript == undefined) {
      ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
    }

    // private ---

    function getPropertyAsString(xmp, namespaceUri, propertyName) {
      var property = xmp.getProperty(namespaceUri, propertyName);
      if (property.options & XMPConst.PROP_IS_ARRAY) {
        return xmp.getLocalizedText(namespaceUri, propertyName, "", "en");
      } else {
        return property.value;
      }
    }

    function setPropertyAsString(xmp, namespaceUri, propertyName, value) {
      var property = xmp.getProperty(namespaceUri, propertyName, XMPConst.STRING);

      if (property && property.options & XMPConst.PROP_IS_ARRAY) {
        xmp.setLocalizedText(namespaceUri, propertyName, "", "en", value);
      } else {
        xmp.setProperty(namespaceUri, propertyName, value);
      }
    }

    // public ---

    this.open = function () {
      // This prototype currently only supports one open document.
      if (app.documents.length > 1) {
        alert('Only one document can be open.');
        throw new Error('Only one document can be open.');
      }


      var target = accessor.getTarget ? accessor.getTarget() : findOrCreateDocument();
      // if no target could be retrieved, we don't expose the API.
      if (!target) return;

      // accessor.getXmpPacket() returns the raw XML.
      var xmp = new XMPMeta(accessor.getXmpPacket(target));

      return {
        getTargetName: function () {
          return accessor.getTargetName ? accessor.getTargetName(target) : target.name;
        },

        read: function (namespaceUri, propertyName) {
          if (xmp.doesPropertyExist(namespaceUri, propertyName)) {
            return getPropertyAsString(xmp, namespaceUri, propertyName);
          } else {
            return "";
          }
        },

        write: function (namespaceUri, propertyName, value) {
          setPropertyAsString(xmp, namespaceUri, propertyName, value);
        },

        commit: function () {
          var packet = xmp.serialize(XMPConst.SERIALIZE_USE_COMPACT_FORMAT);
          accessor.setXmpPacket(target, packet);
        },

        getRawXMP: function() {
          return accessor.getXmpPacket(target);
        },

        setRawXMP: function(serialized_xmp) {
          accessor.setXmpPacket(target, serialized_xmp);
          xmp = new XMPMeta(serialized_xmp);
        }
      };
    };


  }



  /**
   * As opposed to other applications the InDesign object model does not expose the
   * raw XMP data. Still we can leverage the capabilities of XMPScript by wrapping the
   * XMPScriptAdapter and implementing the following workaround:
   *
   * 1. Dump XMP to a temporary file on disc.
   * 2. Parse the file content with XMPScript
   * 3. Work with the data model as required.
   * 4. Serialize the XMP back to a temporary file.
   * 5. Replace the document's metadata with the file content.
   *
   */
  function InDesignAdapter() {
    var PACKET = undefined;

    // private ---

    function createTempFile() {
      // determine platform-dependent temp dir from environment.
      var tempDir = $.getenv('TMPDIR') || $.getenv('TEMP');

      var file = new File(tempDir + "/" + Date.now() + ".xmp");
      return file;
    }

    function withTempFile(callback) {
      var tempFile = createTempFile();
      tempFile.encoding = "UTF8";
      var result = callback(tempFile);
      tempFile.remove();
      return result;
    }

    function readFrom(file) {
      file.open('r');
      var content = file.read();
      file.close();

      return content;
    }

    function writeTo(file, content) {
      file.open('w', 'TEXT');
      var isOk = file.write(content);
      file.close();

      return isOk;
    }

    var wrapped = new XMPScriptAdapter({
      getTarget: function () {
        var doc = findOrCreateDocument();
        return doc.metadataPreferences;
      },

      getTargetName: function (target) {
        return target.documentTitle;
      },

      getXmpPacket: function (metadata) {
        if (!PACKET) {
          withTempFile(function (file) {
            metadata.save(file);
            PACKET = readFrom(file);
          });
        }

        return PACKET;
      },

      setXmpPacket: function (metadata, xmpPacket) {
        withTempFile(function (file) {
          writeTo(file, xmpPacket);
          metadata.replace(file);
          PACKET = undefined;
        });
      }
    });

    // public ---

    this.open = wrapped.open;

  }

// -- public delegate API exports -------------------------------------------------------

  exports["PHXS"] = new XMPScriptAdapter({
    getXmpPacket: function (doc) {
      return doc.xmpMetadata.rawData;
    },

    setXmpPacket: function (doc, xmpPacket) {
      doc.xmpMetadata.rawData = xmpPacket;
    }
  });

  exports["ILST"] = new XMPScriptAdapter({
    getXmpPacket: function (doc) {
      return doc.XMPString;
    },

    setXmpPacket: function (doc, xmpPacket) {
      doc.XMPString = xmpPacket;
    }
  });

  exports["IDSN"] = new InDesignAdapter();

  exports["PPRO"] = new XMPScriptAdapter({
    getTarget: function () {
      // assuming that the first project item is footage.
      return app.project.rootItem.children[0];
    },

    getXmpPacket: function (item) {
      return item.getXMPMetadata();
    },

    setXmpPacket: function (item, xmpPacket) {
      item.setXMPMetadata(xmpPacket);
    }
  });

  exports["AUDT"] = new XMPScriptAdapter({
    getTarget: function () {
      if (app.activeDocument && app.activeDocument.reflect.name == "WaveDocument") {
        return app.activeDocument;
      }

      return null;
    },

    getTargetName: function (target) {
      return target.displayName;
    },

    getXmpPacket: function (doc) {
      return doc.metadata.xmp;
    },

    setXmpPacket: function (doc, xmpPacket) {
      doc.metadata.xmp = xmpPacket;
    }
  });

  return exports;

})($.delegates || {});


/***************************************************************************************
 * -- $.XMP ----------------------------------------------------------------------------
 *
 * A client facing utility that supports read and write operations on the current
 * document's metadata properties.
 *
 * Remember to call $.XMP.setup(appId) first and commit your changes afterwards
 * with $.XMP.commit()
 *
 **************************************************************************************/
$.XMP = (function (exports) {

  var DELEGATE_API = undefined;

  /**
   * Needs to be invoked before accessing any XMP property.
   * Expects the application Id to be passed in in order to choose the right
   * delegate object that supports the current application.
   *
   * Will return an error message if the initialization fails. Otherwise errors
   * cannot be propagated gracefully to the calling JavaScript context.
   */
  exports.setup = function (appName) {
    if (!$.delegates || !$.delegates[appName]) {
      return "Application [" + appName + "] not supported yet!";
    }
    var delegate = $.delegates[appName];
    DELEGATE_API = delegate.open();

    if (!DELEGATE_API) {
      return "No metadata accessible.";
    }
  };

  /**
   * Obtains the full namespace URI from XMPConst.
   * See "JavaScript Tools Guide CC" (p. 262) for a complete list of namespace constants.
   */
  exports.toNamespaceURI = function (namespaceRef) {
    return XMPConst[namespaceRef];
  },

  /**
   * Returns a descriptive name for the displayed doc or project item.
   */
  exports.getTargetName = function () {
    return DELEGATE_API.getTargetName();
  },

  /**
   * Returns a string representation of the properties value.
   * If empty or not present, an empty string is returned.
   */
  exports.read = function (namespaceUri, propertyName) {
    var result = DELEGATE_API.read(namespaceUri, propertyName);
    // force implicit string conversion due to inconsistent data types.
    return "" + result;
  };

  /**
   * Adds or updates a property with the given namespace and value.
   * Note that you need to call commit() in to serialize the changes back to the active document.
   */
  exports.write = function (namespaceUri, propertyName, value) {
    return DELEGATE_API.write(namespaceUri, propertyName, value);
  };

  /**
   * Serializes the current XMP metadata and writes it back into the application DOM.
   */
  exports.commit = function () {
    DELEGATE_API.commit();
  };

  exports.getRawXMP = function () {
    return DELEGATE_API.getRawXMP();
  };

  exports.setRawXMP = function(serializedXmp) {
    return DELEGATE_API.setRawXMP(serializedXmp)
  };

  return exports;

})($.XMP || {});


function LogIt(inMessage) {
  try {
    var a = new Logger();
    var b = decodeURIComponent(inMessage);
    a.log(b + "\n");
  }
  catch (e) {
    alert("LogIt catch : " + e + ":" + e.line);
  }
}

///////////////////////////////////////////////////////////////////////////////
// Object: Logger
// Usage: Log information to a text file
// Input: String to full path of file to create or append, if no file is given
//        then output file Logger.log is created on the users desktop
// Return: Logger object
// Example:
//
//   var a = new Logger();
//   a.print( 'hello' );
//   a.print( 'hello2\n\n\nHi\n' ) ;
//   a.remove();
//   a.log( Date() );
//   a.print( Date() );
//   a.display();
//
///////////////////////////////////////////////////////////////////////////////
function Logger(inFile) {

  // member properties

  // the file we are currently logging to
  if (undefined == inFile) {
    this.file = new File(Folder.desktop + "/PhotoshopEvents.log");
  } else {
    this.file = new File(inFile);
  }

  // member methods

  // output to the ESTK console
  // note that it behaves a bit differently
  // when using the BridgeTalk section
  this.print = function (inMessage) {
    if (app.name == "ExtendScript Toolkit") {
      print(inMessage);
    } else {
      var btMessage = new BridgeTalk();
      btMessage.target = "estoolkit";
      btMessage.body = "print(" + inMessage.toSource() + ")";
      btMessage.send();
    }
  };

  // write out a message to the log file
  this.log = function (inMessage) {
    if (this.file.exists) {
      this.file.open('e');
      this.file.seek(0, 2); // end of file
    } else {
      this.file.open('w');
    }
    this.file.write(inMessage);
    this.file.close();
  };

  // show the contents with the execute method
  this.display = function () {
    this.file.execute();
  };

  // remove the file
  this.remove = function () {
    this.file.remove();
  };
}