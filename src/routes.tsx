import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from './containers/Login';
import Home from './containers/Home';
import SignUp from './containers/SignUp';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  // { path: "/about", element: <About /> },
];

export default routes;
