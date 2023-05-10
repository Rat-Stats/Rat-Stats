import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles.css';
import ReactDOM from 'react-dom/client';
import Login from './Components/Login';
import Homepage from './Components/Homepage';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import ErrorPage from './Components/Error';
import Leaderboard from './Components/Leaderboard';

import store from './store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/homepage',
    element: <Homepage />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />
  }
])

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);