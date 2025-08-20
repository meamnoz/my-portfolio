import React from 'react';
import { UserCircle2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center p-6 lg:p-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8 flex items-center">
          <UserCircle2 className="w-8 h-8 mr-3 text-blue-500" />
          About Me
        </h2>
        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
          <p>I am Meysam Norouzi, an international trader based in Iran. Since 2014, I have been actively engaged in the field of international trade, building a career focused on navigating global markets and fostering robust business relationships.</p>
          <p>Holding an MBA, I combine academic knowledge with practical experience to drive business growth. My current focus is on the innovative application of Artificial Intelligence in commerce, aiming to optimize trade processes and uncover new market opportunities through data-driven strategies.</p>
          <p>My goal is to leverage technology to create more efficient and intelligent trade solutions, contributing to the evolution of the industry.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
