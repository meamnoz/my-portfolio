import React from 'react';
import { FileText, Briefcase, GraduationCap } from 'lucide-react';

const TimelineItem = ({ date, title, subtitle, description }) => (
  <div className="relative">
    <div className="absolute -left-[35px] top-1.5 w-4 h-4 bg-blue-500 rounded-full border-4 border-white"></div>
    <p className="text-sm text-gray-500">{date}</p>
    <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
    <p className="text-gray-600">{subtitle}</p>
    {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
  </div>
);

const Resume = () => {
  return (
    <section id="resume" className="min-h-screen flex items-center p-6 lg:p-16 bg-white">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 flex items-center">
          <FileText className="w-8 h-8 mr-3 text-blue-500" />
          Resume
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center"><Briefcase className="w-6 h-6 mr-2" />Experience</h3>
            <div className="relative border-l-2 border-blue-200 pl-6 space-y-10">
              <TimelineItem
                date="2014 - Present"
                title="International Trader"
                subtitle="Self-Employed / Project-Based"
                description="Managed end-to-end import/export projects, including industrial goods and agricultural products. Leveraged AI for market analysis and supply chain optimization."
              />
              <TimelineItem
                date="Recent Projects"
                title="Project Manager & Consultant"
                subtitle="Various Clients"
                description="Led projects in potato export, industrial goods market analysis for Iraq, and business consulting for a cosmetics company, implementing AI-supported CRM."
              />
            </div>
          </div>
          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center"><GraduationCap className="w-6 h-6 mr-2" />Education</h3>
            <div className="relative border-l-2 border-blue-200 pl-6 space-y-10">
              <TimelineItem
                date="Expected Jan 2025"
                title="Master of Business Administration (MBA)"
                subtitle="University of Tehran"
              />
              <TimelineItem
                date="May 2024"
                title="Certificate in Business & Int'l Trade"
                subtitle="Ministry of Industry, Mine and Trade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
