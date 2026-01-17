import React, { useState, useEffect } from 'react';
import api from '../../../api/axios.js';
import { useAuth } from '../../../context/AuthContext.jsx';



//Function to get inital state safely
const getInitialVisaState = (user, visaType) => {
  const saved = sessionStorage.getItem("visaRequest");
  if(saved){ 
    return JSON.parse(saved);
  }else{
    const fromLStorage = localStorage.getItem("visaRequest");
    if(fromLStorage){
      return JSON.parse(fromLStorage);
    }else{
      return {
    uid: user?._id || "",
    request_number: `REQ-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    status: "Draft",
    visa_type: visaType,
    visa_no: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    visa_request_id: ""
  };
  }
  } 
};

const getInitialPurposeState =  () =>{
  const saved = sessionStorage.getItem("travelPurpose");
  if(saved){
    return JSON.parse(saved);
  }else{
      return {  category: "", specific_purpose: "" };
    }
  }




const TravelPurposeForm = ({ step, setStep, visaType }) => {
  const { user, isAuthenticated } = useAuth();
  if(!isAuthenticated) {
    return <Navigate to="/login"/>
  }
  // Initialize state with a function so it checks storage IMMEDIATELY
  const [visaRequest, setVisaRequest] = useState(() => getInitialVisaState(user, visaType));
  const [travelPurpose, setTravelPurpose] = useState(() => getInitialPurposeState());


// Keep useEffect ONLY for loading existing data from sessionStorage or the API.
useEffect(() => {
  const loadExistingData = async () => {
    if (!isAuthenticated || !user?._id) return;
      // If we have an ID, try to get latest from server
      if (visaRequest._id && (!travelPurpose.category || !travelPurpose.specific_purpose)) {
        try {
          const tpRes = await api.get(`/visa/visa-request/travel-purpose/${visaRequest._id}`);
          if (tpRes.data) setTravelPurpose(tpRes.data);
        } catch (e) { console.log("Fresh purpose"); }
      }
  };
  loadExistingData();
}, [user?._id, isAuthenticated]);





// 2. Move Creation Logic to handleNext
const handleNext = async () => {
  if (!travelPurpose.category || !travelPurpose.specific_purpose) {
    return alert("Please fill all fields");
  }

  try {
    let currentVrid = visaRequest.visa_request_id;
    // IF NO REQUEST EXISTS YET, CREATE IT NOW
    if (!currentVrid) {
      const res = await api.post(`/visa/visa-request`, visaRequest);
      if (res.data && res.data._id) {
        currentVrid = res.data._id;
        const updatedReq = { ...visaRequest, visa_request_id: currentVrid };
        setVisaRequest(updatedReq);
        sessionStorage.setItem("visaRequest", JSON.stringify(updatedReq));
      }
    }
    await api.put(`/visa/visa-request/travel-purpose/${currentVrid}`, {
      ...travelPurpose
    });
    sessionStorage.setItem("travelPurpose", JSON.stringify(travelPurpose));
    setStep(step + 1);
  } catch (e) {
    console.error(e);
    alert("Error saving data. Please try again." + e);
  }
};


  const handleChange = (field, value) => {
    setTravelPurpose(prev => ({
      ...prev,
      [field]: value
    }));
  };

 

  
  const handlePrevious = () => {
    setStep(step - 1);
  };

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

  // REMOVED: if (isInitialLoad) return null; 
  // The form is now visible from the first millisecond.

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      {/* Header Info */}
      <div className="mb-4 text-xs text-gray-500">
        Request ID: <span className="font-bold">{visaRequest.request_number}</span> | Status: {visaRequest.status}
      </div>
      
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Travel purpose</h2>

      {/* Category Selection */}
      <div className="mb-10 max-w-sm">
        <label className="text-[11px] font-bold mb-1 uppercase tracking-tight text-gray-700">
          Travel purpose: <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <select 
            value={travelPurpose.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm bg-white"
          >
            <option value="" disabled>Select Category</option>
            <option value="Employment">Employment</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
          </select>
          <div className="w-5 h-5 flex-shrink-0 rounded-full bg-[#d4af37] opacity-80"></div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6 text-[#1a304e]">More specific travel purpose:</h3>
      
      {/* Specific Purpose List */}
      <div className="space-y-3 mb-12">
        <label className="text-[11px] font-bold mb-4 block uppercase tracking-tight text-gray-700">
          Select specific purpose: <span className="text-red-500">*</span>
        </label>
        
        {specificPurposes.map((purpose) => {
          const isActive = travelPurpose.specific_purpose === purpose;
          return (
            <div 
              key={purpose}
              onClick={() => handleChange('specific_purpose', purpose)}
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

      {/* Navigation Buttons */}
      <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
        <button 
          className="bg-[#1a304e] text-white px-10 py-2 rounded-sm text-sm font-semibold hover:bg-[#2c4765] transition-colors shadow-sm"
          onClick={handlePrevious}
        >
          Previous step
        </button>

        <button 
          className="bg-[#1a304e] text-white px-10 py-2 rounded-sm text-sm font-semibold hover:bg-[#2c4765] transition-colors shadow-sm" 
          onClick={handleNext}
        > 
          Next step
        </button>
      </div>
    </div>
  );
};

export default TravelPurposeForm;