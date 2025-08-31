import React from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Products />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
