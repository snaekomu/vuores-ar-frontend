import React from 'react'
import axios from 'axios'

export class HTTPButton extends React.Component {
  constructor (params) {
    super(params)
    this.state.value = params.initialValue
  }
  send () {
    axios({
      method: this.props.method,
      url: this.props.uri || this.props.url,
      params: this.props.query,
      responseType: 'text'
    }).then(res => {
      this.setState({
        value: res.data
      })
    }).catch(err => {
      this.setState({
        value: err.response ? err.response.data : err.request ? err.request.data : err.message
      })
    })
  }

  render () {
    return (
      <button onClick={this.send}>
        {this.state.value}
      </button>
    )
  }
}
