import './assets/main.css'
import './assets/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Download } from './Download'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Download/>
  </React.StrictMode>
)
