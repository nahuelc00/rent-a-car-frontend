import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { CarForm } from './ui/pages/carForm';
import { Detail } from './ui/pages/detail';
import { Delete } from './ui/pages/delete';
import { RegisterForm } from './ui/pages/auth/registerForm';
import { LoginForm } from './ui/pages/auth/loginForm';
import { Welcome } from './ui/pages/welcome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: 'register',
    element: <RegisterForm />,
  },
  {
    path: 'login',
    element: <LoginForm />,
  },
  {
    path: 'car/add',
    element: <CarForm />,
  },
  {
    path: 'car/detail/:id',
    element: <Detail />,
  },
  {
    path: 'car/edit/:id',
    element: <CarForm isUpdate />,
  },
  {
    path: 'car/delete/:id',
    element: <Delete />,
  },

]);

export { router };
