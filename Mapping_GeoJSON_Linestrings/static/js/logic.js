// Add console.log to check to see if our code is working.
console.log("working");

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/reachme1212/Earthquakes_Mapping/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/static/js/majorAirports.json";

d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(feature);
            return L.marker(latlng).bindPopup("<h2>" +

                feature.properties.faa + "</h2> <hr> <h3>" + feature.properties.name + "</h3>  ");
        }

    }).addTo(map);
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v10',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v10',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});
// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseMaps).addTo(map);