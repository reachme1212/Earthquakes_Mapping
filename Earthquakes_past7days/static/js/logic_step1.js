// Add console.log to check to see if our code is working.
console.log("working");

// Accessing the airport GeoJSON URL
let earthQuakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

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

d3.json(earthQuakes).then(function(data) {
            console.log(data);
            // Creating a GeoJSON layer with the retrieved data.
            L.geoJSON(data).addTo(map);

            // Create a base layer that holds both maps.
            let baseMaps = {
                "Streets": streets,
                "Satellite": satelliteStreets
            };

            let map = L.map("mapid", {
                center: [39.5, -98.5],
                layers: [streets]
            });
            // Then we add our 'graymap' tile layer to the map.
            L.control.layers(baseMaps).addTo(map);