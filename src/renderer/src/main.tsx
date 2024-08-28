import './assets/main.css'
import './assets/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App/App'
import { createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom';
import { SelectedGame } from './SelectedGame';
import { Catalog } from './Catalog';
import { ErrorElement } from './ErrorElement';
import { Settings } from './Settings'; 
import { Downloads } from './Downloads';
import { Library } from './Library'

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
      {
        path: "downloads",
        element: <Downloads />,
      },
      {
        path: "library",
        element: <Library />
      }
    ],
    errorElement: <ErrorElement />
  },
 ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
