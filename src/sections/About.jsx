import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center px-8 py-16 bg-gray-100 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-3xl font-bold mb-6"
      >
        About Us
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-3xl text-lg"
      >
        Wee Mobility is dedicated to providing affordable and reliable electric scooters for middle-class families.
        Our scooters are designed with style, safety, and sustainability in mind, ensuring that every ride is smooth, cost-effective, and eco-friendly.
      </motion.p>
    </section>
  );
}

export default About;
