import { createBrowserRouter } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import MapPage from './components/MapPage/MapPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UsersPage />,
  },
  {
    path: '/map/:lat/:lng',
    element: <MapPage />,
  },
])
