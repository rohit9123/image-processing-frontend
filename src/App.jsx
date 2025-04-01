import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Download from './pages/Download';
import Status from './pages/Status';

export default function App() {
  return (
    <Router>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg fixed w-full top-0 z-50"
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white text-2xl font-bold hover:text-purple-200 transition-colors"
            >
              <span role="img" aria-label="sparkles" className="text-3xl">✨</span>
              <span>Image Processor</span>
            </Link>
          </motion.div>
          <div className="flex space-x-6 items-center">
            <NavLink to="/upload">Upload</NavLink>
            <NavLink to="/download">Download</NavLink>
            <NavLink to="/status">Status</NavLink>
          </div>
        </div>
      </motion.nav>

      <div className="pt-20 pb-8"> {/* Add padding to account for fixed nav */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/download" element={<Download />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </div>
    </Router>
  );
}

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Link
        to={to}
        className={`px-4 py-2 rounded-md font-medium transition-colors relative ${
          isActive 
            ? 'text-white' 
            : 'text-white/90 hover:text-white'
        }`}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute bottom-0 left-0 w-full h-1 bg-purple-200 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
          />
        )}
      </Link>
    </motion.div>
  );
};