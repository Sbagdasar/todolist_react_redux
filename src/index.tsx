import React from 'react'

import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import { App } from './app/App'
import reportWebVitals from './reportWebVitals'
import { store } from './state/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

reportWebVitals()
