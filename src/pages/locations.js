import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Map from '../components/Map'

import { rhythm } from '../utils/typography'

class Locations extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    return (
      <div>
        <Helmet title={siteTitle} />
        <Map />
      </div>
    )
  }
}

export default Locations
