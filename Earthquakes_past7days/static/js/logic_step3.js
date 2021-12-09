// Add console.log to check to see if our code is working.
console.log("working");

let earthQuakesdata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    // tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/satellite-streets-v11',
    // tileSize: 512,
    maxZoom: 18,
    // zoomOffset: -1,
    accessToken: API_KEY
});

let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 3,
    layers: [streets]
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

//group layers
let earthquakes = new L.layerGroup();
let overlays = {
    Earthquakes: earthquakes
};


// Then we add our 'graymap' tile layer to the map.
L.control.layers(baseMaps, overlays).addTo(map);

d3.json(earthQuakesdata).then(function(data) {
    console.log(data);

    //styleInfo decides all styling information for the marker//getColor decides marker color// getRadius decides marker size

    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }

    };

    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }

    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {

        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Magnitude: " +

                feature.properties.mag + "</h3> <hr> <h3> Location :" + feature.properties.place + "</h3>  ");
        }
    }).addTo(earthquakes);
    earthquakes.addTo(map);

    //add legend 
    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");

        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];
        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }
        return div;
    };
    legend.addTo(map);
});