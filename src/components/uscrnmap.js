import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { createUSCRNMap } from './maps/map'
import { rhythm } from '../utils/typography'

class USCRNMap extends React.Component {
  constructor(props){
      super(props);
    console.log("MapCons")
  }
  
  componentDidMount() {
    console.log("LOADING MAP")
       var map = createUSCRNMap()
       console.log("LOADED MAP")
 }

  render() {
    return (
    <div id="uscrnmap"
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
    </div>
    )
  }
}
export default USCRNMap
