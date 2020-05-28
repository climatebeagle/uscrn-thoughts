//import { Map, View } from 'ol'
//import { Tile } from 'ol/layer'
//import { OSM } from 'ol/source'
//import { fromLonLat } from 'ol/proj'

import { uscrn_stations } from '../data/stations'

function showUSCRN(overlay, map, content, coordinate) {
  var features = map.getFeaturesAtPixel(
    map.getPixelFromCoordinate(coordinate),
    {
      hitTolerance: 2,
    }
  )
  if (features.length < 1) {
    overlay.setPosition(undefined)
    return
  }
  var feature = features[0]
  content.innerHTML = hoverHTML(feature)
  overlay.setPosition(coordinate)
}

function hoverHTML(feature) {
  var name = feature.values_.uscrn.name
  var text = '&nbsp;' + name + '&nbsp;'
  return '<pre>' + text + '</pre>'
}

function createPopup(ol, map) {
  var content = document.createElement('div')
  content.style.overflow = 'auto'
  content.style.height = '90px'

  var popup = document.createElement('div')
  popup.className = 'ol-unselectable'
  popup.style.zindex = '1'
  popup.style.position = 'absolute'
  popup.style.background = 'FUCHSIA'
  popup.style.font = '18px Calibri,sans-serif'
  popup.style.color = 'white'

  popup.appendChild(content)

  var overlay = new ol.Overlay({
    element: popup,
    // positioning: 'bottom-center',
    offset: [0, -95],
    autoPan: false,
  })
  map.addOverlay(overlay)
  map.on('pointermove', function (event) {
    showUSCRN(overlay, map, content, event.coordinate)
  })
}

function addStation(olm, station, style) {
  var sf = new olm.ol.Feature({
    geometry: new olm.olg.Point(olm.olp.fromLonLat([station.lon, station.lat])),
    uscrn: station,
  })

  sf.setStyle(style)
  return sf
}

function addStations(olm, stations) {
  var style = new olm.olstyle.Style({
    image: new olm.olstyle.Icon({
      color: 'FUCHSIA',
      src: '/icons/sun-cloud.png',
    }),
  })

  var features = []
  for (var i = 0; i < stations.length; i++) {
    var station = stations[i]
    features.push(addStation(olm, station, style))
  }

  var vectorSource = new olm.ols.Vector({
    features: features,
  })
  var layer = new olm.oll.Vector({
    source: vectorSource,
  })

  return layer
}

export function createUSCRNMap() {
  import('ol').then((ol) => {
    import('ol/layer').then((oll) => {
      import('ol/source').then((ols) => {
        import('ol/proj').then((olp) => {
          import('ol/style').then((olstyle) => {
            import('ol/geom').then((olg) => {
              var olm = {
                ol: ol,
                oll: oll,
                ols: ols,
                olp: olp,
                olstyle: olstyle,
                olg: olg,
              }
              var osmLayer = new oll.Tile({
                source: new ols.OSM(),
              })
              var stations = uscrn_stations()
              var stationsLayer = addStations(olm, stations)
              var map = new ol.Map({
                target: 'uscrnmap',
                layers: [osmLayer, stationsLayer],
                view: new ol.View({
                  center: olp.fromLonLat([-98.579, 39.828]),
                  zoom: 4,
                }),
              })
              createPopup(ol, map)
            })
          })
        })
      })
    })
  })
}
