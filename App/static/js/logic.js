async function getHello(){
    const dataResponse = await fetch("/data")
    const rentData = await dataResponse.json();
    console.log(rentData)

    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = [];

////////TO CREATE THE MARKERS/// Loop through the Markers (city) array.
    for (let index = 0; index < rentData.length; index++) {
        let rental = rentData[index]
    // For each station, create a marker, and bind a popup with the station's name.
        let zipMarker = L.marker([rental.latitudes, rental.longitudes])
            .bindPopup("<h3>" + rental.city + 
                "<h3> <hr> <h3>" + rental.zipcode +
                "<h3><h3>Population: " + rental.population + 
                "<h3><h3>Median Sale Price: " + rental.medianprice +
                "<h3><h3>Median Monthly Rent Price: " + rental.avgprice +
                "<h3><h3>Price to Rent Ratio: " + rental.ratio +
                "<h3>"
                )
        // Add the marker to the bikeMarkers array.
        markers.push(zipMarker)
    }
    // Create a layer group that's made from the markers (the zips/cities) array
    markersLayer = L.layerGroup(markers)
    markersLayer.addTo(map)

// /////////CREATE HEATMAP OF THE RATIO/// Loop through the RATIO array.
//     const heatArray = [];

//     for (let index = 0; index < rentData.length; index++) {
//         let ratio = rentData[index]
    
//         if (ratio) {
//             heatArray.push([ratio.latitudes, ratio.longitudes]);
//         }
//     }

//     console.log(heatArray);

// ////////////ADDING THE MAPS/////////
//     const heatMap = L.heatLayer(heatArray, {
//         radius: 20,
//         blur: 35
//     }).addTo(map);

//     var markerMap = {
//         "Zipcodes": markersLayer,
//     };

//     // var map = L.map("map", {
//     //     center: [37.09, -95.71],
//     //     zoom: 5
//     // });

//     // Add a tile layer.


//     // L.control.layers(baseMaps, markerMap, {
//     //     collapsed: false
//     // }).addTo(map);

// ///////function for radius sizes for zips
//         //with high/low median rent and median sale price
//     function createFeatures(rentAndSaleCircles) {
//         function pointToLayer(feature, latlng) {
//             return L.circleMarker(latlng, 
//                 {
//                 //////EDIT THIS PART//////
//                     radius:getRadius(feature.properties.mag),
//                     fillColor: getColor(feature.geometry.coordinates[2]),
//                     color: getColor(feature.geometry.coordinates[2])
//                 });
//         }    

//             // for rent price, bigger radius = higher rent price
//             // for sale price, darker color = higher sale price
//             function getColor(rentprice) {
//                 return rentprice > 5000 ? '#6b030f' :
//                 rentprice > 4000 ? '#a60719' :
//                 rentprice > 3000 ? '#BD0026' :
//                 rentprice > 2800 ? '#E31A1C' :
//                 rentprice > 2400 ? '#fc342a' :
//                 rentprice > 2000 ? '#FC4E2A' :
//                 rentprice > 1800 ? '#FD8D3C' :
//                 rentprice > 1500 ? '#FEB24C' :
//                 rentprice > 1000 ? '#FED976' :
//                     2;
//             }

//             function getRadius (saleprice) {
//                 return saleprice > 1044978 ? '#6b030f' :
//                 saleprice > 1000000 ? '#a60719' :
//                 saleprice > 800000  ? '#BD0026' :
//                 saleprice > 700000  ? '#E31A1C' :
//                 saleprice > 600000  ? '#fc342a' :
//                 saleprice > 500000  ? '#FC4E2A' :
//                 saleprice > 400000   ? '#FD8D3C' :
//                 saleprice > 300000   ? '#FEB24C' :
//                 saleprice > 200000   ? '#FED976' :
//                     '#FFEDA0';
//             }
//         var earthquakes = L.geoJSON(rentAndSaleCircles, {
//             pointToLayer: pointToLayer
//         }).addTo(myMap);
//     }

//     //////FINDING THE MEDIAN IN RATIO////////////////
//     ratiorarray = []

//     for (let index = 0; index < rentData.length; index++) {
//         let ratios = rentData[index]

//         if (ratios){
//             ratiorarray.push(ratios.ratio)
//         }
//     }
//     console.log(ratiorarray)
//     function median(ratiorarray) {
//         const sorted = ratiorarray.slice().sort((a, b) => a - b);
//         const middle = Math.floor(sorted.length / 2);
    
//         if (sorted.length % 2 === 0) {
//             return (sorted[middle - 1] + sorted[middle]) / 2;
//         }
    
//         return sorted[middle];
//     }
//     ////THE MEDIAN FOR RATIO/////////////
//     var medianratio = median(ratiorarray)

//     ///////FINDING THE AVERAGE (MEAN) FOR RATIO///////////////
//     const averageratio = ratiorarray.reduce((a, b) => a + b) / ratiorarray.length;
//     console.log(averageratio);
//     var meanratio = averageratio
}
getHello();