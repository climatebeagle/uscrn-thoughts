import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import USCRNMap from '../components/uscrnmap'

class Locations extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    return (
      <div>
        <Helmet title={siteTitle} />
        <USCRNMap />
      </div>
    )
  }
}

export default Locations
