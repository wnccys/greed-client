import './assets/main.css'
import './assets/global.css'
<<<<<<< HEAD

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { App } from './App'
//import { Download } from './Download'
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom';
import { SelectedGame } from './SelectedGame';
import { Catalog } from './Catalog';
import { ErrorElement } from './ErrorElement';
import { Settings } from './Settings'
import { Download } from './Download/Download'
 
 const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: () => null,
    children: [
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "selected-game",
        element: <SelectedGame />
      },
      {
        path: "settings",
        element: <Settings />
      }, 
      { path: "download", 
        element: <Download/>


      }
    ],
    errorElement: <ErrorElement />
  },
 ])
>>>>>>> 1c39b7d213f7ced21e12632c7ed1f2da473dfac6

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
