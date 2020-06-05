//import { Map, View } from 'ol'
//import { Tile } from 'ol/layer'
//import { OSM } from 'ol/source'
//import { fromLonLat } from 'ol/proj'

import { uscrn_stations } from '../data/stations'

var puVisible = false

function showUSCRN(overlay, map, uscrn, content, coordinate) {
  var features = map.getFeaturesAtPixel(
    map.getPixelFromCoordinate(coordinate),
    {
      hitTolerance: 2,
    }
  )
  if (features.length < 1) {
    //overlay.setPosition(undefined)
    uscrn.popupStationInfo(null, coordinate)
    return
  }
  var feature = features[0]
  //content.innerHTML = hoverHTML(feature)
  //overlayç

  //var rover = document.getElementById('uscrn-overlay')
  //rover.attachToStation(feature)
  uscrn.popupStationInfo(feature, coordinate)
}

function selectHover(ol, map) {
  var selectPointerMove = new ol.olinteraction.Select({
    condition: ol.olevents.conditionpointerMove,
  })
}

function hoverHTML(feature) {
  var name = feature.values_.uscrn.name
  var text = '&nbsp;' + name + '&nbsp;'
  return '<pre>' + text + '</pre>'
}

function createPopup(olm, map, uscrn) {
  selectHover(olm, map)
  var content = document.createElement('div')
  content.style.overflow = 'auto'
  content.style.height = '90px'

  var popup = document.getElementById('uscrn-popup')
  /*
  var popup = document.createElement('div')
  popup.className = 'ol-unselectable'
  popup.style.zindex = '1'
  popup.style.position = 'absolute'
  popup.style.background = 'FUCHSIA'
  popup.style.font = '18px Calibri,sans-serif'
  popup.style.color = 'white'
  */

  popup.appendChild(content)

  var overlay = new olm.ol.Overlay({
    element: popup,
    // positioning: 'bottom-center',
    offset: [0, -95],
    autoPan: false,
  })
  //map.addOverlay(overlay)
  map.on('pointermove', function (event) {
    console.log('MOVE_FEATURES', event)
    var seenFeature = false
    //showUSCRN(overlay, map, uscrn, content, event.coordinate)
    map.forEachFeatureAtPixel(
      event.pixel,
      function (feature) {
        //selected = f
        // f.setStyle(highlightStyle);
        //console.log('   FEATURE:', feature)
        seenFeature = true
        uscrn.popupStationInfo(feature, event.pixel)
        return true
      },
      { hitTolerance: 2 }
    )
    if (!seenFeature) {
      uscrn.popupStationInfo(null, null)
    }
  })
}

function addStation(olm, station, style) {
  var pt = new olm.olg.Point(olm.olp.fromLonLat([station.lon, station.lat]))
  var sf = new olm.ol.Feature({
    geometry: pt,
    uscrn: station,
  })

  sf.setId(station.name)
  sf.setStyle(style)
  console.log('CREATE:STAT', sf)
  console.log('CREATE:STAT:GOE', sf.geometry)
  console.log('CREATE:STAT:GOE-2', sf.getGeometry())
  return sf
}

function addStations(olm, stations) {
  /*
  var style = new olm.olstyle.Style({
    image: new olm.olstyle.Icon({
      color: 'FUCHSIA',
      src: '/icons/sun-cloud.png',
    }),
  })
  */

  var style = new olm.olstyle.Style({
    image: new olm.olstyle.RegularShape({
      fill: new olm.olstyle.Fill({ color: 'red' }),
      stroke: new olm.olstyle.Stroke({ color: 'red', width: 2 }),
      points: 4,
      radius: 10,
      radius2: 0,
      angle: Math.PI / 4,
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

export function createUSCRNMap(uscrn) {
  import('ol').then((ol) => {
    import('ol/layer').then((oll) => {
      import('ol/source').then((ols) => {
        import('ol/proj').then((olp) => {
          import('ol/style').then((olstyle) => {
            import('ol/geom').then((olg) => {
              import('ol/events').then((olevents) => {
                import('ol/interaction').then((olinteraction) => {
                  var olm = {
                    ol: ol,
                    oll: oll,
                    ols: ols,
                    olp: olp,
                    olstyle: olstyle,
                    olg: olg,
                    olevents: olevents,
                    olinteraction: olinteraction,
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
                  console.log('USCRN', uscrn)
                  console.log('C MAP', map)
                  console.log('USCRN-Map-1', uscrn.state.map)
                  uscrn.setState({ map: map })
                  console.log('USCRN-Map-2', uscrn.state.map)
                  createPopup(olm, map, uscrn)
                })
              })
            })
          })
        })
      })
    })
  })
}
