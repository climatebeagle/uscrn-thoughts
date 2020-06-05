import { uscrn_stations } from '../data/stations'

function createPopup(olm, map, uscrn) {
  map.on('pointermove', function (event) {
    var seenFeature = false
    map.forEachFeatureAtPixel(
      event.pixel,
      function (feature) {
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
  return sf
}

function addStations(olm, stations) {
  var style = new olm.olstyle.Style({
    image: new olm.olstyle.RegularShape({
      fill: new olm.olstyle.Fill({ color: 'blue' }),
      stroke: new olm.olstyle.Stroke({ color: 'blue', width: 2 }),
      points: 4,
      radius: 8,
      radius2: 0,
      angle: 0,
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

export function centreMap(map, area) {
  var lon = -98.579
  var lat = 39.828
  var zoom = 4
  if (area === 'ak') {
    lon = -152.47
    lat = 64.731667
  } else if (area === 'hi') {
    lon = -156.73166667
    lat = 20.95027778
    zoom = 7
  }
  import('ol/proj').then((olp) => {
    map.getView().setCenter(olp.fromLonLat([lon, lat]))
    map.getView().setZoom(zoom)
  })
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
                  uscrn.setState({ map: map })
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
