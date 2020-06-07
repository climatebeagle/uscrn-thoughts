import React from 'react'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'

class StationInfo extends React.Component {
  constructor(props) {
    super(props)
    this.attachToStation = this.attachToStation.bind(this)
    this.getPopover = this.getPopover.bind(this)
    this.props.uscrn.setState({ popup: this })
  }
  state = { target: null, show: false, styles: { x: 0, y: 0 } }

  attachToStation(station, pixel) {
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
  }

  getPopover(target) {
    return (
      <Popover id="uscrn-popover">
        <Popover.Title as="h3">
          {target.values_.uscrn.name.replace(/ /g, '\u00a0')}
        </Popover.Title>
        <Popover.Content>
          {target.values_.uscrn.description}
          <br></br>
          <strong>Id</strong> {target.values_.uscrn.id}
          <br></br>
          <strong>Elevation(ft)</strong> {target.values_.uscrn.elevation}
        </Popover.Content>
      </Popover>
    )
  }

  render() {
    const target = this.state.target
    if (this.state.target === null) {
      return null
    }
    return (
      <React.Fragment>
        <div id="uscrn-popup-station-attach" style={this.state.styles}></div>
        <Overlay
          show="true"
          placement="top"
          container={document.getElementById('uscrn-popup-station-attach')}
          target={document.getElementById('uscrn-popup-station-attach')}
        >
          {this.getPopover(target)}
        </Overlay>
      </React.Fragment>
    )
  }
}

export default StationInfo
