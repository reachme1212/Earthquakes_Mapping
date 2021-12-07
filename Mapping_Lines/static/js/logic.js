// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.615223, -122.389977], 5);

// Coordinates for each point to be used in the line.
let line = [
    [37.615223, -122.389977],
    [40.641766, -73.780968],
    [30.18999924, -97.668663992],
    [43.67771760000001, -79.62481969999999],
    [33.448376, -112.074036]
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "blue ",
    weight: 4,
    dashArray: '20, 20',
    fillOpacity: "0.75"
}).addTo(map);

// Get data from cities.js// Loop through the cities array and create one marker for each city.
// let cityData = cities;

// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//             radius: city.population / 100000,
//             color: "orange",
//             fillColor: "#ffffa1",
//             fillOpacity: "0.50"
//         })
//         .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//         .addTo(map);
// });


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);