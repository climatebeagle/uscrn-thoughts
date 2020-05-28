import React from 'react'
//import get from 'lodash/get'
//import Helmet from 'react-helmet'

//import Layout from '../components/layout'
//import SEO from '../components/seo'
import USCRNMap from '../components/uscrnmap'

// class Locations extends React.Component {
const Locations = ({ data, location }) => {
  return (
    <body>
      <h2>USCRN Stations Map</h2>
      <USCRNMap />
    </body>
  )
}

export default Locations
