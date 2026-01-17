import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';

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

const FeeSection = ({ step, setStep, visaType }) => {
  // 1. Core State: Sync with localStorage to keep the consent saved
  const [visaRequest, setVisaRequest] = useState(() => getInitialReqState() )
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("visa_fee_consent");
    return saved ? JSON.parse(saved) : { consent_accepted: false };
  });

  // Save to localStorage whenever formData changes
  useEffect(() => {
    sessionStorage.setItem("visa_fee_consent", JSON.stringify(formData));
  }, [formData]);

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      consent_accepted: e.target.checked
    }));
  };

  const handleSubmit = async () => {
    if (!formData.consent_accepted) {
      alert("Please accept the consent terms before proceeding.");
      return;
    }
    // Final logic before payment
    setVisaRequest({ ...visaRequest, status: "Pending"});  
    sessionStorage.setItem("visaRequest", visaRequest)
    try{
        if(visaRequest.status == "Pending"){
          const r = await api.put(`/visa/visa-request/${visaRequest.visa_request_id}`, visaRequest);
          if(r.data){
            alert("Congratulations submited successfuly");
          }
      }
    }catch(error){
      console.error("Error updating visaRequest", error);
    }
   
    console.log("Initiating payment for:", visaType, "Data:", formData);
    // window.location.href = "/payment-gateway-url"; 
  };

  // Helper for "Previous Step"
  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-4 text-[#1a304e]">Payment & Consent</h2>
      
      {/* Optional: Fee Summary Box */}
      <div className="bg-gray-50 p-4 border border-gray-200 rounded-sm mb-8">
        <p className="text-sm text-gray-600">Selected Visa Type: <span className="font-bold">{visaType || "Not Selected"}</span></p>
        <p className="text-lg font-bold text-[#1a304e]">Total Fee: {}</p>
      </div>

      <div className="mt-8 mb-10">
        <label className="text-sm font-bold text-[#1a304e] block mb-4 uppercase tracking-wider">
          Consent *
        </label>
        
        <div className="flex gap-4 items-start bg-white border p-4 rounded-sm shadow-sm">
          <div className="pt-1">
            <input 
              type="checkbox" 
              id="consent"
              checked={formData.consent_accepted}
              onChange={handleCheckboxChange}
              className="w-5 h-5 cursor-pointer accent-[#2c4765]"
            />
          </div>
          <label htmlFor="consent" className="text-[13px] leading-relaxed text-gray-700 cursor-pointer select-none">
            Under full responsible publication that the stated data are true and entered correctly, as well as that the 
            attached documentation is valid. I agree that my personal data may be processed and that field checks 
            and checks of all data being of importance in procedure of temporary residence approval may be performed. 
            I confirm that stated email address is correct and give my consent to the superior authority for delivery 
            of notification and decision attached to my e-mail address. I agree to actively trace email and status 
            under submitted request and promptly download the sent documentation and procedures according to the same. 
            Date of document delivery is considered the date when the competent authority sent the notification by name. 
            I am aware that due to incomplete and inaccurate data the request may be denied / rejected. 
            This statement is irrevocable and the beginning of giving this consent entered data may not be changed.
          </label>
        </div>
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-gray-100 pt-8">
        <button 
          className="bg-[#1a304e] text-white px-8 py-2.5 rounded-sm text-sm font-bold hover:bg-[#2c4765] transition-colors" 
          onClick={handlePrevious}
        >
          PREVIOUS STEP
        </button>
        
        <button 
          className={`px-8 py-2.5 rounded-sm text-sm font-bold transition-all shadow-sm ${
            formData.consent_accepted 
            ? "bg-[#2c4765] text-white hover:bg-[#1a304e]" 
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!formData.consent_accepted}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default FeeSection;