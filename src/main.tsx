import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.scss'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Fact from './components/Fact/Fact.tsx';
import Age from './components/Age/Age.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/fact",
    element: <Fact />,
  },
  {
    path: "/age",
    element: <Age />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
