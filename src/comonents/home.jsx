import React from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';

const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center p-6 lg:p-12 bg-white">
      <div className="text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800">Meysam Norouzi</h1>
        <p className="mt-4 text-lg lg:text-xl text-gray-500">Trader | Born 1997</p>
        <p className="mt-2 text-md lg:text-lg text-gray-500">Pioneering AI Implementation in International Commerce</p>
        <div className="mt-8 flex justify-center space-x-4">
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-300"><Linkedin className="w-6 h-6" /></a>
          <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors duration-300"><Github className="w-6 h-6" /></a>
          <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors duration-300"><Twitter className="w-6 h-6" /></a>
        </div>
      </div>
    </section>
  );
};

export default Home;
