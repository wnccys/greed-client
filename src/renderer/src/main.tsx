import './Assets/main.css'
import './Assets/global.css'
import ReactDOM from 'react-dom/client'
import { App } from './App/App'
import { createHashRouter,
  RouterProvider,
 } from 'react-router-dom';
import { SelectedGame } from './SelectedGame';
import { Catalog } from './Catalog';
import { ErrorElement } from './ErrorElement';
import { Settings } from './Settings';
import { Downloads } from './Downloads';
import { Library } from './Library';

 const router = createHashRouter([
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
      }, 
      { path: "downloads", 
        element: <Downloads />
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
    <RouterProvider router={router} />
)
