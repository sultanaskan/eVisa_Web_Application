import React from 'react';

const VisaInformationForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      {/* Section 1: Visa Application Details */}
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Information about the visa for which you apply</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
        <div className="space-y-4">
          <SelectGroup label="Diplomatic and Consular Representation Office" required options={['NEW DELHI']} value="NEW DELHI" />
          <InputGroup label="Visa type" value="Visa D - long" readOnly />
          <InputGroup label="Travel purpose" value="Employment" readOnly />
          <InputGroup label="Number of days of stay" required value="180" />
          <SelectGroup label="Other visas issued in the previous three years" required options={['No', 'Yes']} value="No" />
        </div>

        <div className="space-y-4">
          <InputGroup label="Date of arrival in the Republic of Serbia" required type="date" value="2024-01-01" />
          <InputGroup label="Date of departure from the Republic of Serbia" required type="date" value="2024-06-30" />
          <SelectGroup label="Border Crossing" options={['AIRPORT']} value="AIRPORT" />
          <InputGroup label="Means of transport" placeholder="Example: airplane, car, bus etc." value="PLANE" />
        </div>
      </div>

      {/* Section 2: Previous Stay */}
      <h2 className="text-xl font-bold mb-6 text-[#1a304e]">Information on previous stay in the Republic of Serbia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-12">
        <SelectGroup label="Have you previously stayed in the Republic of Serbia?" required options={['No', 'Yes']} value="No" />
      </div>

      {/* Section 3: Intended Residence */}
      <h2 className="text-xl font-bold mb-6 text-[#1a304e]">Data on intended (future) residence in the Republic of Serbia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
        <div className="space-y-4">
          <InputGroup label="Name of your host" required value="UNITISET KA" />
          <InputGroup label="Host's telephone number" required value="+38161501435" />
          <InputGroup label="Host's address" required value="VESELINA M" />
          <InputGroup label="Host's e-mail address" required value="lyon@example.com" />
          <SelectGroup label="Municipality" required options={['ALEXSANDR...']} value="ALEXSANDR..." />
          <SelectGroup label="Settlement" required options={['ALEXSANDR...']} value="ALEXSANDR..." />
        </div>

        <div className="space-y-4">
          <InputGroup label="Street" required value="18 OKTOBAR" />
          <InputGroup label="House number" required value="001" />
          <InputGroup label="Entrance" value="MAIN" />
          <InputGroup label="Floor" value="1ST" />
          <InputGroup label="Apartment" value="1A" />
          <SelectGroup label="Who is covering your travel costs?" required options={['Visa applicant']} value="Visa applicant" />
          <SelectGroup label="Financial resources for living expenses" required options={['Credit cards']} value="Credit cards" />
        </div>
      </div>

      <p className="text-xs text-gray-500 italic">All fields marked with * are mandatory</p>

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

/* --- Helper Components --- */

const InputGroup = ({ label, required, type = "text", value, placeholder, readOnly = false }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold mb-1 uppercase tracking-tight text-gray-700">
      {label}: {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex items-center gap-2">
      <input 
        type={type} 
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm ${readOnly ? 'bg-gray-100 italic' : 'bg-white'}`}
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
      <select defaultValue={value} className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm bg-white">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <div className="w-5 h-5 flex-shrink-0 rounded-full bg-[#d4af37] opacity-80"></div>
    </div>
  </div>
);

export default VisaInformationForm;