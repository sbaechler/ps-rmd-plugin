(function(global) {
  themeManager.init();

  var SELECTION_SIZE_FOR_POINT = 4;

  angular.module('app', ['ngLodash', 'xml'])
    .config(function (lodash, x2jsProvider) {
    x2jsProvider.config = {
      /*
      escapeMode               : true|false - Escaping XML characters. Default is true from v1.1.0+
      attributePrefix          : "<string>" - Prefix for XML attributes in JSon model. Default is "_"
      arrayAccessForm          : "none"|"property" - The array access form (none|property). Use this property if you want X2JS generates an additional property <element>_asArray to access in array form for any XML element. Default is none from v1.1.0+
      emptyNodeForm            : "text"|"object" - Handling empty nodes (text|object) mode. When X2JS found empty node like <test></test> it will be transformed to test : '' for 'text' mode, or to Object for 'object' mode. Default is 'text'
      enableToStringFunc       : true|false - Enable/disable an auxiliary function in generated JSON objects to print text nodes with text/cdata. Default is true
      arrayAccessFormPaths     : [] - Array access paths. Use this option to configure paths to XML elements always in "array form". You can configure beforehand paths to all your array elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*\.child2/), or a custom function. Default is empty
      skipEmptyTextNodesForObj : true|false - Skip empty text tags for nodes with children. Default is true.
      stripWhitespaces         : true|false - Strip whitespaces (trimming text nodes). Default is true.
      datetimeAccessFormPaths  : [] - Datetime access paths. Use this option to configure paths to XML elements for "datetime form". You can configure beforehand paths to all your array elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*\.child2/), or a custom function. Default is empty
      */
      attributePrefix: '_',
      arrayAccessFormPaths: ['xmpmeta.RDF.Description.RecommendedFrames.Bag.li']
    };
  })
  .controller('MainController', ['$scope', 'csInterface', 'rmdBridge',
    'rmdDefault', 'lodash', 'psEvent', 'rmdFrameStruct',
    function ($scope, csInterface, RMD, rmdDefault, _, psEvent, rmdFrameStruct) {

      var activeArea = null;
      var gExtensionID = csInterface.getExtensionID();
      var listenTo = [psEvent.set, psEvent.select];

      // Tell Photoshop to not unload us when closed
      function Persistent(inOn) {
        gStartDate = new Date();
        var event;
        if (inOn) {
          event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
        } else {
          event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
        }
        event.extensionId = gExtensionID;
        csInterface.dispatchEvent(event);
        SetResultTime();
      }
        // Tell Photoshop the events we want to listen for
      var _register = function(inOn, inEvents) {
        var event;
        if (inOn) {
          event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");
        } else {
          event = new CSEvent("com.adobe.PhotoshopUnRegisterEvent", "APPLICATION");
        }
        event.extensionId = gExtensionID;
        event.data = inEvents;
        console.log('dispatching event: ', event);
        csInterface.dispatchEvent(event);
      };

      /**
       * Toggle the 'set' event (Area mark) listener.
       * @param status - True or false -> on or off.
       */
      var selectListener = function(status) {
        _register(status, listenTo.toString());
      };
      // deactivate leftover listeners on startup
      selectListener(false);

      $scope.rmd = RMD.xmp.xmpmeta.RDF.Description;
      $scope.documentSize = {};

      // TODO: Remove debugging exposures.
      global._scope = $scope;
      global.RMD = RMD;

      // store the original image size
		  csInterface.evalScript('getDocumentSize()', function(value) {
        $scope.documentSize = JSON.parse(value);
      });


      /**
       * Event callback for Photoshop Events. Currently only the 'set' event.
       * @param csEvent Photoshop Event.
       */
      var PhotoshopCallbackUnique = function(csEvent) {
        console.log('receiving Callback: ', csEvent);
        if (typeof csEvent.data === "string") {
          var eventData = csEvent.data.replace("ver1,{", "{");
          var data = JSON.parse(eventData);
          console.log(data);
          if(data.eventData.null._property === 'selection' && data.eventID === psEvent.set
              && data.eventData.to._obj === 'rectangle' && activeArea){
            if(data.eventData.to.top._unit === 'pixelsUnit'){
              setAreaValues(data.eventData.to);
            } else {
              alert('Please set the units to Pixels. Other units are currently not supported.');
            }
          }
        } else {
            console.error("PhotoshopCallbackUnique expecting string for csEvent.data!");
        }
      };

      /**
       * Get the RMD object node for the given area key.
       * @returns {*} RMD node.
       */
      var getNodeForActiveArea = function() {
        if(activeArea === 'default') {
          return $scope.rmd.CropArea;
        } else if (activeArea === 'safe') {
          return $scope.rmd.SafeArea;
        } else if (activeArea === 'pivot') {
          return $scope.rmd.PivotPoint;
        } else {
          return $scope.rmd.RecommendedFrames.Bag.li[activeArea]
        }
      };

      /**
       * Sets the values returned by a Photoshop event in the RMD node.
       * @param ps_data Photoshop event property.
       */
      var setAreaValues = function(ps_data) {
        var node, x, y, width, height;
        node = getNodeForActiveArea();
        // PS returns the are as left, top, width height.
        // The RMD standard requires centerX, centerY, width height.
        width = ps_data.right._value - ps_data.left._value;
        height = ps_data.bottom._value - ps_data.top._value;
        x = ps_data.left._value + width/2;
        y = ps_data.top._value + height/2;
        node.x.__text = (x / $scope.documentSize.width).toString();
        node.y.__text = (y / $scope.documentSize.height).toString();
        if(node.w && node.h) {
          node.w.__text = (width / $scope.documentSize.width).toString();
          node.h.__text = (height / $scope.documentSize.height).toString();
        }

        $scope.$apply();
      };

      var setSelectionFromRmd = function() {
        var x, y, width, height, left, top, coords;
        var node = getNodeForActiveArea();
        x = parseFloat(node.x.__text) * $scope.documentSize.width;
        y = parseFloat(node.y.__text) * $scope.documentSize.height;
        if(node.w && node.h) {
          width = parseFloat(node.w.__text) * $scope.documentSize.width;
          height = parseFloat(node.h.__text) * $scope.documentSize.height;
        } else {
          width = SELECTION_SIZE_FOR_POINT;
          height = SELECTION_SIZE_FOR_POINT;
        }
        left = parseInt(x - width/2);
        top = parseInt(y - height/2);
        coords = {
          left: left,
          top: top,
          right: parseInt(left + width),
          bottom: parseInt(top + height)
        };
        csInterface.evalScript('makeSelection(' + JSON.stringify(coords) + ')');
      };

      // all callbacks need to be unique so only your panel gets them
      // for Photoshop specific add on the id of your extension
      csInterface.addEventListener("com.adobe.PhotoshopJSONCallback" + gExtensionID, PhotoshopCallbackUnique);

      /**
       * Adds a new crop region to the metadata. There are three types: The default crop area,
       * the safety area and a list of recommended crop areas
       * @param name - the name of the area. One of 'default', 'safe' or a number.
       */
      $scope.addCropArea = function(name) {
        var struct;
        if(name === undefined) {
          $scope.rmd.RecommendedFrames.Bag.li.push(_.cloneDeep(rmdFrameStruct));
        } else  {
          struct = _.cloneDeep(rmdFrameStruct);
          delete struct.MinAspectRatio;
          delete struct.MaxAspectRatio;
          if(name === 'default') {
            delete struct.MaxWidth;
            $scope.rmd.CropArea = struct;
          } else if(name === 'safe') {
            delete struct.MinWidth;
            $scope.rmd.SafeArea = struct;
          }
        }
      };
      /**
       * Removes the crop area from the metadata.
       * @param index - the name of the area to remove. One of 'default', 'safe' or a number.
       */
      $scope.removeCropArea = function(index) {
        // deactivate area
        if(activeArea === index) {
          $scope.setActiveArea(null);
        }
        if(index === 'default') {
          delete $scope.rmd.CropArea;
        } else if(index === 'safe') {
          delete $scope.rmd.SafeArea;
        } else {
          $scope.rmd.RecommendedFrames.Bag.li.splice(index, 1);
        }
      };
      /**
       * Check if the given area is active (listening to events)
       * @param area - the name of the area.
       * @returns {boolean}
       */
      $scope.isAreaActive = function(area) {
        return area === activeArea;
      };
      /**
       * Sets the given area as active.
       * @param area - the name of the area.
       */
      $scope.setActiveArea = function(area) {
        csInterface.evalScript('clearSelection()');
        if(activeArea === area  || area === null) {
          // turn it off
          selectListener(false);
          activeArea = null;
        } else {
          if(!activeArea) {
            selectListener(true);
          }
          activeArea = area;
          setSelectionFromRmd();
        }
      };

    }
  ]);
}(window));
