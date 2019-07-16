import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import List from './views/List'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './skeleton.css'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/list' component={List} />
    </Switch>
  </Router>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
