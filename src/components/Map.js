import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import cbmap from './maps/map.js'
import { rhythm } from '../utils/typography'

class Map extends React.Component {
  render() {
    return (
    <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
    <h2>USCRN Stations</h2>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/build/ol.js"></script>
    <script src={cbmap}/>
    <script type="text/javascript">
      var map = createUSCRNMap();
    </script>
    </div>
    )
  }
}

export default Map
