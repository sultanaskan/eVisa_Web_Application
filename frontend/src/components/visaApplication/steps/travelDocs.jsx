import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios.js';

const getInitialTravelState = () => {
  const saved = sessionStorage.getItem("travelData");
  console.log(saved);
  if (saved){
    return JSON.parse(saved);
  } 
  return {
    type_of_travel_document: "",
    travel_document_number: "",
    country_of_issue: "",
    place_of_issue: "",
    date_of_issue: "",
    valid_until: "",
    resides_in_other_country: "No"
  };
};

const getInitialReqState = () =>{
  const st = sessionStorage.getItem("visaRequest");
  if(st){
    return JSON.parse(st);
  }else{
     const lt = localStorage.getItem("visaRequest");
     if(lt){
      return JSON.parse(lt);
     }
  }
}

const TravelDocumentForm = ({ step, setStep }) => {
  const { isAuthenticated } = useAuth();
  
  // 1. Initialize local state
  const [travelData, setTravelData] = useState(() => getInitialTravelState());  
  const [visaRequest] = useState(() => getInitialReqState());

  useEffect(() => {
    const LoadTtravelDataFromServer = async () =>{
      const res = await api.get(`/visa/visa-request/travel-documents/${visaRequest.visa_request_id}`);
      if(res?.data?.travel_document_info){
        setTravelData(res.data.travel_document_info);
        sessionStorage.setItem("travelData", JSON.stringify(res.data.travel_document_info));
      }
    }
    LoadTtravelDataFromServer();
  }, []);

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTravelData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // 3. Save to backend and move next
  const handleNext = async () => {
    if (!visaRequest?.visa_request_id) {
      return alert("Visa Request ID not found. Please go back to Step 1.");
    }
    try {
      // Payload structure as requested
      const payload = { travel_document_info: travelData };
      
      const res = await api.put(`/visa/visa-request/travel-documents/${visaRequest.visa_request_id}`, payload);
      // Save to storage for persistence on refresh
      if(res?.data?.travel_document_info){
      sessionStorage.setItem("travelData", JSON.stringify(res.data.travel_document_info));
      }

      setStep(step + 1);
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving travel document information.");
    }
  };



  const handlePrevious = () => {
    setStep(step - 1);
  };


  if (!isAuthenticated) return <div className="p-6 text-center">Please log in to continue.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Information about travel documents</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {/* Left Column */}
        <div className="space-y-4">
          <SelectGroup 
            label="Type of travel document" 
            name="type_of_travel_document" 
            required 
            options={['National passport', 'Diplomatic passport', 'Service passport']} 
            value={travelData.type_of_travel_document} 
            onChange={handleChange} 
          />
          
          <InputGroup 
            label="Travel document number" 
            name="travel_document_number" 
            required 
            value={travelData.travel_document_number} 
            onChange={handleChange} 
          />
          
          <SelectGroup 
            label="Country of issue" 
            name="country_of_issue" 
            required 
            options={['Bangladesh', 'Serbia', 'USA']} 
            value={travelData.country_of_issue} 
            onChange={handleChange} 
          />

          <InputGroup 
            label="Place of issue" 
            name="place_of_issue" 
            required 
            value={travelData.place_of_issue} 
            onChange={handleChange} 
          />

          <InputGroup 
            label="Date of issue" 
            name="date_of_issue" 
            required 
            type="date" 
            value={travelData.date_of_issue} 
            onChange={handleChange} 
            hint="The travel document must have been issued in the last 10 years."
          />

          <InputGroup 
            label="Valid until" 
            name="valid_until" 
            required 
            type="date" 
            value={travelData.valid_until} 
            onChange={handleChange} 
            hint="The document must be valid for at least three months after departure."
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <SelectGroup 
            label="Do you live in a country other than your country of origin?" 
            name="resides_in_other_country" 
            required 
            options={['No', 'Yes']} 
            value={travelData.resides_in_other_country} 
            onChange={handleChange} 
          />
        </div>
      </div>

      <p className="mt-12 text-xs text-gray-500 italic font-medium">
        All fields marked with * are mandatory
      </p>

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-between items-center border-t border-gray-100 pt-8">
        <button 
          className="bg-[#2c4765] text-white px-8 py-2 rounded-sm text-sm font-semibold hover:bg-[#1a304e] transition-colors" 
          onClick={handlePrevious}
        >
          Previous step
        </button>
        <button 
          className="bg-[#2c4765] text-white px-8 py-2 rounded-sm text-sm font-semibold hover:bg-[#1a304e] transition-colors" 
          onClick={handleNext}
        >
          Next step
        </button>
      </div>
    </div>
  );
};

/* --- UI Helper Components --- */

const InputGroup = ({ label, required, type = "text", value, name, onChange, hint }) => (
  <div className="flex flex-col mb-2">
    <label className="text-[11px] font-bold mb-1 uppercase tracking-tight text-gray-700">
      {label}: {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex-1">
      <input 
        type={type} 
        name={name}
        value={value || ""} 
        onChange={onChange}
        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm bg-white"
      />
      {hint && <p className="text-[10px] text-gray-400 mt-1 leading-tight">{hint}</p>}
    </div>
  </div>
);

const SelectGroup = ({ label, required, options, value, name, onChange }) => (
  <div className="flex flex-col mb-2">
    <label className="text-[11px] font-bold mb-1 uppercase tracking-tight text-gray-700">
      {label}: {required && <span className="text-red-500">*</span>}
    </label>
    <select 
      name={name}
      value={value || ""} 
      onChange={onChange}
      className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm bg-white"
    >
      <option value="" disabled>Select...</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default TravelDocumentForm;