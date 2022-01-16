async function getHello() {
    const url = 'http://localhost:8989/hello'
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
        document.getElementById("demo").innerHTML = JSON.stringify(json)
    createFeatures(data);
    })
}
//https://stackoverflow.com/questions/57891275/simple-fetch-get-request-in-javascript-to-a-flask-server

function createFeatures(data) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
    function pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, 
            {
                radius:getRadius(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: getColor(feature.geometry.coordinates[2])
            });
    }
}



;