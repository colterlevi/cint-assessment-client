import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError
} from 'react-router-dom';
import axios from 'axios';
import App from './App';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';
import './input.css';
import Home from './components/Home';
import Results from './components/Results';

const ErrorBoundary: React.FC = () => {
  const routeError = useRouteError();

  if (routeError) {
    console.error('Route error:', routeError);
    return <h1>Something went wrong with the route.</h1>;
  }

  return null;
}

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
        path: 'results',
        element: <Results />,
      },
      {
        path: 'leaderboard',
        loader: async () => {
          const response = await axios.get('https://colters-quiz-api-6118b7b1799e.herokuapp.com/users');
          const users = await response.data
          console.log(users)
          return { users };
        },
        element: <Leaderboard users={[]} />, // Default value; will be overridden by loader
      },
    ],
    errorElement: <ErrorBoundary />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
