
import './global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { Theme } from '@radix-ui/themes';
import { App } from './App.tsx'
import './index.css'
import '@fontsource/roboto'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Theme>
      <NextUIProvider> 
        <App />
    </NextUIProvider>
    </Theme>
  </React.StrictMode>,
)