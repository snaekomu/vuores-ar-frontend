/* eslint camelcase: [2, {allow: ["^_"]}] */

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import axios from 'axios'

const { publicRuntimeConfig } = getConfig()
const api = publicRuntimeConfig.apiUri

function Grid (props) {
  if (!props.collections) return null
  if (!Array.isArray(props.collections)) return null

  const dataCollections = props.collections && props.collections.map(c => ({ id: c._id, name: c.name }))
  const dataContents = props.contents && props.contents.reduce((prev, { gallery, _id, ...curr }) => ({ ...prev, [gallery]: { ...prev[gallery], [_id]: { ...curr } } }), {})
  const dataTargets = props.targets && props.targets.reduce((prev, curr) => (curr.gallery && { ...prev, [curr.gallery]: { ...curr } }), {})

  const func = props.funcContructor({ dataCollections, dataContents, dataTargets })

  // const render = useMemo(() => props.render({ dataCollections, dataContents, dataTargets, func }), [dataTargets, dataContents, dataCollections])

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
  render: PropTypes.func.isRequired,
  setStatus: PropTypes.func,
  funcContructor: PropTypes.func
}

export default Grid

/* swapTargets: function (_from, _to) {
  props.func.setStatus(ActivityIndicator('Loading...', 'text-black'))
  const oldTargets = [...props.targets]
  const newTargets = { ...dataTargets }
  newTargets[_from].gallery = _to
  if (newTargets[_to]) newTargets[_to].gallery = _from
  const arrayTargets = Object.keys(newTargets).map(k => newTargets[k])
} */
