import React from 'react';
import { Outlet } from 'react-router-dom';
// import { motion } from 'framer-motion';
import './input.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default App;
