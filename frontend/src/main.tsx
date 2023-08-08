import React from 'react'
import ReactDOM from 'react-dom/client'

import {App} from './ui/App'
import {store} from "./store/store"

ReactDOM.createRoot(document.getElementById('root') as Element)
  .render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
)
