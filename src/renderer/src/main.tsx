import './assets/main.css'
import './assets/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { SelectedGame } from '@renderer/SelectedGame/index';
import { createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom';
 
 const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: () => null,
    // children: [
    //   {
    //     path: "catalog",
    //     element: <SelectedGame />
    //   }
    // ]
  },
 ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
