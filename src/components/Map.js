import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { createUSCRNMap } from './maps/map'
import { rhythm } from '../utils/typography'

class Map extends React.Component {
  constructor(props){
      super(props);
      this.drawMap=this.drawMap.bind(this);
    console.log("HELLO1")
  }
  
  componentDidMount() {
    console.log("LOADING MAP")
       var map = createUSCRNMap()
       console.log("LOADED MAP")
 }

  render() {
    return (
    <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
    </div>
    )
  }
}

export default Map
