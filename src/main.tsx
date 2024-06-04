import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import axios from 'axios';
import App from './App';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';
import './input.css';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
      {
        path: 'leaderboard',
        loader: async () => {
          const response = await axios.get('http://localhost:3000/users');
          const users = await response.data
          console.log(users)
          return { users };
        },
        element: <Leaderboard users={[]} />, // Default value; will be overridden by loader
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
