import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Seach from './views/search'
import Favorites from './views/favorites'
import Later from './views/later'
import './index.css'
import ErrorPage from './views/error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Seach />,
    errorElement: <ErrorPage />
  },
  {
    path: "/later",
    element: <Later />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
