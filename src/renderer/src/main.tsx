import './assets/main.css'
import './assets/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
<<<<<<< HEAD
import { Download } from './Download'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Download/>
=======
import { createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom';
import { SelectedGame } from './SelectedGame';
import { Catalog } from './Catalog';
import { ErrorElement } from './ErrorElement';
import { Settings } from './Settings'
 
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
      }
    ],
    errorElement: <ErrorElement />
  },
 ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
>>>>>>> 72bc8730c0248c55c02c3eba7aa9d7017253edda
  </React.StrictMode>
)
