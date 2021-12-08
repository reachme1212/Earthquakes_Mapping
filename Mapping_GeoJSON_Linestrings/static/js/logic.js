// Add console.log to check to see if our code is working.
console.log("working");

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/reachme1212/Earthquakes_Mapping/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/static/js/torontoRoutes.json";


// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            console.log(feature);

            layer.bindPopup("<h3> Airline: " +

                feature.properties.airline + "</h3> <hr> <h3> Destination :" + feature.properties.dst + "</h3>  ");
        }

    }).addTo(map);
});

// We create the tile layer that will be the background of our map.
let layer1 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/navigation-night-v1',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let layer2 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/navigation-day-v1',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Night: layer1,
    Day: layer2
};

let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [layer1]
});
// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseMaps).addTo(map);