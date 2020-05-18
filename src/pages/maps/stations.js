import React from 'react'
const StationMap = () => (
  <div>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/css/ol.css" type="text/css">
    <style>
      .map {
        height: 600px;
        width: 100%;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/build/ol.js"></script>
    <script src="../data/stations.js"></script>
    <script src="../js/stations.js"></script>
    <title>USCRN Stations</title>
  </head>
  <body>
    <h2>USCRN Stations</h2>
    <div id="map" class="map"></div>
    <script type="text/javascript">
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          addStations(uscrn_stations())
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([-98.579, 39.828]),
          zoom: 4
        })
      });
    </script>
  </body>
  </div>
)

export default StationMap
