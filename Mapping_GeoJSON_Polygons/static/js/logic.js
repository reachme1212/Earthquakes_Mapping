// Add console.log to check to see if our code is working.
console.log("working");

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/reachme1212/Earthquakes_Mapping/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/static/js/torontoNeighborhoods.json";



d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {

        onEachFeature: function(feature, layer) {
            console.log(feature);
            layer.bindPopup("<h3> Area Code: " +
                feature.properties.AREA_S_CD + "</h3> <hr> <h3> Area Name :" + feature.properties.AREA_NAME + "</h3>  ");
        }

    }).addTo(map);
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

let map = L.map("mapid", {
    center: [43.7, -79.3],

    fillOpacity: 0.50,
    color: "yellow",
    weight: 2,
    zoom: 11,
    layers: [satelliteStreets]
});
// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseMaps).addTo(map);