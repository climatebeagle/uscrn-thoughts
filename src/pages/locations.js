import React from 'react'
import get from 'lodash/get'
//import Helmet from 'react-helmet'

import Layout from "../components/layout"
import USCRNMap from '../components/uscrnmap'

// class Locations extends React.Component {
const Locations = ({ data, location }) => {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    return (
    <Layout location={location} title={siteTitle}>
      <div>
        <USCRNMap />
      </div>
    </Layout>
    )
}

export default Locations
