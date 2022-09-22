import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'

const root = ReactDOM.createRoot(document.querySelector('#app'));

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
)
