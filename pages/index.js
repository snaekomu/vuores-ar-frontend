import PT from 'prop-types'

import getConfig from 'next/config'
import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd-cjs'
import HTML5Backend from 'react-dnd-html5-backend-cjs'

import Layout from '../layouts/Layout'
import Grid from '../components/Grid'
import CollectionsCell from '../components/CollectionsCell'
import EmptyCollection from '../components/EmptyCollection'
import NewCollection from '../components/NewCollection'
import ActivityIndicator from '../components/ActivityIndicator'

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
  const [status, setStatus] = useState()

  function putTargets (newTargets, oldTargets = targets) {
    const old = oldTargets
    setTargets(newTargets)
    axios.put(
      `${api}/targets`,
      {
        targets: newTargets
      }
    )
      .then(res => {
        setStatus(ActivityIndicator('Saved!', 'text-green-500'))
      })
      .catch(() => {
        setStatus(ActivityIndicator('Connection Error.', 'text-red-500'))
        setTargets(oldTargets)
      })
  }

  function putCollection (newCollections, i, oldCollections = collections) {
    const old = [...oldCollections]
    const newCollection = newCollections[i]
    console.log(newCollection)
    axios.put(
      `${api}/gallery/${newCollection._id}`,
      {
        name: newCollection.name
      }
    )
      .then(res => {
        setStatus(ActivityIndicator('Saved!', 'text-green-500'))
        setCollections(newCollections)
      })
      .catch(() => {
        setStatus(ActivityIndicator('Connection Error.', 'text-red-500'))
        setCollections(old)
      })
  }

  function funcConstructor ({ dataTargets, dataCollections }) {
    return {
      swapTargets (_from, _to) {
        setStatus(ActivityIndicator('Saving...', 'text-black'))
        const newTargets = { ...dataTargets }
        newTargets[_from].gallery = _to
        if (newTargets[_to]) newTargets[_to].gallery = _from
        putTargets(newTargets)
      },
      updateName (name, i) {
        setStatus(ActivityIndicator('Saving...', 'text-black'))
        const newCollections = { ...dataCollections }
        newCollections[i].name = name
        putCollection(newCollections, i)
      }
    }
  }

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
      status={status}
    >
      <DndProvider backend={HTML5Backend}>
        {contents && collections && targets &&
          <Grid
            funcContructor={funcConstructor}
            collections={collections}
            contents={contents}
            targets={targets}
            render={({ dataCollections, dataContents, dataTargets, func }) => {
              const collectionsArray = dataCollections.map((c, i) => {
                const Type = dataContents[c.id] ? CollectionsCell : EmptyCollection
                return (<Type
                  key={i}
                  i={i}
                  id={c.id}
                  contents={dataContents && dataContents[c.id]}
                  name={c.name}
                  target={dataTargets && dataTargets[c.id]}
                  func={func}
                />)
              })
              collectionsArray.push(<NewCollection func={func} />)
              return collectionsArray
            }}
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
