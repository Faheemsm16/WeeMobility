import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <p>© {new Date().getFullYear()} Wee Mobility. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
