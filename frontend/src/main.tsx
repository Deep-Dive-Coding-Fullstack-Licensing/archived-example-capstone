import React from 'react'
import ReactDOM from 'react-dom/client'
// @ts-ignore
import {App} from './ui/App'
// @ts-ignore
import store from "./store/store"

ReactDOM.createRoot(document.getElementById('root') as Element)
  .render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
)
