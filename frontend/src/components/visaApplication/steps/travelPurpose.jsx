import React, { useState } from 'react';

const TravelPurposeForm = () => {
  const [selectedPurpose, setSelectedPurpose] = useState('Accredited foreign journalist');

  const specificPurposes = [
    "Employment on the grounds of an employment contract or another contract exercising workplace rights",
    "Enrolled in the registration decision (self-employment)",
    "Agreement on business and technical cooperation (informed persons)",
    "Movement within the company",
    "Independent professional",
    "Training and development (professional practice, specialization, training, internship, work experience, professional training/development)",
    "Volunteering",
    "Accredited foreign journalist",
    "Realization of projects with state authorities of RS",
    "Hiring a member of the author's and acting team who produce an audio-visual work on the territory of the RS"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Travel purpose</h2>

      {/* Main Purpose Dropdown */}
      <div className="mb-10 max-w-sm">
        <label className="text-[11px] font-bold mb-1 uppercase tracking-tight text-gray-700">
          Travel purpose: <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <select className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm bg-white">
            <option>Employment</option>
          </select>
          <div className="w-5 h-5 flex-shrink-0 rounded-full bg-[#d4af37] opacity-80"></div>
        </div>
      </div>

      {/* Specific Purpose Selection */}
      <h3 className="text-xl font-bold mb-6 text-[#1a304e]">More specific travel purpose:</h3>
      
      <div className="space-y-3 mb-12">
        <label className="text-[11px] font-bold mb-4 block uppercase tracking-tight text-gray-700">
          Select specific purpose: <span className="text-red-500">*</span>
        </label>
        
        {specificPurposes.map((purpose) => {
          const isActive = selectedPurpose === purpose;
          return (
            <div 
              key={purpose}
              onClick={() => setSelectedPurpose(purpose)}
              className={`flex items-center p-4 border rounded cursor-pointer transition-all ${
                isActive 
                  ? 'bg-[#5b96e0] border-[#5b96e0] text-white shadow-md' 
                  : 'bg-[#d9e2ef] border-[#d9e2ef] text-[#2c4765] hover:bg-[#ccd7e6]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center ${
                isActive ? 'border-white bg-white' : 'border-[#2c4765]'
              }`}>
                {isActive && <div className="w-2 h-2 rounded-full bg-[#5b96e0]"></div>}
              </div>
              <span className="text-sm font-medium leading-snug">
                {purpose}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 italic">All fields marked with * are mandatory</p>

      {/* Navigation Button */}
      <div className="mt-10 flex justify-end">
        <button className="bg-[#1a304e] text-white px-10 py-2 rounded text-sm font-semibold hover:bg-[#2c4765] transition-colors shadow-sm">
          Next step
        </button>
      </div>
    </div>
  );
};

export default TravelPurposeForm;