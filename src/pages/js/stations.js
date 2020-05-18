
function addStation(station, style) {
    var station = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([station.lon, station.lat]))
    });

    station.setStyle(style)
    return station
}

function addStations(stations) {
   var style = new ol.style.Style({
      image: new ol.style.Icon({
         color: 'FUCHSIA',
         src: '../icons/sun-cloud.png'
         })
      });

    features = [];
    for (var i = 0; i < stations.length; i++) {
      var station = stations[i];
      features.push(addStation(station, style))
    }

    var vectorSource = new ol.source.Vector({
         features: features
    });
    var layer = new ol.layer.Vector({
         source: vectorSource
    });

    return layer
}
