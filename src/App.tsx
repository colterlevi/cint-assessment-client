import React from 'react';
import { Outlet } from 'react-router-dom';
import './input.css';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className='flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
