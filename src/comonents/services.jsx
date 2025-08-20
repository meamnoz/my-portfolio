import React from 'react';
// تغییر: ایمپورت آیکن‌های جدید و مناسب‌تر
import { LuBriefcase, LuTrendingUp, LuMessageSquare, LuGavel, LuPackageCheck, LuBrainCircuit, LuCheck } from 'react-icons/lu';

const ServiceCard = ({ icon, title, description, benefits }) => (
  <div className="service-card">
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${icon.bgColor}`}>
        {icon.component}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="space-y-2 text-gray-600">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start">
          <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Services = () => {
  const serviceData = [
    {
      // آیکن رشد و بازاریابی
      icon: { component: <LuTrendingUp className="w-6 h-6 text-blue-600" />, bgColor: 'bg-blue-100' },
      title: "Export Marketing",
      description: "I assist companies in identifying new markets and increasing their international sales.",
      benefits: ["Access to new markets and increased sales.", "Enhanced brand recognition internationally.", "Reduced risks associated with market entry."]
    },
    {
      icon: { component: <LuMessageSquare className="w-6 h-6 text-teal-600" />, bgColor: 'bg-teal-100' },
      title: "Correspondence & Negotiation",
      description: "I offer commercial correspondence and negotiation services for effective and professional communication with international partners.",
      benefits: ["Increased efficiency in business communications.", "Improved negotiation outcomes.", "Reduced commercial risks."]
    },
    {
      icon: { component: <LuGavel className="w-6 h-6 text-indigo-600" />, bgColor: 'bg-indigo-100' },
      title: "Legal Affairs",
      description: "I provide consulting and support in negotiating international trade agreements to help you secure favorable contracts.",
      benefits: ["Ensured compliance with international laws.", "Reduced legal and contractual risks.", "Increased transparency and trust."]
    },
    {
      // آیکن مدیریت بسته و لجستیک
      icon: { component: <LuPackageCheck className="w-6 h-6 text-amber-600" />, bgColor: 'bg-amber-100' },
      title: "Export & Import Management",
      description: "I manage the entire export and import process, including customs, transportation, insurance, and currency transactions.",
      benefits: ["Reduced costs and time.", "Assurance of compliance with regulations.", "Increased efficiency in supply chain."]
    }
  ];

  return (
    <section id="services" className="min-h-screen p-6 lg:p-16 bg-gray-50">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <LuBriefcase className="w-8 h-8 mr-3 text-blue-500" />
            My Professional Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">In today's world, businesses require specialized services to succeed in international markets. I provide a diverse range to help you achieve your objectives.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        <div className="mt-8">
          <div className="service-card">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mr-0 mb-4 md:mr-6 md:mb-0">
                {/* آیکن مشاوره تخصصی و هوش مصنوعی */}
                <LuBrainCircuit className="w-12 h-12 text-rose-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Specialized Consulting</h3>
                <p className="text-gray-600 mb-4">My team provides specialized consulting on international laws, quality standards, and technical requirements to ensure your success.</p>
                <ul className="space-y-2 text-gray-600 sm:flex sm:space-y-0 sm:space-x-6">
                  <li className="flex items-start"><LuCheck className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" /><span>Access to up-to-date expertise.</span></li>
                  <li className="flex items-start"><LuCheck className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" /><span>Improved product quality.</span></li>
                  <li className="flex items-start"><LuCheck className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" /><span>Reduced compliance risks.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
