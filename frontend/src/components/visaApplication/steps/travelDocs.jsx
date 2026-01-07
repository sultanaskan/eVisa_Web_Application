import React from 'react';

const TravelDocsForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Information about travel documents</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {/* Left Column */}
        <div className="space-y-6">
          <SelectGroup 
            label="Type of travel document" 
            required 
            options={['National passport', 'Diplomatic passport', 'Service passport']} 
            value="National passport" 
          />
          
          <InputGroup 
            label="Travel document number" 
            required 
            value="A12880048" 
          />
          
          <SelectGroup 
            label="Country of issue of travel document" 
            required 
            options={['Bangladesh']} 
            value="Bangladesh" 
          />

          <InputGroup 
            label="Place of issue of travel document" 
            required 
            value="DIP/DHAKA" 
          />

          <div className="flex flex-col">
            <InputGroup 
              label="Date of issue" 
              required 
              type="date" 
              value="2023-10-29" 
            />
            <p className="text-[10px] text-gray-500 mt-1 leading-tight italic">
              The travel document must have been issued in the last 10 years and must have two consecutive blank pages.
            </p>
          </div>

          <div className="flex flex-col">
            <InputGroup 
              label="Valid until" 
              required 
              type="date" 
              value="2033-10-28" 
            />
            <p className="text-[10px] text-gray-500 mt-1 leading-tight italic">
              The travel document must be valid for at least three months after the intended date of departure from the Republic of Serbia.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SelectGroup 
            label="Do you live in a country other than your country of origin?" 
            required 
            options={['No', 'Yes']} 
            value="No" 
          />
        </div>
      </div>

      <p className="mt-12 text-xs text-gray-500 italic">All fields marked with * are mandatory</p>

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-between">
        <button className="bg-[#1a304e] text-white px-8 py-2 rounded text-sm font-semibold hover:bg-[#2c4765] transition-colors">
          Previous step
        </button>
        <button className="bg-[#1a304e] text-white px-8 py-2 rounded text-sm font-semibold hover:bg-[#2c4765] transition-colors">
          Next step
        </button>
      </div>
    </div>
  );
};

/* --- UI Helper Components --- */

const InputGroup = ({ label, required, type = "text", value }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold mb-1 uppercase tracking-tight text-gray-700">
      {label}: {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex items-center gap-2">
      <input 
        type={type} 
        defaultValue={value}
        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm bg-white"
      />
      <div className="w-5 h-5 flex-shrink-0 rounded-full bg-[#d4af37] opacity-80" title="Help information"></div>
    </div>
  </div>
);

const SelectGroup = ({ label, required, options, value }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold mb-1 uppercase tracking-tight text-gray-700">
      {label}: {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex items-center gap-2">
      <select defaultValue={value} className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm bg-white appearance-none">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <div className="w-5 h-5 flex-shrink-0 rounded-full bg-[#d4af37] opacity-80"></div>
    </div>
  </div>
);

export default TravelDocsForm;