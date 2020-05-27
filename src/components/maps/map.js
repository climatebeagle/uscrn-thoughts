import 'ol/ol.css';

export function createUSCRNMap() {
      return new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-98.579, 39.828]),
          zoom: 4
        })
      });
}
