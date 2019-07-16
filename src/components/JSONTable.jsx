import React from 'react'
// import * as _ from 'lodash/fp'

export default class JSONTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      json: []
    }
  }

  render () {
    if (!this.props.json) return null
    const body = this.props.json.map(r => {
      const a = this.props.schema.map(key => {
        return <td>{r[key]}</td>
      })
      return <tr>{a}</tr>
    })
    const header = this.props.schema.map(s => { return <th>{s}</th> })
    return (
      <table>
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    )
  }
}
