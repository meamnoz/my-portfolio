import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Resume from './components/Resume';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // این کامپوننت اصلی برنامه است که تمام بخش‌ها را در کنار هم قرار می‌دهد
  return (
    <div className="lg:flex font-inter bg-gray-50 text-gray-800">
      <Header />
      <main className="lg:ml-24 flex-1">
        <Home />
        <About />
        <Services />
        <Resume />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
