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
import { Dashboard } from './ui/pages/dashboard';
import { LogOut } from './ui/pages/auth/logout';
import { Profile } from './ui/pages/profile';
import { Rents } from './ui/pages/rents/rents';
import { RentForm } from './ui/pages/rents/rentForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
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
    path: 'logout',
    element: <LogOut />,
  },
  {
    path: 'profile',
    element: <Profile />,
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
  {
    path: 'rents',
    element: <Rents />,
  },
  {
    path: 'rent/add',
    element: <RentForm />,
  },
  {
    path: 'rent/edit/:id',
    element: <RentForm isUpdate />,
  },

]);

export { router };
