async function getHello(){
    const dataResponse = await fetch("/data")
    const rentData = await dataResponse.json();
    console.log(rentData)

    const markers = [];

////////TO CREATE THE MARKERS/// Loop through the Markers (city) array.
    for (let index = 0; index < rentData.length; index++) {
        let markers = rentData[index]
    // For each station, create a marker, and bind a popup with the station's name.
        let zipMarker = L.marker([rentData.lat, rentData.lon])
        .bindPopup("<h3>" + rentData.city + 
        "<h3><h3>Population: " + rentData.population + 
        "<h3><h3>Median Sale Price: " + rentData.medianprice +
        "<h3><h3>Median Monthly Rent Price: " + rentData.avgprice +
        "<h3><h3>Price to Rent Ratio: " + rentData.ratio +
        "<h3>")
    // Add the marker to the bikeMarkers array.
    markers.push(markers)
    }
    // Create a layer group that's made from the markers (the zips/cities) array
    markersLayer = L.layerGroup(markers)

/////////CREATE HEATMAP OF THE RATIO/// Loop through the RATIO array.
    var heatArray = [];

    for (let index = 0; index < rentData.length; index++) {
        let ratio = rentData[index]
    
        if (ratio) {
            heatArray.push([ratio.coordinates[1], ratio.coordinates[0]]);
        }
    }

////////////ADDING THE MAPS/////////
    var heatMap = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(map);

    var markerMap = {
        "Zipcodes": markersLayer,
    };

    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5
    });

    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.control.layers(baseMaps, markerMap, {
        collapsed: false
    }).addTo(map);

/////////function for radius sizes for zips
        //with high/low median rent and median sale price
    function createFeatures(rentAndSaleCircles) {
        function pointToLayer(feature, latlng) {
            return L.circleMarker(latlng, 
                {
                //////EDIT THIS PART//////
                    radius:getRadius(feature.properties.mag),
                    fillColor: getColor(feature.geometry.coordinates[2]),
                    color: getColor(feature.geometry.coordinates[2])
                });
        }    

            // for rent price, bigger radius = higher rent price
            // for sale price, darker color = higher sale price
            function getColor(rentprice) {
                return rentprice > 5000 ? '#6b030f' :
                rentprice > 4000 ? '#a60719' :
                rentprice > 3000 ? '#BD0026' :
                rentprice > 2800 ? '#E31A1C' :
                rentprice > 2400 ? '#fc342a' :
                rentprice > 2000 ? '#FC4E2A' :
                rentprice > 1800 ? '#FD8D3C' :
                rentprice > 1500 ? '#FEB24C' :
                rentprice > 1000 ? '#FED976' :
                    2;
            }

            function getRadius (saleprice) {
                return saleprice > 1044978 ? '#6b030f' :
                saleprice > 1000000 ? '#a60719' :
                saleprice > 800000  ? '#BD0026' :
                saleprice > 700000  ? '#E31A1C' :
                saleprice > 600000  ? '#fc342a' :
                saleprice > 500000  ? '#FC4E2A' :
                saleprice > 400000   ? '#FD8D3C' :
                saleprice > 300000   ? '#FEB24C' :
                saleprice > 200000   ? '#FED976' :
                    '#FFEDA0';
            }
        var earthquakes = L.geoJSON(rentAndSaleCircles, {
            pointToLayer: pointToLayer
        }).addTo(myMap);
    }
}
getHello();