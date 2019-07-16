import React from 'react'
import JSONTable from '../components/JSONTable'
import axios from 'axios'

export default class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      name: 'test'
    }
    this.fetch = this.fetch.bind(this)
  }

  componentDidMount () {
    this.fetch()
  }

  fetch () {
    axios.get(
      'http://localhost:1337/api/v1/gallery',
      {
        params: {
          populate: 'contents'
        }
      }
    ).then(res => {
      console.log(res.data)
      this.setState({
        lists: res.data
      })
      console.log(this.state.json)
    }).catch(e => {
      console.error(e)
    })
  }

  render () {
    const lists = this.state.lists.map(l => {
      return (
        <div>
          <h2>{l.name}</h2>
          <JSONTable
            json={l.contents}
            schema={[
              'enabled',
              'order',
              'type',
              'url',
              'desc',
              'addedBy',
              'updateTime'
            ]}
          />
        </div>
      )
    })

    return (
      <div className='container'>{lists}</div>
    )
  }
}
