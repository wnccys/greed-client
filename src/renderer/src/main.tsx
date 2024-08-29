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
        path: "selected-game/:gameId/:gameName",
        loader: async ({ params }): Promise<[string | undefined, string | undefined]> => {
          return [params.gameId, params.gameName];
        },
        element: <SelectedGame />
      },
      {
        path: "settings",
        element: <Settings />
<<<<<<< HEAD
      },
      {
        path: "downloads",
        element: <Downloads />,
      },
      {
        path: "library",
        element: <Library />
=======
      }, 
      { path: "downloads", 
        element: <Downloads />
>>>>>>> dbdaa252f5e9b344c8de4e341d75d3a6d0f525c3
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
