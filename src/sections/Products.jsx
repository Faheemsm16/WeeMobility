import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const colors = {
  misty: "Misty Grey",
  red: "Cherry Red",
  brown: "Choco Brown",
  blue: "Aqua Blue",
  orange: "Sunset Orange"
};

function Products() {
  const [selectedColor, setSelectedColor] = useState("misty");
  const [view, setView] = useState("front");

  useEffect(() => {
    const interval = setInterval(() => {
      setView((prev) => (prev === "front" ? "side" : "front"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="products" className="min-h-screen px-8 py-16 bg-white text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-3xl font-bold mb-8"
      >
        Our Products
      </motion.h2>

      <div className="flex flex-col items-center">
        <motion.img 
          key={selectedColor + view}
          src={`/products/wee-ls1/${view}_${selectedColor}.png`} 
          alt={`WEE LS-1 ${colors[selectedColor]} ${view} view`} 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="w-96 h-auto rounded-xl shadow-lg mb-6"
        />

        <div className="flex space-x-4 mb-6">
          {Object.keys(colors).map((c) => (
            <button 
              key={c} 
              onClick={() => setSelectedColor(c)}
              className={`px-4 py-2 rounded-full border ${selectedColor === c ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {colors[c]}
            </button>
          ))}
        </div>

        <a href="/brochure.pdf" download className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition">
          Download Brochure
        </a>
      </div>
    </section>
  );
}

export default Products;
