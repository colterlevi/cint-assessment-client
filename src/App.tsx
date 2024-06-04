import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './input.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default App;
