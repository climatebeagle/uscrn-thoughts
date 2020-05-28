import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { createUSCRNMap } from './maps/map'

class USCRNMap extends React.Component {
  constructor(props){
      super(props);
    console.log("MapCons")
  }
  
  componentDidMount() {
    console.log("LOADING MAP")
       createUSCRNMap()
       console.log("LOADED MAP")
 }

  render() {
    return (
    <div id="uscrnmap"
      style={{
        height: `600px`,
        width: `100%`,
      }}
    >
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/css/ol.css" type="text/css">
    </link>
    </div>
    )
  }
}
export default USCRNMap
