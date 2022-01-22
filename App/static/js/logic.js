async function getHello(){
    const dataResponse = await fetch("/data")
    const rentData = await dataResponse.json();
    console.log(rentData)

<<<<<<< HEAD
    const markers = [];
    const markers2 = [];
=======
    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = [];
>>>>>>> 48b500627e7ff7217f9d2d34c8fa9f95071bae0e

////////TO CREATE THE MARKERS/// Loop through the Markers (city) array.
    for (let index = 0; index < rentData.length; index++) {
        let rental = rentData[index]
    // For each station, create a marker, and bind a popup with the station's name.
        let zipMarker = L.marker([rental.latitudes, rental.longitudes])
<<<<<<< HEAD
        .bindPopup("<h4>" + rental.city + 
            "<h6> <hr> <h6>Zip Code: " + rental.zipcode +
            "<h6><h6>Population: " + rental.population + 
            "<h6><h6>Median Sale Price: " + rental.medianprice +
            "<h5><h6>Median Monthly Rent Price: " + rental.avgprice +
            "<h6><h6>Price to Rent Ratio: " + rental.ratio +
            "<h4>"
            )
    // Add the marker to the bikeMarkers array.
    markers.push(zipMarker)
    }
    // Create a layer group that's made from the markers (the zips/cities) array
    markersLayer = L.layerGroup(markers)
    

/////////CREATE HEATMAP OF THE RATIO/// Loop through the RATIO array.
    const heatArray = [];

    for (let index = 0; index < rentData.length; index++) {
        let ratio = rentData[index]

        heatArray.push([ratio.latitudes, ratio.longitudes]);
    }

    ////////////ADDING THE MAPS/////////
    const heatMap = L.heatLayer(heatArray, {
        radius: 35,
        valueField: rentData.ratio,
        // blur: 5,
        maxOpacity: 2,
        scaleRadius: true,
        // max: 20.0,
    })

    console.log(rentData.ratio)

    var markerMap = {
        "Zipcodes": markersLayer
    };

//////FINDING THE MEDIAN FOR RATIO////////////////
    ratiorarray = []

    for (let index = 0; index < rentData.length; index++) {
        let ratios = rentData[index]

        if (ratios){
            ratiorarray.push(ratios.ratio)
        }
    }
    // console.log(ratiorarray)
    function median(ratiorarray) {
        const sorted = ratiorarray.slice().sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
    
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }
    
        return sorted[middle];
    }
////THE MEDIAN FOR RATIO/////////////
    var medianratio = median(ratiorarray)

///////FINDING THE AVERAGE (MEAN) FOR RATIO///////////////
    const averageratio = ratiorarray.reduce((a, b) => a + b) / ratiorarray.length;
    console.log(averageratio);
    var meanratio = averageratio

///////FIND THE BOTTOM and TOP 5 CITIES//////////////
    ratioZipCityArray = []
    for (let index = 0; index < rentData.length; index++) {
        let ratios = rentData[index]

        if (ratios){
            ratioZipCityArray.push("Ratio: " + ratios.ratio +
                                " Zip Code: " + ratios.zipcode +
                                " City: " + ratios.city)
        }
    }

    ///TOP 5 CITIES/////////////
    let ratioasc = ratioZipCityArray.sort((a, b) => b[0] - a[0])
    let ratioTOPfive = ratioasc.slice(0, 5);
    console.log(ratioTOPfive);
    
    ///BOTTOM 5 CITIES///////////////////
    ratioasc.reverse()
    let ratioBOTTOMfive = ratioasc.slice(0, 5);
    console.log(ratioBOTTOMfive);

////////GETTING MEAN, MEDIAN, TOP/BOTTOM 5 IN/////////
    var panel = document.getElementById('price_info1')
    for(var i = 0; i < ratioTOPfive.length; i++) {
        var id_names = ratioTOPfive[i];
        var el = document.createElement("h6");
        el.textContent = id_names;
        el.value = id_names;
        el.className = "list-group-item"
        panel.appendChild(el);
    }

    var panel = document.getElementById('price_info2')
    for(var i = 0; i < ratioBOTTOMfive.length; i++) {
        var id_names = ratioBOTTOMfive[i];
        var el = document.createElement("h6");
        el.textContent = id_names;
        el.value = id_names;
        el.className = "list-group-item"
        panel.appendChild(el);
    }

///////////CIRCLE MARKER LAYER FOR RATIOS//////
    ///DARKER CIRCLE = HIGHER RATIO, LIGHTER = LOWER RATIO////

    ratioAndLongLat = []
    for (let index = 0; index < rentData.length; index++) {
        let rats = rentData[index]
        if (rats){
            ratioZipCityArray.push([rats.ratio, rats.latitudes, rats.longitudes])
        }
    let circleRatios = L.circleMarker([rats.latitudes, rats.longitudes],
                {
                    radius: 10,
                    fillColor: getColor(rats.ratio),
                    color: getColor(rats.ratio) 
                }   
            )
            function getColor (d) {
                return d > 30 ? '#800026' :
                    d > 25  ? '#EC7063' :
                    d > 20  ? '#A569BD' :
                    d > 15  ? '#5DADE2' :
                    d > 10   ? '#76D7C4' :
                    d > 5   ? '#82E0AA' :
                    d > 2   ? '#5D6D7E' :
                    '#FFEDA0';
            }
        
        // Add the marker to the bikeMarkers array.
        markers2.push(circleRatios)
    
        // Create a layer group that's made from the markers (the zips/cities) array
        circleLayer = L.layerGroup(markers2)
        
    }   

////////LEGEND FOR THE CIRCLES////

var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    grades = [0, 2, 5, 10, 15, 20, 25, 30]
    var labels = [];
    var colors= [
        '#FFEDA0','#5D6D7E','#82E0AA', '#76D7C4', '#5DADE2', '#A569BD', '#EC7063', '#800026'
    ];

    var legendInfo = "<h5>Price to Rent <br> Ratio</h5> <hr> <h6>Lower Ratio = <br> Better Purchase</h6>" 
        ;

    div.innerHTML=legendInfo;

    for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            grades[i] + (grades[i + 1] ? ""  + "<br>" : "");
        }
    return div;
};

var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object.
var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
};

var overlayMaps = {
    "Zip Codes": markersLayer,
    "Heatmap": heatMap,
    "Ratios": circleLayer
};

var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
});

markersLayer.addTo(map);
heatMap.addTo(map);
legend.addTo(map);



L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

}

=======
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
>>>>>>> 48b500627e7ff7217f9d2d34c8fa9f95071bae0e
getHello();