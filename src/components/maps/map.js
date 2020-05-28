import { 
    Map,
    View
 } from 'ol'
import { 
    Tile
 } from 'ol/layer'
import { 
    OSM
 } from 'ol/source'
import { 
    fromLonLat
 } from 'ol/proj'

export function createUSCRNMap() {
      return new Map({
        target: 'uscrnmap',
        layers: [
          new Tile({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([-98.579, 39.828]),
          zoom: 4
        })
      });
}
