import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { HomeLayout, Collection, Admin, Item, Login, Register, SearchResults,  Landing, UserDashboard} from './pages'

const router = createBrowserRouter([
   {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'profile',
        element: <UserDashboard />,
      },
      {
        path: 'search-results',
        element: <SearchResults />
      },
      {
        path: 'collection',
        element: <Collection />
      },
      {
        path: 'admin',
        element: <Admin />,
      },
      {
        path: 'collection/:id',
        element: <Item />,
      }
    ]
   },
   {
    path: '/login',
    element: <Login />
   },
   {
    path: '/register',
    element: <Register />
   }
])

const App = () => {
  return ( 
      <RouterProvider router={router} />
  )
}

export default App