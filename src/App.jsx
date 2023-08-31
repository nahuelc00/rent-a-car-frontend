import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  const $root = document.getElementById('app');
  const reactRoot = createRoot($root);

  reactRoot.render(
    <RouterProvider router={router} />,
  );
}
App();
