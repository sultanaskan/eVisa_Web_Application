import React from 'react';

const PersonalDetail = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Personal information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {/* Left Column */}
        <div className="space-y-4">
          <InputGroup label="User's last name" required value="HASAN" />
          <InputGroup label="Last name at birth" required value="sdfg" />
          <InputGroup label="User's first name" required value="MOHAMMAD" />
          <SelectGroup label="Gender" required options={['Male', 'Female']} value="Male" />
          <InputGroup label="Date of birth" required type="date" value="11/06/1975" />
          <SelectGroup label="Country of birth" required options={['Bangladesh']} value="Bangladesh" />
          <InputGroup label="Place of birth" required value="DHAKA" />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <InputGroup label="Address" required value="90 SOUTH JA" />
          <InputGroup label="Telephone" required value="+14172546773" />
          <SelectGroup label="Passport issuing country" required options={['Bangladesh']} value="Bangladesh" />
          <SelectGroup label="Original citizenship" required options={['Bangladesh']} value="Bangladesh" />
          <SelectGroup label="Marital status" required options={['Single', 'Married']} value="Single" />
          <InputGroup label="Father's first name" required value="HABIBUR RA" />
          <InputGroup label="Mother's first name" required value="MALOTE BEC" />
          <InputGroup label="E-mail address" required value="mmmedicare" />
        </div>
      </div>

      {/* Family Data Section */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-[#1a304e]">Family data</h3>
        <div className="space-y-3">
          <CheckboxGroup label="Do you have a family?" />
          <CheckboxGroup label="Do you have children?" />
        </div>
      </div>

      {/* Employment Information Section */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4 text-[#1a304e]">Employment information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div className="space-y-4 md:col-start-1">
            <InputGroup label="Current profession" value="RESTAURANT" />
            <InputGroup label="Employer's company" value="MS Overseas" />
            <InputGroup label="Employer's address" value="House: 89 3rd" />
            <InputGroup label="Employer's telephone number" value="+14172546773" />
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-500 italic">All fields marked with * are mandatory</p>

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-between">
        <button className="bg-[#2c4765] text-white px-8 py-2 rounded text-sm font-semibold hover:bg-[#1a304e] transition-colors">
          Previous step
        </button>
        <button className="bg-[#2c4765] text-white px-8 py-2 rounded text-sm font-semibold hover:bg-[#1a304e] transition-colors">
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
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex items-center gap-2">
      <input 
        type={type} 
        defaultValue={value}
        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm"
      />
      <div className="w-4 h-4 rounded-full bg-yellow-400 opacity-80" title="Help information"></div>
    </div>
  </div>
);

const SelectGroup = ({ label, required, options, value }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold mb-1 uppercase tracking-tight text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex items-center gap-2">
      <select defaultValue={value} className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm bg-white">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <div className="w-4 h-4 rounded-full bg-yellow-400 opacity-80"></div>
    </div>
  </div>
);

const CheckboxGroup = ({ label }) => (
  <div className="flex items-center gap-3">
    <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-[#2c4765]" />
    <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{label}</span>
    <div className="w-4 h-4 rounded-full bg-yellow-400 opacity-80"></div>
  </div>
);

export default PersonalDetail;