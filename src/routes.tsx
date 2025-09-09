import React from 'react';
import { RouteObject } from 'react-router-dom';
import Login from './containers/Login';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import MyTodos from './containers/MyTodos';
import NotFound from './containers/NotFound';
import AddTodo from './containers/AddTodo';
import EditTodos from './containers/EditTodo';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/todo/my-todos', element: <MyTodos /> },
  { path: '/todo/add', element: <AddTodo /> },
  { path: '/todo/edit/:todoId', element: <EditTodos /> },
  { path: '*', element: <NotFound /> },
  // { path: "/about", element: <About /> },
];

export default routes;
