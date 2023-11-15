import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { CarForm } from './ui/pages/cars/carForm';
import { Detail } from './ui/pages/cars/detail';
import { Delete } from './ui/pages/cars/delete';
import { RegisterForm } from './ui/pages/auth/registerForm';
import { LoginForm } from './ui/pages/auth/loginForm';
import { Welcome } from './ui/pages/welcome';
import { Backoffice } from './ui/pages/backoffice';
import { RegisterClient } from './ui/pages/registerClient';
import { Cars } from './ui/pages/cars/cars';

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
    path: 'cars',
    element: <Cars />,
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
  {
    path: 'backoffice',
    element: <Backoffice />,
  },
  {
    path: 'client/register',
    element: <RegisterClient />,
  },

]);

export { router };
