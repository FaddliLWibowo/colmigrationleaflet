// ################### Map providers ###################
// OSM Mapnik
var osm_street = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

// OSM Black and white
var osm_bw = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Stamen Toner
var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
});

// Esri topography
var esri_topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

// Esri satellite world imagery
var esri_satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Thunderforest transport map
var tf_transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}', {
  attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  apikey: '2c7ee6d6c9e848a9be98e27a855ba7fb',
  maxZoom: 22
});

// Carto positron light
var carto_light = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
});

// Carto dark matter
var carto_dark = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
});

var basemaps = {
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/osm-street.png'></div> Streets": osm_street,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/esri-sat.png'></div> Satellite": esri_satellite,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/esri-topo.png'></div> Topography": esri_topo,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/thunder-transit.png'></div> Transit": tf_transport,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/carto-light.png'></div> Grayscale": carto_light,
  "<div class='layers-control-img'><img src='css/img/map-thumbnails/carto-dark.png'></div> Dark Matter": carto_dark,
};




// ################### MAP INITIALIZATION ###################
// Bogota default coordinates
var coordBogota = [4.7110, -74.0721];

// Map creation
var map = new L.map("map", {
  zoomControl:false,
  center: coordBogota,
  zoom: 6,
  layers: [carto_light],
  wheelPxPerZoomLevel: 90,
});

// Add basemap layers to the map
L.control.layers(basemaps).addTo( map );
// Add zoom control to the top right
L.control.zoom({position: "topright"}).addTo( map );

// Add #sidebar element to map sidebar
var sidebar = L.control.sidebar("sidebar", { 
  autoPan: false,
  closeButton: false
}).addTo(map);

// Adds coordinates to URL
var hash = new L.Hash(map);

// Add scale control
L.control.scale().addTo(map);


// ####### TOOLBAR BUTTONS ####### //
// Button to show/hide legend sidebar
var legendButton = L.easyButton({
  states: [{
    stateName: 'hide-sidebar',        // name the state
    icon:      'fa-caret-left',               // and define its properties
    title:     'Hide legend sidebar',      // like its title
    onClick: function(btn) {       // and its callback
      sidebar.hide();
      btn.state('show-sidebar');    // change state on click!
    }
  }, {
    stateName: 'show-sidebar',
    icon:      'fa-bars',
    title:     'Show legend sidebar',
    onClick: function(btn, map) {
      sidebar.show();
      btn.state('hide-sidebar');
    }
  }]
}).addTo( map );

// Button: Fullscreen
var fullscreen = L.easyButton({
  states: [{
    icon: 'fa-arrows-alt',
    title: "Toggle Fullscreen",
    onClick: function(btn, map) {
      var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

      var docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }]
}).addTo(map);

// Button: default position
var mapDefaultLocation = L.easyButton({
  states: [{
    icon:'fa-globe', 
    title: "Default extent", 
    onClick: function(btn, map){
      map.setView(coordBogota, 6);
    }
  }]
}).addTo( map );

// Geolocalizer
var geoLocate = L.control.locate().addTo(map);

//Geocoder
var mapzenGeocoder = L.control.geocoder('mapzen-o4AkLq1',{
  attribution: "",
  expanded: false,
  layers: ["country", "region", "county"],
}).addTo(map);



// ###########################################################
// ####### SPECIFIC MAP ELEMENTS FROM HERE ON ################
// ###########################################################
// Line paths layer Canvas Flowmap
Papa.parse('data/Displacement_2.csv', {
  download: true,
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: function(results) {
    var geoJsonFeatureCollection = {
      type: 'FeatureCollection',
      features: results.data.map(function(datum) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [datum.Origin_LNG, datum.Origin_LAT]
          },
          properties: datum
        }
      })
    };

    migrationLayer = L.canvasFlowmapLayer(geoJsonFeatureCollection, {
      style: function(geoJsonFeature) {
        // use leaflet's path styling options

        // since the GeoJSON feature properties are modified by the layer,
        // developers can rely on the "isOrigin" property to set different
        // symbols for origin vs destination CircleMarker stylings
        if (geoJsonFeature.properties.isOrigin) {
          return {
            // renderer: canvasRenderer, // recommended to use your own L.canvas()
            radius: circleDisplRadius(geoJsonFeature.properties.Origin_N_Displ),
            weight: 0.60,
            color: '#E40066',
            fillColor: '#E40066', //#E40066
            fillOpacity: 0.1,
            className: "circle O" + geoJsonFeature.properties.Origin_ID,
          };
        } else {
          return {
            // renderer: canvasRenderer,
            radius: circleReceivedRadius(geoJsonFeature.properties.Destin_N_Receiv),
            weight: 0.60,
            color: '#457B9D',
            fillColor: '#457B9D',
            fillOpacity: 0.1,
            className: "circle D" + geoJsonFeature.properties.Destin_ID,
          };
        }
      },  

      originAndDestinationFieldIds: {
        originUniqueIdField: 'Origin_ID',
        originGeometry: {
          x: 'Origin_LNG',
          y: 'Origin_LAT'
        },
        destinationUniqueIdField: 'Destin_ID',
        destinationGeometry: {
          x: 'Destin_LNG',
          y: 'Destin_LAT'
        }
      },

      //Data-driven styling of volume on path lines
      canvasBezierStyle: {
        type: 'classBreaks',
        field: 'Count',
        classBreakInfos: [{
          classMinValue: 0,
          classMaxValue: 3000,
          symbol: {
            strokeStyle: 'rgba(255, 0, 51, 0.50)',
            lineWidth: 0.5,
            lineCap: 'round',
            shadowColor: 'rgba(255, 0, 51, 0.50)',
            shadowBlur: 1
          }
        }, {
          classMinValue: 3000,
          classMaxValue: 5000,
          symbol: {
            strokeStyle: 'rgba(255, 0, 51, 0.50)',
            lineWidth: 2.5,
            lineCap: 'round',
            shadowColor: 'rgba(255, 0, 51, 0.50)',
            shadowBlur: 1
          }
        }, {
          classMinValue: 5000,
          classMaxValue: 10000,
          symbol: {
            strokeStyle: 'rgba(255, 0, 51, 0.50)',
            lineWidth: 4,
            lineCap: 'round',
            shadowColor: 'rgba(255, 0, 51, 0.50)',
            shadowBlur: 1
          }
        }, {
          classMinValue: 10000,
          classMaxValue: 20000,
          symbol: {
            strokeStyle: 'rgba(255, 0, 51, 0.50)',
            lineWidth: 6.5,
            lineCap: 'round',
            shadowColor: 'rgba(255, 0, 51, 0.50)',
            shadowBlur: 1
          }
        }, {
          classMinValue: 20000,
          classMaxValue: 100000,
          symbol: {
            strokeStyle: 'rgba(255, 0, 51, 0.50)',
            lineWidth: 8,
            lineCap: 'round',
            shadowColor: '#E40066',
            shadowBlur: 1.5
          }
        }],

        defaultSymbol: {
          strokeStyle: '#E40066',
          lineWidth: 0.5,
          lineCap: 'round',
          shadowColor: '#E40066',
          shadowBlur: 1.5
        },
      },

      pathDisplayMode: 'selection',
      animationStarted: true,
      animationEasingFamily: 'Linear',
      animationEasingType: 'None',
      animationDuration: 2000
    }).addTo(map);

    //    
    migrationLayer.on('click', function(e) {
      if (e.sharedOriginFeatures.length) {
        // console.log("ID ORIGIN:", e.layer.feature.properties.Origin_ID);
        $("#munList").val(e.layer.feature.properties.Origin_ID);
        $("#munList").trigger("change");
        getMunFromArray(munArray);
        migrationLayer.selectFeaturesForPathDisplay(e.sharedOriginFeatures, 'SELECTION_NEW');
        
        d3.select("#button-out")
          .classed({
            "btn-info": true,
            "btn-default": false,
          });
        d3.selectAll("#button-in, #button-all")
          .classed({
            "btn-info": false,
            "btn-default": true,
          });

      }
      if (e.sharedDestinationFeatures.length) {
        $("#munList").val(e.layer.feature.properties.Destin_ID).trigger("change");
        getMunFromArray(munArray);
        console.log("ID DESTINATION:", e.layer.feature.properties.Destin_ID);
        migrationLayer.selectFeaturesForPathDisplay(e.sharedDestinationFeatures, 'SELECTION_NEW');
        
        d3.select("#button-in")
          .classed({
            "btn-info": true,
            "btn-default": false,
          });
        d3.selectAll("#button-out, #button-all")
          .classed({
            "btn-info": false,
            "btn-default": true,
          });
      }
    });
  } //end on.complete flowmap creation 
}); //end Papa.parsing

function circleDisplRadius(param) {
  return  param > 70000 ? 21 :
          param > 40000 ? 14 :
          param > 10000 ? 7 :
                          0.1;
};

function circleReceivedRadius(param) {
  return  param > 100000 ? 18 :
          param > 50000  ? 12 :
          param > 10000  ? 6 :
                          0.1;
};


// GLOBAL VARIABLES: Paths Layer
var selectedMun = {},
    munArray = [],
    toggleAnimation = true; //toggleAnimation toggle variable

/* #######PATHS BUTTONS ####### */
$("#button-out").click(showOutPaths);
$("#button-in").click(showInPaths);
$("#button-all").click(showAllPaths);
// Toggle toggleAnimation checkbox
$('#button-animate').click(function(event) {
  if (!toggleAnimation) {
    toggleAnimation = true;
    migrationLayer.playAnimation();

    d3.select("#button-animate")
      .classed("btn-danger", false)
      .classed("btn-success", true);
    

  } else {
    toggleAnimation = false;
    migrationLayer.stopAnimation();
    d3.select("#button-animate")
      .classed("btn-danger", true)
      .classed("btn-success", false);
    d3.selectAll("animate")
      .attr("attributeName", "");
  }
});


// Load statistics data from .csv
$.ajax({
  url: "data/Municipios_Resumen_num_OK.csv",
  async: true,
  success: function(csvd) {
    munArray = $.csv.toObjects(csvd);
  },
  dataType: "text",
  complete: function() { console.log("CSV loaded in", Date.now() - timerStart, "ms") },
});


/* ####### FUNCTIONS ######## */

//Redefine double click to reset path display
map.doubleClickZoom.disable();
map.on("dblclick", function(event) {
  migrationLayer.clearAllPathSelections();
  selectedMun = {};
    $("#munList").val("default");
});

// Calculate the line weight based on # of affected people
function getLineWeight(param) {
  return  param > 40000 ? 7 :
          param > 30000 ? 6 :
          param > 20000 ? 5 :
          param > 10000 ? 4 :
          param > 5000  ? 3 :
          param > 2500  ? 2 :
          param > 1000  ? 0.7 :
                          0.4;
};

// // Calculate line direction based in coordinates
// function getLineDirection(lng, lat) {
//   var deg = Math.atan2(lat, lng) * 180 / Math.PI;
//   var angle;
//   if (deg < 0) { angle = deg + 360 }
//   else { angle = deg };
//   //console.log(angle);
//   return  angle < 22.5  ? "E" :
//           angle < 67.5  ? "NE" :
//           angle < 112.5 ? "N" :
//           angle < 157.5 ? "NW" :
//           angle < 202.5 ? "W" :
//           angle < 247.5 ? "SW" :
//           angle < 292.5 ? "S" :
//           angle < 337.5 ? "SE" :
//                           "E";
// };

// Show individual municipality
// function showSelectedMun(feature, layer) {
//   layer.on('click', function(event) {
//     selectedMun.ID = parseInt(feature.properties.DPNP);
//     selectedMun.Coords = event.latlng;
//     selectedMun.Lat = selectedMun.Coords.lat;
//     selectedMun.Lng = selectedMun.Coords.lng;

//     var originClass = ".O" + selectedMun.ID,
//       destinyClass = ".D" + selectedMun.ID;

//     flyToSelectedMun();
//     showHidePathButtons();
//     showAllPaths();
//     hideAllPaths();
//     //Show municipality linePaths
//     d3.selectAll(originClass + "," + destinyClass)
//       .attr("stroke-opacity", 1);
//     //Change dropdown list value
//     $("#munList").val(selectedMun.ID).change();
//     updateBars();
//   });
// };


// Show paths going outside Municipality
function showOutPaths() {
  try{
    migrationLayer.selectFeaturesForPathDisplayById("Origin_ID", selectedMun.ID, true, "SELECTION_NEW" );} 
  catch(error){ console.log("showOutPaths: No Origin Paths"); }
  
  d3.select("#button-out")
    .classed({
      "btn-info": true,
      "btn-default": false,
    });
  d3.selectAll("#button-in, #button-all")
    .classed({
      "btn-info": false,
      "btn-default": true,
    });
};

// Show paths going inside Municipality
function showInPaths() {
  try{
    migrationLayer.selectFeaturesForPathDisplayById("Destin_ID", selectedMun.ID, false, "SELECTION_NEW");
  } catch(error){ console.log("showInPaths: No Destination Paths"); }

  d3.select("#button-in")
    .classed({
      "btn-info": true,
      "btn-default": false,
    });
  d3.selectAll("#button-out, #button-all")
    .classed({
      "btn-info": false,
      "btn-default": true,
    });
};

// Show all paths going in/out Municipality
function showAllPaths() {
  try{
    migrationLayer.selectFeaturesForPathDisplayById("Origin_ID", selectedMun.ID, true, "SELECTION_NEW" );
  } catch(error){ console.log("showAllPaths: No Origin Paths"); }
  try{
    migrationLayer.selectFeaturesForPathDisplayById("Destin_ID", selectedMun.ID, false, "SELECTION_ADD" );
  } catch(error){ console.log("showAllPaths: No Destination Paths"); }

  d3.select("#button-all")
    .classed({
      "btn-info": true,
      "btn-default": false,
    });
  d3.selectAll("#button-out, #button-in")
    .classed({
      "btn-info": false,
      "btn-default": true,
    });
};


// Get selected Municipality data from .csv read array 
function getMunFromArray(array) {
  $("#munList").change(function(){
    selectedMun.ID = parseInt($("#munList").val());
  for (var i = 0; i < array.length; i++) {
    if (parseInt(array[i].DPNP) === selectedMun.ID) {
      selectedMun.Lat = parseFloat(array[i].latitude);
      selectedMun.Lng = parseFloat(array[i].longitude);
      selectedMun.Coords = new L.latLng(array[i].latitude, array[i].longitude);
      
      //Set selectedMun object properties
      selectedMun.Out = parseInt(array[i].Desplazado);
      selectedMun.In = parseInt(array[i].Refugiados);
      selectedMun.Internal = parseInt(array[i].IDPs);
      selectedMun.Total = parseInt(array[i].TotalImpct);
      selectedMun.Pop1985 = parseInt(array[i].Pop1985);
      selectedMun.Pop2015 = parseInt(array[i].Pop2015);
    }
  }
  selectedMun.Name = $("#munList option:selected").html();
  showSelectedMunFromList();
  flyToSelectedMun();
  updateBars();
  });
  
};

// Show selected paths when Municipality is selected from list
function showSelectedMunFromList() {
  flyToSelectedMun();
  // showHidePathButtons();
  showAllPaths();
};

// Pan/Zoom to selected municipality
function flyToSelectedMun() {
  map.setView(selectedMun.Coords, map.getZoom(), {
    animate: true,
    easeLinearity: 0.3,
    duration: 0.5,
  });
};

// Show/Hide buttons controlling the path's display
function showHidePathButtons() {
  if (jQuery.isEmptyObject(selectedMun) || !togglePathsLayer) {
    d3.selectAll("#button-all, #button-in, #button-out")
      .style("display", "none");
  } else {
    d3.selectAll("#button-all, #button-in, #button-out")
      .style("display", "inline");
  };

  if(togglePathsLayer){
    d3.select("#button-animate")
      .style("display", "inline");
  } else {
    d3.select("#button-animate")
      .style("display", "none");
  }
};



// Update statistics bars and labels
function updateBars() {
  $("#munName").html("<b>" + selectedMun.Name + "</b>");

  var maxBarLen = Math.max(selectedMun.In, selectedMun.Out, selectedMun.Total,
    selectedMun.Internal, selectedMun.Pop1985, selectedMun.Pop2015);

  // d3.selectAll("#pop1985").transition().duration(800)
  //   .attr("width", 100 * selectedMun.Pop1985 / maxBarLen + "%");

  $("#pop1985").animate({ 'width': '' + 100 * selectedMun.Pop1985 / maxBarLen + "%" }, 800);
  $("#pop2015").animate({ 'width': '' + 100 * selectedMun.Pop2015 / maxBarLen + "%" }, 800);
  $("#statOut").animate({ 'width': '' + 100 * selectedMun.Out / maxBarLen + "%" }, 800);
  $("#statIn").animate({ 'width': '' + 100 * selectedMun.In / maxBarLen + "%" }, 800);
  $("#statInternal").animate({ 'width': '' + 100 * selectedMun.Internal / maxBarLen + "%" }, 800);
  $("#statTotal").animate({ 'width': '' + 100 * selectedMun.Total / maxBarLen + "%" }, 800);

  if (selectedMun.Pop1985 == 0) {
    $("#pop1985text").html("<b>1985 Population:</b>&emsp; -MISSING STATISTICS-");
  } else {
    $("#pop1985text").html("<b>1985 Population:</b>&emsp;" + d3.format(">n")(selectedMun.Pop1985));
  };
  $("#pop2015text").html("<b>2015 Population:</b>&emsp;" + d3.format("n")(selectedMun.Pop2015));
  $("#statOutText").html("<b>#People displaced FROM:</b>&emsp;" + d3.format("n")(selectedMun.Out));
  $("#statInText").html("<b>#People displaced TO:</b>&emsp;" + d3.format("n")(selectedMun.In));
  $("#statInternalText").html("<b>#People displaced WITHIN:</b>&emsp;" + d3.format("n")(selectedMun.Internal));
  $("#statTotalText").html("<b>#People displaced TOTAL:</b>&emsp;" + d3.format("n")(selectedMun.Total));

  d3.select("#infoBars")
    .style("display", "inline");
};

$.ajax({
  url: "js/heatmapArraysData.js",
  dataType: "script",
  success: function(){
    heatmapDisplaced = L.heatLayer(heatmapArrayDisplaced, {
      radius: 25,
      max: 24,
      blur: 25
    });

    heatmapReceived = L.heatLayer(heatmapArrayReceived, {
      radius: 25,
      max: 30,
      blur: 30
    });
  }
});

// Heatmaps
// Global variables to hold heatmaps arrays and toogle the buttons
var toggleHeatmapDisplaced = false,
    toggleHeatmapReceived = false,
    togglePathsLayer = true
    toggleMunicip = true;

// Button: toogle municipalities circle layer
$('#button-toggle-municip').click(function() {
  if (toggleMunicip){
    toggleMunicip = false;
    
    //map.removeLayer(municipPoint);
    d3.selectAll(".circle")
      .style("display", "none");

    d3.select('#button-toggle-municip')
      .classed("btn-success", false)
      .classed("btn-danger", true);
      // .text("Circles:OFF");
  } else {
    toggleMunicip = true;
    d3.selectAll(".circle")
      .style("display", "inline");
    // municipPoint.addTo(map).bringToFront();
    d3.select('#button-toggle-municip')
      .classed("btn-success", true)
      .classed("btn-danger", false);
      // .text("Circles:ON");
  }
});

$('#button-toggle-disp-hmap').click(function(event) {
  if (toggleHeatmapDisplaced){
    toggleHeatmapDisplaced = false;
    map.removeLayer(heatmapDisplaced);
    d3.select('#button-toggle-disp-hmap')
      .classed("btn-success", false)
      .classed("btn-danger", true);
  } else {
    toggleHeatmapDisplaced = true;
    //map.setView(coordBogota, 6);
    heatmapDisplaced.addTo(map);
    d3.select('#button-toggle-disp-hmap')
      .classed("btn-success", true)
      .classed("btn-danger", false);
  }
});

$('#button-toggle-recep-hmap').click(function(event) {
  if (toggleHeatmapReceived){
    toggleHeatmapReceived = false;
    map.removeLayer(heatmapReceived);
    d3.select('#button-toggle-recep-hmap')
      .classed("btn-success", false)
      .classed("btn-danger", true);
  } else {
    toggleHeatmapReceived = true;
    //map.setView(coordBogota, 6);
    heatmapReceived.addTo(map);
    d3.select('#button-toggle-recep-hmap')
      .classed("btn-success", true)
      .classed("btn-danger", false);
  }
});


// ############## MASACRES LAYER ##############
var overlay = null, //Global overlay variable
    c = 0; // Debugging counter

function filterMasacresLayer() {
  if (overlay != null) { overlay.clearLayers() };
  masacresLayer = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
      // //Append coordinates for heatmap array
      // var pointArray = [+feature.geometry.coordinates[1], +feature.geometry.coordinates[0], 1];
      // //console.log(pointArray);
      // heatmapArray.push(pointArray);

      date = new Date('"' + feature.properties.FECHA + '"');
      month = date.getMonth() + 1;
      dateFormat = date.getFullYear() + "-" + month + "-" + date.getDate();
      feature.properties.FECHA_YYMMDD = dateFormat;
      c += 1;
      //console.log(c, feature.properties.TIPO_GRUPO, feature.properties.NOMBRE_MASACRE);
      layer.bindPopup(
        '<h4><strong>' + feature.properties.NOMBRE_MASACRE + '</strong></h4>' +
        '<strong>DATE: </strong>' + feature.properties.FECHA_YYMMDD + '<br/>' +
        '<strong>MUNICIPALITY: </strong>' + feature.properties.MUNICIPIO + '<br/>' +
        '<strong>DEPARTAMENT: </strong>' + feature.properties.DEPARTAMENTO + '<br/>' +
        '<strong>ARMED GROUP: </strong>' + feature.properties.GRUPO_ARMADO + '<br/>' +
        '<strong>TYPE: </strong>' + feature.properties.TIPO_GRUPO + '<br/>' +
        '<div class="link"><a target="_blank" href="' + feature.properties.URL + '">SEE MORE...</a><div>'
      );
    },

    pointToLayer: function(feature, latlng) { //Style the layer based on TIPO_GRUPO
      if (feature.properties.TIPO_GRUPO == "PARAMILITARES") {
        circle = new L.CircleMarker(latlng, {
          className: "circle-masacre circle-masacre-para",
          radius: 4,
          color: "#d62728",
          opacity: 0.5,
          fillOpacity: 0.5,
          weight: 0.25,
        });
        // addTooltip(circle, feature, tooltip);
        if (filterP == true) {
          return circle;
        }
      };
      if (feature.properties.TIPO_GRUPO == "GUERRILLA") {
        circle = new L.CircleMarker(latlng, {
          className: "circle-masacre circle-masacre-guer",
          radius: 4,
          color: "#2ca02c",
          opacity: 0.5,
          fillOpacity: 0.5,
          weight: 0.25,
          municipio: feature.properties.MUNICIPIO
        });
        // addTooltip(circle, feature, tooltip);
        if (filterG == true) {
          return circle;
        }
      };
      if (feature.properties.TIPO_GRUPO == "NO_IDENTIFICADO") {
        circle = new L.CircleMarker(latlng, {
          className: "circle-masacre circle-masacre-noid",
          radius: 4,
          color: "#bcbd22",
          opacity: 0.5,
          fillOpacity: 0.5,
          weight: 0.25,
          municipio: feature.properties.MUNICIPIO
        });
        // addTooltip(circle, feature, tooltip);
        if (filterNI == true) {
          return circle;
        }
      };
      if (feature.properties.TIPO_GRUPO == "BACRIM") {
        circle = new L.CircleMarker(latlng, {
          className: "circle-masacre circle-masacre-bacr",
          radius: 4,
          color: "#9467bd",
          opacity: 0.5,
          fillOpacity: 0.5,
          weight: 0.25,
          municipio: feature.properties.MUNICIPIO
        });
        // addTooltip(circle, feature, tooltip);
        if (filterB == true) {
          return circle;
        }
      };
      if (feature.properties.TIPO_GRUPO == "FUERZA_PUBLICA") {
        circle = new L.CircleMarker(latlng, {
          className: "circle-masacre circle-masacre-fupu",
          radius: 4,
          color: "#17becf",
          opacity: 0.5,
          fillOpacity: 0.5,
          weight: 0.25,
          municipio: feature.properties.MUNICIPIO
        });
        // addTooltip(circle, feature, tooltip);
        if (filterFP == true) {
          return circle;
        }
      };
    },

    filter: function(feature, layer) {
      // if (feature.properties.ANIO >= rangeStart && feature.properties.ANIO <= rangeEnd) {
      //   c += 1;
      //   //console.log(count);
      // };
      return (feature.properties.ANIO >= rangeStart && feature.properties.ANIO <= rangeEnd);
    },
  });
  //Omnivore CSV import and addition to map
  omnivore.csv('data/Masacres_Data.csv', null, masacresLayer);
  overlay = L.layerGroup([masacresLayer]).addTo(map);
}

// TIME SLIDER
var rangeStart = 1982, //Global time range variables
  rangeEnd = 2013,
  count = 0;

$(function() {
  $("#slider-range").slider({
    change: function() {
      rangeStart = $("#slider-range").slider("values", 0);
      rangeEnd = $("#slider-range").slider("values", 1);
      filterMasacresLayer();
    },
    range: true,
    min: 1982,
    max: 2013,
    values: [1982, 2013],
    slide: function(event, ui) {
      $("#slider-time-text").val(ui.values[0] + " - " + ui.values[1]);
    }
  });

  $("#slider-time-text").val($("#slider-range").slider("values", 0) +
    " - " + $("#slider-range").slider("values", 1));
});

// Global variables for filtering groups
var checkboxP = $("#inputP"),
  filterP = true;
var checkboxG = $("#inputG"),
  filterG = true;
var checkboxB = $("#inputB"),
  filterB = true;
var checkboxFP = $("#inputFP"),
  filterFP = true;
var checkboxNI = $("#inputNI"),
  filterNI = true;
var toggleMasacresLayer = false;

// Configuration of checkboxes events
checkboxP.change(function(event) {
  var checkboxP = event.target;
  if (checkboxP.checked) {
    filterP = true;
  } else {
    filterP = false;
  }
  filterMasacresLayer();
});

checkboxG.change(function(event) {
  var checkboxG = event.target;
  if (checkboxG.checked) {
    filterG = true;
  } else {
    filterG = false;
  }
  filterMasacresLayer();
});

checkboxB.change(function(event) {
  var checkboxB = event.target;
  if (checkboxB.checked) {
    filterB = true;
  } else {
    filterB = false;
  }
  filterMasacresLayer();
});

checkboxFP.change(function(event) {
  var checkboxFP = event.target;
  if (checkboxFP.checked) {
    filterFP = true;
  } else {
    filterFP = false;
  }
  filterMasacresLayer();
});

checkboxNI.change(function(event) {
  var checkboxNI = event.target;
  if (checkboxNI.checked) {
    filterNI = true;
  } else {
    filterNI = false;
  }
  filterMasacresLayer();
});


// Button: Toggle massacres layer 
$('#button-toggle-masacres').click(function(event) {
  $("#time-slider").toggle();
  $("#masacres-perpetrators").toggle();
  if (toggleMasacresLayer){
    toggleMasacresLayer = false;
    map.removeLayer(masacresLayer);
    d3.select('#button-toggle-masacres')
      .classed("btn-success", false)
      .classed("btn-danger", true);
  } else {
    toggleMasacresLayer = true;
    filterMasacresLayer();
    // masacresLayer.addTo(map);
    d3.select('#button-toggle-masacres')
      .classed("btn-success", true)
      .classed("btn-danger", false);
  }
});