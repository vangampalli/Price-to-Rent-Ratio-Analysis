// async function getHello() {
//     const url = 'http://127.0.0.1:5000/api/v1.0/data'
//     fetch(url)
//     .then(response => response.json())  
//     .then(json => {
//         console.log(json);
//         document.getElementById("demo").innerHTML = JSON.stringify(json)
//     createFeatures(data);
//     })
// }
// getHello();
// //https://stackoverflow.com/questions/57891275/simple-fetch-get-request-in-javascript-to-a-flask-server

// function createFeatures(data) {
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     }
//     function pointToLayer(feature, latlng) {
//         return L.circleMarker(latlng, 
//             {
//                 radius:getRadius(feature.properties.mag),
//                 fillColor: getColor(feature.geometry.coordinates[2]),
//                 color: getColor(feature.geometry.coordinates[2])
//             });
//     }
// }



// ;

async function getHello(){
    const dataResponse = await fetch("/data")
    const rentData = await dataResponse.json();
    console.log(rentData)
}
getHello();