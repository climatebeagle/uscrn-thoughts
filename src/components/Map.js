import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { createUSCRNMap } from './maps/map'
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
    <script type-"text/javascript">
      var map = createUSCRNMap();
    </script>
    </div>
    )
  }
}

export default Map
