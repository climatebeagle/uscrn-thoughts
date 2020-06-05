import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import { createUSCRNMap, centreMap } from './maps/map'
import StationInfo from './popup'
import Button from 'react-bootstrap/Button'
class USCRNMap extends React.Component {
  constructor() {
    super()
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  state = { map: null }
  componentDidMount() {
    createUSCRNMap(this)
  }

  centre(event, uscrn, area) {
    if (uscrn.state.map == null) {
      return
    }
    centreMap(uscrn.state.map, area)
  }

  popupStationInfo(station, pixel) {
    this.state.popup.attachToStation(station, pixel)
  }

  render() {
    const me = this
    return (
      <React.Fragment>
        <div id="uscrn-popup"></div>
        <div id="uscrn-popup-new"></div>
        <div>
          <Button
            variant="primary"
            onClick={(event) => this.centre(event, this, 'ak')}
          >
            Alaska
          </Button>
          <Button
            variant="primary"
            onClick={(event) => this.centre(event, this, 'conus')}
          >
            Conus
          </Button>
          <Button
            variant="primary"
            onClick={(event) => this.centre(event, this, 'hi')}
          >
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
