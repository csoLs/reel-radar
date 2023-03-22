import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'

import SearchView from './views/search'
import FavoritesView from './views/favorites'
import WatchLaterView from './views/later'
import './index.css'
import ErrorPage from './views/error';

import Layout from './components/layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "/reel-radar/",
        element: <SearchView />,
        errorElement: <ErrorPage />
      },
      {
        path: "/reel-radar/later",
        element: <WatchLaterView />,
      },
      {
        path: "/reel-radar/favorites",
        element: <FavoritesView />,
      },
      {
        path: "/reel-radar/*",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
      },
    ]
  },
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
