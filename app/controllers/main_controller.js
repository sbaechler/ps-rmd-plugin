(function(global) {
  'use strict';

  var SELECTION_SIZE_FOR_POINT = 4;

  angular.module('app')
      .controller('MainController', ['$scope', 'csInterface', 'rmdBridge',
        'rmdDefault', 'lodash', 'psEvent', 'rmdFrameStruct', 'CSEvent',
        function ($scope, csInterface, RMD, rmdDefault, _, psEvent,
                  rmdFrameStruct, CSEvent) {

          var activeArea = null;
          var gExtensionID = csInterface.getExtensionID();
          var listenTo = [psEvent.set, psEvent.select];

          // Tell Photoshop to not unload us when closed
          function Persistent(inOn) {
            var event;
            if (inOn) {
              event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
            } else {
              event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
            }
            event.extensionId = gExtensionID;
            csInterface.dispatchEvent(event);
          }

          // Tell Photoshop the events we want to listen for
          var _register = function (inOn, inEvents) {
            var event;
            if (inOn) {
              event = new CSEvent("com.adobe.PhotoshopRegisterEvent", "APPLICATION");
            } else {
              event = new CSEvent("com.adobe.PhotoshopUnRegisterEvent", "APPLICATION");
            }
            event.extensionId = gExtensionID;
            event.data = inEvents;
            csInterface.dispatchEvent(event);
          };

          /**
           * Toggle the 'set' event (Area mark) listener.
           * @param status - True or false -> on or off.
           */
          var selectListener = function (status) {
            _register(status, listenTo.toString());
          };
          // deactivate leftover listeners on startup
          selectListener(false);

          // Get the XMP from the open file and store the name of it for reference.
          RMD.extractXMP().then(function (xmp) {
            $scope.rmd = xmp.xmpmeta.RDF.Description;
            $scope.targetName = RMD.targetName;
          }).catch(function(error){throw new Error(error);});

          $scope.documentSize = {};


          // TODO: Remove debugging exposures.
          global._scope = $scope;
          global.RMD = RMD;

          // store the original image size
          csInterface.evalScript('getDocumentSize()', function (value) {
            $scope.documentSize = JSON.parse(value);
          });

          /**
           * Event callback for Photoshop Events. Currently only the 'set' event.
           * @param csEvent Photoshop Event.
           */
          var PhotoshopCallbackUnique = function (csEvent) {
            // console.log('receiving Callback: ', csEvent);
            if (typeof csEvent.data === "string") {
              var eventData = csEvent.data.replace("ver1,{", "{");
              var data = JSON.parse(eventData);
              if (data.eventData.null._property === 'selection' && data.eventID === psEvent.set
                  && data.eventData.to._obj === 'rectangle' && activeArea) {
                if (data.eventData.to.top._unit === 'pixelsUnit') {
                  $scope.setAreaValues(data.eventData.to);
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
          $scope.getNodeForActiveArea = function () {
            if (activeArea === 'default') {
              return $scope.rmd.CropArea;
            } else if (activeArea === 'safe') {
              return $scope.rmd.SafeArea;
            } else if (activeArea === 'pivot') {
              if($scope.rmd.PivotPoint === undefined) {
                $scope.rmd.PivotPoint = {__prefix: 'rmd'};
              }
              return $scope.rmd.PivotPoint;
            } else {
              return $scope.rmd.RecommendedFrames.Bag.li[activeArea];
            }
          };

          /**
           * Sets the values returned by a Photoshop event in the RMD node.
           * @param ps_data Photoshop event property.
           */
          $scope.setAreaValues = function (ps_data) {
            var node, x, y, width, height;
            node = $scope.getNodeForActiveArea();
            // PS returns the are as left, top, width height.
            // The RMD standard requires centerX, centerY, width height.
            width = ps_data.right._value - ps_data.left._value;
            height = ps_data.bottom._value - ps_data.top._value;
            x = ps_data.left._value + width / 2;
            y = ps_data.top._value + height / 2;
            node['_stArea:x'] = (x / $scope.documentSize.width).toString();
            node['_stArea:y'] = (y / $scope.documentSize.height).toString();
            if (node['_stArea:w'] && node['_stArea:h']) {
              node['_stArea:w'] = (width / $scope.documentSize.width).toString();
              node['_stArea:h'] = (height / $scope.documentSize.height).toString();
            }

            $scope.$apply();
          };

          $scope.setSelectionFromRmd = function () {
            var x, y, width, height, left, top, coords;
            var node = $scope.getNodeForActiveArea();
            x = parseFloat(node['_stArea:x']) * $scope.documentSize.width;
            y = parseFloat(node['_stArea:y']) * $scope.documentSize.height;
            if (node['_stArea:w'] && node['_stArea:h']) {
              width = parseFloat(node['_stArea:w']) * $scope.documentSize.width;
              height = parseFloat(node['_stArea:h']) * $scope.documentSize.height;
            } else {
              width = SELECTION_SIZE_FOR_POINT;
              height = SELECTION_SIZE_FOR_POINT;
            }
            left = parseInt(x - width / 2);
            top = parseInt(y - height / 2);
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
          $scope.addCropArea = function (name) {
            var struct = _.cloneDeep(rmdFrameStruct);
            if (name === undefined) {
              struct.__prefix = 'rdf';
              $scope.rmd.RecommendedFrames.Bag.li.push(struct);
            } else {
              if (name === 'default') {
                $scope.rmd.CropArea = struct;
              } else if (name === 'safe') {
                $scope.rmd.SafeArea = struct;
              }
            }
          };
          /**
           * Removes the crop area from the metadata.
           * @param index - the name of the area to remove. One of 'default', 'safe' or a number.
           */
          $scope.removeCropArea = function (index) {
            // deactivate area
            if (activeArea === index) {
              $scope.setActiveArea(null);
            }
            if (index === 'default') {
              delete $scope.rmd.CropArea;
            } else if (index === 'safe') {
              delete $scope.rmd.SafeArea;
            } else {
              index = parseInt(index);
              $scope.rmd.RecommendedFrames.Bag.li.splice(index, 1);
            }
          };
          /**
           * Check if the given area is active (listening to events)
           * @param area - the name of the area.
           * @returns {boolean}
           */
          $scope.isAreaActive = function (area) {
            return area === activeArea;
          };
          /**
           * Sets the given area as active.
           * @param area - the name of the area.
           */
          $scope.setActiveArea = function (area) {
            csInterface.evalScript('clearSelection()');
            if (activeArea === area || area === null) {
              // turn it off
              selectListener(false);
              activeArea = null;
            } else {
              if (!activeArea) {
                selectListener(true);
              }
              activeArea = area;
              $scope.setSelectionFromRmd();
            }
          };

          $scope.removePivotPoint = function() {
            delete $scope.rmd.PivotPoint;
            if($scope.isAreaActive('pivot')){
              $scope.setActiveArea(null);
            }
          };

          $scope.commit = function () {
            csInterface.evalScript('getDocumentSize()', function (value) {
              $scope.documentSize = JSON.parse(value);
              RMD.setDocumentSize($scope.documentSize);
              RMD.storeXMP().then(function (response) {
                if (parseInt(response) === 0) {
                  console && console.log('XMP updated');
                }
              });
            });
          };

          $scope.revert = function () {
            RMD.extractXMP()
                .then(function (xmp) {
                  $scope.rmd = xmp.xmpmeta.RDF.Description;
                  $scope.$apply();
                });
          };
          return this;
        }
      ]);
}(window));
