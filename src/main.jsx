import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './states/store.js';

const routerConfig = createBrowserRouter(
  createRoutesFromChildren(<Route path="*" element={<App />} />)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routerConfig} />
    </Provider>
  </React.StrictMode>
);
