import React from 'react';
import { motion } from 'framer-motion';

function Header() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-white shadow-lg z-50"
    >
      <div className="font-bold text-xl cursor-pointer" onClick={() => scrollTo('hero')}>
        Wee Mobility
      </div>
      <nav className="space-x-6">
        <button onClick={() => scrollTo('about')}>About Us</button>
        <button onClick={() => scrollTo('products')}>Products</button>
        <button onClick={() => scrollTo('contact')}>Contact Us</button>
      </nav>
    </motion.header>
  );
}

export default Header;
