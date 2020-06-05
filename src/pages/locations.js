import React from 'react'
//import get from 'lodash/get'
//import Helmet from 'react-helmet'

//import Layout from '../components/layout'
//import SEO from '../components/seo'
//import Popup from '../components/popup'
import USCRNMap from '../components/uscrnmap'
import 'bootstrap/dist/css/bootstrap.min.css'
// class Locations extends React.Component {
const Locations = ({ data, location }) => {
  return (
    <React.Fragment>
      <h2>USCRN Stations Map</h2>
      <USCRNMap />
    </React.Fragment>
  )
}

export default Locations
