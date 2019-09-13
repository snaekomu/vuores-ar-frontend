import PT from 'prop-types'

import getConfig from 'next/config'
import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd-cjs'
import HTML5Backend from 'react-dnd-html5-backend-cjs'

import Layout from '../layouts/Layout'
import Grid from '../components/Grid'
import CollectionsCell from '../components/CollectionsCell'

import 'sanitize.css'
import '../styles/tailwind.css'
import '../styles/slick.css'
import '../styles/slick-theme.css'

import axios from 'axios'

const { publicRuntimeConfig } = getConfig()
const api = publicRuntimeConfig.apiUri

function Index (props) {
  const [targets, setTargets] = useState(props.targets)
  const [collections, setCollections] = useState(props.collections)
  const [contents, setContents] = useState(props.contents)
  const [loading, setLoading] = useState(null)

  /* function filter (dat) {
    return props.match && props.match.params && props.match.params.name
      ? /^[0-9a-fA-F]{24}$/.test(props.match.params.name)
        ? dat.filter(d => d._id === props.match.params.name)
        : dat.filter(d => d.name === props.match.params.name)
      : dat
  } */

  return (
    <Layout
      header="Header"
    >
      <DndProvider backend={HTML5Backend}>
        {contents && collections && targets &&
          <Grid
            collections={collections}
            contents={contents}
            targets={targets}
            render={({ dataCollections, dataContents, dataTargets }) => (
              dataCollections.map((c, i) => {
                const Type = dataContents[c.id] ? CollectionsCell : CollectionsCell
                return (<Type
                  key={i}
                  i={i}
                  id={c.id}
                  contents={dataContents && dataContents[c.id]}
                  name={c.name}
                  target={dataTargets && dataTargets[c.id]}
                />)
              })
            )}
          />
        }
      </DndProvider>
    </Layout>
  )
}

Index.getInitialProps = async function () {
  const res = await Promise.all([
    axios.get(`${api}/targets`),
    axios.get(`${api}/galleries`),
    axios.get(`${api}/contents/file`)
  ])
  return {
    targets: res[0].data,
    collections: res[1].data,
    contents: res[2].data
  }
}

Index.propTypes = {
  collections: PT.array,
  targets: PT.array,
  contents: PT.array
}

export default Index
