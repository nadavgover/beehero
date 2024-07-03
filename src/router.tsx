import { createBrowserRouter } from 'react-router-dom'
import UsersPage from './components/UsersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UsersPage />,
  },
])
