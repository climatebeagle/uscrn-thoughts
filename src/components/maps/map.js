//import { Map, View } from 'ol'
//import { Tile } from 'ol/layer'
//import { OSM } from 'ol/source'
//import { fromLonLat } from 'ol/proj'

import { uscrn_stations } from '../data/stations'

function showUSCRN(overlay, map, content, coordinate) {
    var features = map.getFeaturesAtPixel(map.getPixelFromCoordinate(coordinate), {
        hitTolerance: 2
    });
    if (features.length < 1) {
        overlay.setPosition(undefined);
        return;
    }
    var feature = features[0];
    content.innerHTML = hoverHTML(feature);
    overlay.setPosition(coordinate);
}

function hoverHTML(feature) {
  var name = feature.values_.uscrn.name;
  var text = '&nbsp;' + name + '&nbsp;';
  return text;
}

function createPopup(ol, map) {
  var content = document.createElement('div');
  content.style.overflow = "auto";
  content.style.height = "90px";

  var popup = document.createElement('div');
  popup.className = "ol-unselectable"
  popup.style.zindex = "1";
  popup.style.position = "absolute";
  popup.style.background = 'FUCHSIA';
  popup.style.font = "18px Calibri,sans-serif";
  popup.style.color = "white";
 
popup.appendChild(content);

var overlay = new ol.Overlay({
    element: popup,
   // positioning: 'bottom-center',
    offset: [0, -95],
    autoPan: false
});
map.addOverlay(overlay);
map.on('pointermove', function(event){ showUSCRN(overlay, map, content, event.coordinate); });

}

function addStation(ol, olp, olg, station, style) {
    var sf = new ol.Feature({
      geometry: new olg.Point(olp.fromLonLat([station.lon, station.lat])),
      uscrn: station,
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
      var map = new ol.Map({
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
      createPopup(ol, map);
  });
  });
  });
  });
  });
  });
}
