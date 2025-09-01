import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './components/App';
// import About from "./components/About";

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  // { path: "/about", element: <About /> },
];

export default routes;
