import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Root } from './ui/pages/root';
import { Form } from './ui/pages/form';
import { Detail } from './ui/pages/detail';
import { Delete } from './ui/pages/delete';
import { RegisterForm } from './ui/pages/registerForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'register',
    element: <RegisterForm />,
  },
  {
    path: 'form/add',
    element: <Form />,
  },
  {
    path: 'detail/:id',
    element: <Detail />,
  },
  {
    path: 'form/edit/:id',
    element: <Form isUpdate />,
  },
  {
    path: 'delete/:id',
    element: <Delete />,
  },

]);

export { router };
