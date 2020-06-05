import React, { useState, useRef } from 'react'
//import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Overlay from 'react-bootstrap/Overlay'

class StationInfo extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.attachToStation = this.attachToStation.bind(this)
    this.getPopover = this.getPopover.bind(this)
    this.props.uscrn.setState({ popup: this })
  }
  state = { target: null, show: false, styles: { x: 0, y: 0 } }

  attachToStation(station, pixel) {
    console.log('ATTACH STATION', station)
    var styles = { position: 'absolute' }
    if (station != null) {
      styles.left = pixel[0]
      styles.top = pixel[1]
    }
    this.setState({
      target: station,
      pixel: pixel,
      styles: styles,
    })
    console.log('COORDS:', pixel)
  }

  getPopover() {
    console.log('STATION-ADDING POP', this.state.show)
    const target = this.state.target

    return (
      <Popover id="uscrn-popover">
        <Popover.Title as="h3">
          {target.values_.uscrn.name.replace(/ /g, '\u00a0')}
        </Popover.Title>
        <Popover.Content>
          <strong>Holy weather station!</strong> Check this info.
        </Popover.Content>
      </Popover>
    )
  }

  render() {
    const target = this.state.target
    //const show = this.state.show
    const pixel = this.state.pixel

    console.log('STATION-INFO-RENDER', this.state.target, pixel)
    if (this.state.target === null) {
      return null
    }
    //console.log('TARGET', document.getElementById(target.values_.uscrn.name))
    //console.log('TARGET-GEO', document.getElementById(target.getGeometry()))
    console.log('T=STYLE', this.state.styles)
    return (
      <React.Fragment>
        <div id="uscrn-popup-station-attach" style={this.state.styles}></div>
        <Overlay
          show="true"
          placement="top"
          container={document.getElementById('uscrn-popup-station-attach')}
          target={document.getElementById('uscrn-popup-station-attach')}
        >
          {this.getPopover()}
        </Overlay>
      </React.Fragment>
    )
    /*
    return (
      <OverlayTrigger
        defaultShow="true"
        placement="top"
        overlay={this.getPopover()}
      >
        <div></div>
      </OverlayTrigger>
    )
    */
    //return this.getPopover()
    /*
    return (
      <Popover
        id="uscrn-popover"
        position="absolute"
        positionLeft={pixel[0]}
        positionTop={pixel[1]}
      >
        <Popover.Title as="h3">{target.values_.uscrn.name}</Popover.Title>
        <Popover.Content>
          <strong>Holy guacamole!</strong> Check this info.
        </Popover.Content>
      </Popover>
    )
    */
  }
}

export default StationInfo
