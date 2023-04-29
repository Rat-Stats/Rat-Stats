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

import store from './store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
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
  }
])

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);