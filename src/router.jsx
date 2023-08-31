import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Root } from './ui/pages/root';
import { Form } from './ui/pages/form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'form/add',
    element: <Form />,
  },
]);

export { router };
