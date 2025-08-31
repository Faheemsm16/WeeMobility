import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section id="hero" className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-green-400 text-white text-center px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-6"
      >
        Wee Mobility – Affordable Electric Scooters for Every Family
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg max-w-2xl"
      >
        Bringing eco-friendly and cost-effective travel to middle-class families with modern design and performance.
      </motion.p>
    </section>
  );
}

export default Hero;
