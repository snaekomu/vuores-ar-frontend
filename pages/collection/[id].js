import { useState } from 'react'

import Layout from '../../layouts/Layout'
import Grid from '../../components/Grid'

import 'sanitize.css'
import '../../styles/tailwind.css'

function CollectionPage (props) {
  const [targets, setTargets] = useState(null)
  const [collections, setCollections] = useState(null)
  const [contents, setContents] = useState(null)
  const [loading, setLoading] = useState(null)

  /* function fetch () {
    const res = Promise.all([
      axios.get(`${process.env.API_URI}/targets`),
      axios.get(`${process.env.API_URI}/galleries`),
      axios.get(`${process.env.API_URI}/contents`)
    ])
      .then(([tar, col, con]) => {
        setTargets(tar.data)
        setContents(con.data)
        setCollections(col.data)
        console.log(contents)
      })
      .catch(err => {
        console.error(err)
      })
  } */

  /* function filter (dat) {
    return props.match && props.match.params && props.match.params.name
      ? /^[0-9a-fA-F]{24}$/.test(props.match.params.name)
        ? dat.filter(d => d._id === props.match.params.name)
        : dat.filter(d => d.name === props.match.params.name)
      : dat
  } */

  // useEffect(fetch, [])

  return (
    <Layout
      header="haha"
    >
      <Grid
        collections={collections}
        contents={contents}
        targets={targets}
        render={({ dataCollections, dataContents, dataTargets, func }) => {
          const collectionsArray = dataCollections.map((c, i) => {
            const Type = dataContents[c.id] ? CollectionsCell : CollectionsCell
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
          return collectionsArray
        }}
      />
    </Layout>
  )
}

export default CollectionPage
