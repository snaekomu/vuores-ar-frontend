import React from 'react'
import * as _ from 'lodash/fp'

export function JSONTable (props) {
  const rows = _.map(r => <tr>{row(r)}</tr>)
  const row = _.mapValues(v => <td>{v}</td>)
  const body = rows(props.json)

  const header = _.map(h => <th>{h}</th>)(Object.keys(props.json[0]))

  return (
    <table>
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  )
}
