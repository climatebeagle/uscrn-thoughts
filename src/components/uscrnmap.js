import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import { createUSCRNMap } from './maps/map'
import StationInfo from './popup'
import Button from 'react-bootstrap/Button'
//import Button from 'react-bootstrap/Button'
//import Popover from 'react-bootstrap/Popover'
//import Overlay from 'react-bootstrap/Overlay'
class USCRNMap extends React.Component {
  constructor() {
    super()
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  state = {}
  componentDidMount() {
    console.log('Creating map')
    createUSCRNMap(this)
  }

  popupStationInfo(station, pixel) {
    //console.log('MAP:POPUP', station)
    this.state.popup.attachToStation(station, pixel)
  }

  render() {
    const me = this
    return (
      <React.Fragment>
        <div id="uscrn-popup"></div>
        <div id="uscrn-popup-new"></div>
        <div>
          <Button variant="primary" active>
            Alaska
          </Button>
          <Button variant="primary" active>
            Conus
          </Button>
          <Button variant="primary" active>
            Hawaii
          </Button>
        </div>
        <div
          id="uscrnmap"
          style={{
            position: 'relative',
            height: `600px`,
            width: `100%`,
          }}
        >
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/css/ol.css"
            type="text/css"
          ></link>
          <StationInfo uscrn={me} />
        </div>
      </React.Fragment>
    )
  }
}
export default USCRNMap
