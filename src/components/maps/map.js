//import { Map, View } from 'ol'
//import { Tile } from 'ol/layer'
//import { OSM } from 'ol/source'
//import { fromLonLat } from 'ol/proj'

export function createUSCRNMap() {
    import("ol").then((ol) => {
    import("ol/layer").then((oll) => {
    import("ol/source").then((ols) => {
    import("ol/proj").then((olp) => {
      new ol.Map({
        target: 'uscrnmap',
        layers: [
          new oll.Tile({
            source: new ols.OSM()
          })
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
}
