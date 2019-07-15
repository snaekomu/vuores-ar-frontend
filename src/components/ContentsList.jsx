import React from 'react'
import JSONTable from './JSONTable'
import axios from 'axios'

export class ContentsList extends React.Component {
  componentDidMount () {
    axios.get(
      this.props.uri,
      {
        params: this.props.query
      }
    )
  }

  render () {
    return (
      <JSONTable json={this.state.list} />
    )
  }
}
