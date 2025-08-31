import React from 'react';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <section id="contact" className="min-h-screen px-8 py-16 bg-gray-100 flex flex-col lg:flex-row justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="lg:w-1/2 p-6"
      >
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p>📍 123 Mobility Street, Chennai, India</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ support@weemobility.com</p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, x: 50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="lg:w-1/2 p-6 bg-white rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
        <input type="text" placeholder="Your Name" className="w-full mb-3 p-2 border rounded" />
        <input type="email" placeholder="Your Email" className="w-full mb-3 p-2 border rounded" />
        <textarea placeholder="Your Message" rows="4" className="w-full mb-3 p-2 border rounded"></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Send</button>
      </motion.form>
    </section>
  );
}

export default Contact;
