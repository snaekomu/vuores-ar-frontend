/* eslint camelcase: [2, {allow: ["^_"]}] */

import { useState } from 'react'
import PropTypes from 'prop-types'

function Grid (props) {
  if (!props.collections) return null
  if (!Array.isArray(props.collections)) return null

  const [dataCollections, setCollections] = useState(props.collections && props.collections.map(c => ({ id: c._id, name: c.name })))
  const [dataContents, setContents] = useState(props.contents && props.contents.reduce((prev, { gallery, _id, ...curr }) => ({ ...prev, [gallery]: { ...prev[gallery], [_id]: curr } }), {}))
  const [dataTargets, setTargets] = useState(props.targets && props.targets.reduce((prev, curr) => (curr.gallery && { ...prev, [curr.gallery]: curr }), {}))

  const func = {
    deleteCollection: function (_id) {
      setCollections((({ [_id]: id, ...rest }) => ({ ...rest }))())
    },
    deleteTarget: function (_id) {
      setTargets((({ [_id]: id, ...rest }) => ({ ...rest }))())
    },
    editCollection: function (_id, _col) {
      setCollections((({ [_id]: id, ...rest }) => ({ [_id]: { ...id, ..._col }, ...rest }))())
    },
    swapTargets: function (_from, _to) {
      setTargets((({ [_from]: from, [_to]: to, ...rest }) => ({ [_from]: to, [_to]: from, ...rest }))())
    },
    deleteContent: function (gallery, content) {
      setContents((({ [gallery]: { [content]: del, ...conts }, ...rest }) => ({ ...rest, [gallery]: { ...conts } }))(dataContents))
    }
  }

  return (
    <div className='flex flex-wrap'>
      {props.render({ dataCollections, dataContents, dataTargets, func })}
    </div>
  )
}

Grid.propTypes = {
  collections: PropTypes.array,
  contents: PropTypes.array,
  targets: PropTypes.array,
  render: PropTypes.func.isRequired
}

export default Grid
