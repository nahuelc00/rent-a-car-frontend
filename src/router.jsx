import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Root } from './ui/pages/root';
import { Form } from './ui/pages/form';
import { Detail } from './ui/pages/detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: 'form/add',
    element: <Form />,
  },
  {
    path: 'detail/:id',
    element: <Detail />,
  },
]);

export { router };
