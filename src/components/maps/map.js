//import { Map, View } from 'ol'
//import { Tile } from 'ol/layer'
//import { OSM } from 'ol/source'
//import { fromLonLat } from 'ol/proj'

import { uscrn_stations } from '../data/stations'

function addStation(ol, olp, olg, station, style) {
    var sf = new ol.Feature({
      geometry: new olg.Point(olp.fromLonLat([station.lon, station.lat]))
    });

    sf.setStyle(style)
    return sf
}

function addStations(ol, oll, ols, olp, olstyle, olg, stations) {
   var style = new olstyle.Style({
      image: new olstyle.Icon({
         color: 'FUCHSIA',
         src: '/icons/sun-cloud.png'
         })
      });

    var features = [];
    for (var i = 0; i < stations.length; i++) {
      var station = stations[i];
      features.push(addStation(ol, olp, olg, station, style))
    }

    var vectorSource = new ols.Vector({
         features: features
    });
    var layer = new oll.Vector({
         source: vectorSource
    });

    return layer
}

export function createUSCRNMap() {
    import("ol").then((ol) => {
    import("ol/layer").then((oll) => {
    import("ol/source").then((ols) => {
    import("ol/proj").then((olp) => {
    import("ol/style").then((olstyle) => {
    import("ol/geom").then((olg) => {
      new ol.Map({
        target: 'uscrnmap',
        layers: [
          new oll.Tile({
            source: new ols.OSM()
          }),
          addStations(ol, oll, ols, olp, olstyle, olg, uscrn_stations())
        ],
        view: new ol.View({
          center: olp.fromLonLat([-98.579, 39.828]),
          zoom: 4
        })
      });
  });
  });
  });
  });
  });
  });
}
