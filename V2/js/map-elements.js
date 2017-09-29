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
}).addTo(map);

// antPathArray = [];
// ###########################################################
// ####### SPECIFIC MAP ELEMENTS FROM HERE ON ################
// ###########################################################
// Line paths layer
var pathsLayer = null;
$.getJSON("data/displacement.geojson", function(data) {
  // set pathsLayer to GeoJSON, add GeoJSON layer to the map once the file is loaded
  pathsLayer = L.geoJson(data, {
    className: 'polyline',
    interactive: false,
    style: function(feature) {
      // var antLine = [[feature.properties.OrgLat, feature.properties.OrgLon] , [feature.properties.DestLat, feature.properties.DestLon]];
      // antPathArray.push(antLine);

      var dirLon = feature.properties.DestLon - feature.properties.OrgLon;
      var dirLat = feature.properties.DestLat - feature.properties.OrgLat;
      var direction = getLineDirection(dirLon, dirLat);
      //console.log(dirLon, dirLat, direction);
      feature.properties["stroke"] = "url(#" + direction + ")";

      return {
        className: "linePath D" + feature.properties.Dest + " O" + feature.properties.Origin + " " + feature.properties.stroke.replace(/#/, "").replace(/\(/, "").replace(/\)/, ""),
        weight: getLineWeight(feature.properties.Count),
        color: feature.properties.stroke,
      };
    },
  }).addTo(map);
});

// Municipalities point layer
var municipPoint = L.geoJson(null, {
  onEachFeature: function(feature, layer){
    showSelectedMun(feature, layer);
  //Append coordinates for heatmap array
    var displacedPoint = [+feature.geometry.coordinates[1], +feature.geometry.coordinates[0], +feature.properties.Desplazado];
    var receivedPoint = [+feature.geometry.coordinates[1], +feature.geometry.coordinates[0], +feature.properties.Refugiados];
    //console.log(pointArray);
    heatmapArrayDisplaced.push(displacedPoint);
    heatmapArrayReceived.push(receivedPoint);
  },

  filter: function(feature, layer) {
    return feature.properties.TotalImpct > 10000; //Initial filter
  },
  pointToLayer: function(feature, latlng) { //Style the layer based on TotalImpact
    if (feature.properties.TotalImpct > 100000) {
      return new L.CircleMarker(latlng, {
        className: "circle circle-l",
        radius: 18,
        color: "black",
        opacity: 0.40,
        weight: 1.2,
        // dashArray: "3,6",
        fillColor: "#E40066",
        fillOpacity: 0.01,
      });
    };

    if (feature.properties.TotalImpct > 50000 && feature.properties.TotalImpct < 100000) {
      return new L.CircleMarker(latlng, {
        className: "circle circle-m",
        radius: 12,
        color: "black",
        opacity: 0.40,
        weight: 1.2,
        // dashArray: "3,5",
        fillColor: "#E40066",
        fillOpacity: 0.01,
      });
    };
    
    if (feature.properties.TotalImpct < 50000) {
      return new L.CircleMarker(latlng, {
        className: "circle circle-s",
        radius: 6,
        color: "black",
        opacity: 0.40,
        weight: 1.2,
        // dashArray: "2,3",
        fillColor: "#E40066",
        fillOpacity: 0.01,
      });
    };
  },
});
//Omnivore CSV import and addition to map
omnivore.csv('data/Municipios_Resumen_num.csv', null, municipPoint).addTo(map);
// END --- Municipalities point layer


// GLOBAL VARIABLES: Paths Layer
var selectedMun = {},
    munArray = [],
    toggleAnimation = false; //toggleAnimation toggle variable

/* #######PATHS BUTTONS ####### */
$("#button-out").click(showOutPaths);
$("#button-in").click(showInPaths);
$("#button-all").click(showAllPaths);
// Toggle toggleAnimation checkbox
$('#button-animate').click(function(event) {
  if (!toggleAnimation) {
    toggleAnimation = true;
    d3.select("#button-animate")
      .classed("btn-danger", false)
      .classed("btn-success", true);
    d3.selectAll("animate")
      .attr("attributeName", "offset");
  } else {
    toggleAnimation = false;
    d3.select("#button-animate")
      .classed("btn-danger", true)
      .classed("btn-success", false);
    d3.selectAll("animate")
      .attr("attributeName", "");
  }
});


// Load statistics data from .csv
$.ajax({
  url: "data/Municipios_Resumen_num.csv",
  async: true,
  success: function(csvd) {
    munArray = $.csv.toObjects(csvd);
  },
  dataType: "text",
  complete: function() { console.log("CSV loaded in", Date.now() - timerStart, "ms") },
});


/* ####### FUNCTIONS ######## */
// Actions after AJAX requests complete
$( document ).ajaxComplete(function() {
    municipPoint.bringToFront();
    // Functions run at beginning
    showHidePathButtons();
});

//Redefine double click to reset path display
map.doubleClickZoom.disable();
map.on("dblclick", function(event) {
  resetPaths();
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

// Calculate line direction based in coordinates
function getLineDirection(lng, lat) {
  var deg = Math.atan2(lat, lng) * 180 / Math.PI;
  var angle;
  if (deg < 0) { angle = deg + 360 }
  else { angle = deg };
  //console.log(angle);
  return  angle < 22.5  ? "E" :
          angle < 67.5  ? "NE" :
          angle < 112.5 ? "N" :
          angle < 157.5 ? "NW" :
          angle < 202.5 ? "W" :
          angle < 247.5 ? "SW" :
          angle < 292.5 ? "S" :
          angle < 337.5 ? "SE" :
                          "E";
};

// Show individual municipality
function showSelectedMun(feature, layer) {
  layer.on('click', function(event) {
    selectedMun.ID = parseInt(feature.properties.DPNP);
    selectedMun.Coords = event.latlng;
    selectedMun.Lat = selectedMun.Coords.lat;
    selectedMun.Lng = selectedMun.Coords.lng;

    var originClass = ".O" + selectedMun.ID,
      destinyClass = ".D" + selectedMun.ID;

    flyToSelectedMun();
    showHidePathButtons();
    showAllPaths();
    hideAllPaths();
    //Show municipality linePaths
    d3.selectAll(originClass + "," + destinyClass)
      .attr("stroke-opacity", 1);
    //Change dropdown list value
    $("#munList").val(selectedMun.ID).change();
    updateBars();
  });
};

// Reset default view on double click: show all linePaths
function resetPaths() {
  selectedMun = {};
  $("#munList").val("default");
  showHidePathButtons();
  showAllPaths();
  d3.selectAll(".linePath")
    .attr("stroke-opacity", 1);
  d3.select("#infoBars")
    .style("display", "none");
};

// Show paths going outside Municipality
function showOutPaths() {
  var outQuery = ".O" + selectedMun.ID;
  hideAllPaths();
  //console.log(selectedMun.ID, outQuery);
  d3.selectAll(outQuery)
    .attr("stroke-opacity", 1);
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
  var inQuery = ".D" + selectedMun.ID;
  hideAllPaths();
  //console.log(selectedMun.ID, inQuery);
  d3.selectAll(inQuery)
    .attr("stroke-opacity", 1);

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
  var allQuery = ".D" + selectedMun.ID + ", .O" + selectedMun.ID;
  hideAllPaths();
  //console.log(selectedMun.ID, allQuery);
  d3.selectAll(allQuery)
    .attr("stroke-opacity", 1);
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

// Hide all paths
function hideAllPaths() {
  d3.selectAll(".linePath") //Hide all linePaths
    .attr("stroke-opacity", 0);
};

// Get selected Municipality data from .csv read array 
function getMunFromArray(array) {
  selectedMun.ID = parseInt($("#munList").val());
  for (var i = 0; i < array.length; i++) {
    if (parseInt(array[i].DPNP) === selectedMun.ID) {
      selectedMun.Lat = array[i].latitude;
      selectedMun.Lng = array[i].longitude;
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
};

// Show selected paths when Municipality is selected from list
function showSelectedMunFromList() {
  flyToSelectedMun();
  showHidePathButtons();
  showAllPaths();
  hideAllPaths();
  //Show municipality linePaths
  var originClass = ".O" + selectedMun.ID,
    destinyClass = ".D" + selectedMun.ID;
  d3.selectAll(originClass + "," + destinyClass)
    .attr("stroke-opacity", 1);
};

// Pan/Zoom to selected municipality
function flyToSelectedMun() {
  map.setView(selectedMun.Coords, 7, {
    animate: true,
    easeLinearity: 0.3,
    duration: 0.5,
    //noMoveStart: true,
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

// Heatmaps
// Global variables to hold heatmaps arrays and toogle the buttons
var heatmapArrayDisplaced = [],
    heatmapArrayReceived = [],
    toggleHeatmapDisplaced = false,
    toggleHeatmapReceived = false,
    togglePathsLayer = true
    toggleMunicip = true;

var heatmapDisplaced = L.heatLayer(heatmapArrayDisplaced, {
  radius: 25,
  max: 24,
  blur: 25
});

var heatmapReceived = L.heatLayer(heatmapArrayReceived, {
  radius: 25,
  max: 30,
  blur: 30
});

// Button: toogle municipalities circle layer
$('#button-toggle-municip').click(function() {
  if (toggleMunicip){
    toggleMunicip = false;
    map.removeLayer(municipPoint);
    d3.select('#button-toggle-municip')
      .classed("btn-success", false)
      .classed("btn-danger", true);
      // .text("Circles:OFF");
  } else {
    toggleMunicip = true;
    municipPoint.addTo(map).bringToFront();
    d3.select('#button-toggle-municip')
      .classed("btn-success", true)
      .classed("btn-danger", false);
      // .text("Circles:ON");
  }
});

// Button: toogle paths layer
$('#button-toggle-pathlayer').click(function(event) {
  if (togglePathsLayer){
    togglePathsLayer = false;
    map.removeLayer(pathsLayer);
    selectedMun = {};
    showHidePathButtons();
    $("#munList").val("default");
    d3.select("#infoBars")
    .style("display", "none");

    d3.select('#button-toggle-pathlayer')
      .classed("btn-success", false)
      .classed("btn-danger", true);
      // .text("Paths:OFF");
  } else {
    togglePathsLayer = true;
    selectedMun = {};
    $("#munList").val("default");
    d3.select("#infoBars")
    .style("display", "none");

    showHidePathButtons();
    map.setView(coordBogota, 6);
    pathsLayer.addTo(map).bringToBack();
    d3.select('#button-toggle-pathlayer')
      .classed("btn-success", true)
      .classed("btn-danger", false);
      // .text("Paths:ON");
  }
});

$('#button-toggle-disp-hmap').click(function(event) {
  if (togglePathsLayer){
    togglePathsLayer = false;
    map.removeLayer(heatmapDisplaced);
    d3.select('#button-toggle-disp-hmap')
      .classed("btn-success", false)
      .classed("btn-danger", true);
  } else {
    togglePathsLayer = true;
    map.setView(coordBogota, 6);
    heatmapDisplaced.addTo(map);
    d3.select('#button-toggle-disp-hmap')
      .classed("btn-success", true)
      .classed("btn-danger", false);
  }
});

$('#button-toggle-recep-hmap').click(function(event) {
  if (togglePathsLayer){
    togglePathsLayer = false;
    map.removeLayer(heatmapReceived);
    d3.select('#button-toggle-recep-hmap')
      .classed("btn-success", false)
      .classed("btn-danger", true);
  } else {
    togglePathsLayer = true;
    map.setView(coordBogota, 6);
    heatmapReceived.addTo(map);
    d3.select('#button-toggle-recep-hmap')
      .classed("btn-success", true)
      .classed("btn-danger", false);
  }
});

// map.removeLayer(masacresLayer);







// ############## MASACRES LAYER ##############
var overlay = null, //Global overlay variable
    c = 0; // Debugging counter

//filterLayer(); // Initial loading of massacres layer

function filterLayer() {
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
        '<h4>' + feature.properties.NOMBRE_MASACRE + '</h4>' +
        '<strong>DATE: </strong>' + feature.properties.FECHA_YYMMDD + '<br/>' +
        '<strong>MUNICIPALITY: </strong>' + feature.properties.MUNICIPIO + '<br/>' +
        '<strong>DEPARTAMENT: </strong>' + feature.properties.DEPARTAMENTO + '<br/>' +
        '<strong>ARMED GROUP: </strong>' + feature.properties.GRUPO_ARMADO + '<br/>' +
        '<strong>TYPE: </strong>' + feature.properties.TIPO_GRUPO + '<br/>' +
        '<div class="link"><a target="_blank" href="' + feature.properties.URL + '">SEE MORE...</a><div>'
      );
    },

    pointToLayer: function(feature, latlng) { //Style the layer based on TIPO_GRUPO
      // var tooltip = d3.select("body")
      //   .append("div")
      //   .attr("class", "tooltip")
      //   .style("border-radius", "3px")
      //   .style("padding-left", "2px").style("padding-right", "2px")
      //   .style("background-color", "rgba(255, 255, 255, 0.75)")
      //   .style("position", "absolute")
      //   .style("font-family", "'Open Sans', sans-serif")
      //   .style("font-size", "10px")
      //   .style("z-index", "100000")
      //   .style("visibility", "hidden");

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
      if (feature.properties.ANIO >= rangeStart && feature.properties.ANIO <= rangeEnd) {
        c += 1;
        //console.log(count);
      };
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
      filterLayer();
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

// // Function to add the tooltip with name of masacre
// function addTooltip(circleMarker, feature, tooltip) {
//   circleMarker.on("mouseover", function(e) {
//     //console.log(feature.properties.MUNICIPIO);
//     return tooltip.style("visibility", "visible")
//       .text(feature.properties.MUNICIPIO);
//   });
//   circleMarker.on("mousemove", function() {
//     return tooltip.style("top", (event.pageY - 10) + "px")
//       .style("left", (event.pageX + 10) + "px")
//       .text(feature.properties.MUNICIPIO);
//   })
//   circleMarker.on("mouseout", function() {
//     return tooltip.style("visibility", "hidden");
//   });
//   circleMarker.on("click", function() {
//     return tooltip.style("visibility", "hidden");
//   });
// }

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
  filterLayer();
});

checkboxG.change(function(event) {
  var checkboxG = event.target;
  if (checkboxG.checked) {
    filterG = true;
  } else {
    filterG = false;
  }
  filterLayer();
});

checkboxB.change(function(event) {
  var checkboxB = event.target;
  if (checkboxB.checked) {
    filterB = true;
  } else {
    filterB = false;
  }
  filterLayer();
});

checkboxFP.change(function(event) {
  var checkboxFP = event.target;
  if (checkboxFP.checked) {
    filterFP = true;
  } else {
    filterFP = false;
  }
  filterLayer();
});

checkboxNI.change(function(event) {
  var checkboxNI = event.target;
  if (checkboxNI.checked) {
    filterNI = true;
  } else {
    filterNI = false;
  }
  filterLayer();
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
    filterLayer();
    // masacresLayer.addTo(map);
    d3.select('#button-toggle-masacres')
      .classed("btn-success", true)
      .classed("btn-danger", false);
  }
});

// const path = new L.Polyline.AntPath([
//   [[3,70],[7,70]], 
//   [[3,70],[6,70]] 
// ]);
// path.addTo(map);

// // antPolyline = L.polyline.antPath(antPathArray);
// // antPolyline.addTo(map);