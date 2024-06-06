import React from 'react';
import { Outlet } from 'react-router-dom';
// import { motion } from 'framer-motion';
import './input.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className='h-1/6'>
        <Header />
      </div>
      <div className='mb-20 h-4/6 flex items-center justify-center'>
        <Outlet />
      </div>
      <div className='h-8'>
        <Footer />
      </div>
    </div>
  );
};

export default App;
