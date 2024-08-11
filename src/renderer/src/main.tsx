import './Assets/main.css'
import './Assets/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App/App'
import { createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom';
import { SelectedGame } from './SelectedGame';
import { Catalog } from './Catalog';
import { ErrorElement } from './ErrorElement';
<<<<<<< HEAD
import { Settings } from './Settings'
import { Download } from './Download/Download'
 
=======
import { Settings } from './Settings';
import { Downloads } from './Downloads';

>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2
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
<<<<<<< HEAD
      }, 
      { path: "download", 
        element: <Download/>


=======
      },
      {
        path: "downloads",
        element: <Downloads />,
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2
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
