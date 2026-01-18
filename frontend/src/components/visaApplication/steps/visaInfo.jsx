import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios.js';

const getInitialVisaState = () => {
  const saved = sessionStorage.getItem("visaInfoData");
  if (saved) return JSON.parse(saved);

  return {
    about_visa: {
      diplomatic_consular_post: "NEW DELHI",
      visa_type: "",
      travel_purpose: "",
      number_of_days_stay: "",
      currently_studying: "No",
      state_scholarship_approval: "No",
      date_of_entry: "",
      date_of_departure: "",
      means_of_staying: "",
      means_of_transport: "Airplane"
    },
    previous_stay: {
      previously_stayed_in_rs: "No",
      municipality: "",
      settlement: "",
      address: "",
      stay_period_until: "",
      basis_for_stay: ""
    },
    intended_residence: {
      host_name: "",
      street: "",
      house_number: "",
      municipality: ""
    }
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



const VisaInformationForm = ({step, setStep, visaType }) => {
  const { isAuthenticated } = useAuth();
  const [visaInfoData, setVisaInfoData] = useState(() => getInitialVisaState());
  const [visaRequest, setVisaRequest] = useState(() => getInitialReqState());

  //LoadVisaInfoFromServer
  useEffect(() => {
    const LoadVisaInfoFromServer =async () => {
      try{
      const res = await api.get(`/visa/visa-request/visa-informations/${visaRequest.visa_request_id}`);
      if(res?.data?.visa_information){
        setVisaInfoData(res.data.visa_information);
        sessionStorage.setItem("visaInfoData", JSON.stringify(res.data.visa_information));
        console.log("Visa information from server: ", res.data.visa_information);
      }
    }catch(error){
      console.error("Faild to load data from server:", error);
    }
    };
    LoadVisaInfoFromServer();
  }, [])




  // Handles deep nesting like "about_visa.travel_purpose"
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    setVisaInfoData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNext = async () => {
    if (!visaRequest?.visa_request_id) {
      return alert("Visa Request ID not found.");
    }
    try {
      const payload = { visa_information: visaInfoData };
      const res = await api.put(`/visa/visa-request/visa-informations/${visaRequest.visa_request_id}`, payload);
      if(res?.data?.visa_information){
        sessionStorage.setItem("visaInfoData", JSON.stringify(res.data.visa_information));
        setVisaInfoData(res.data.visa_information);
      }
      setStep(step + 1);
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving visa information.");
    }
  };

  if (!isAuthenticated) return <div className="p-6 text-center">Please log in to continue.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      {/* --- Section 1: About Visa --- */}
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Information about the visa</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
        <div className="space-y-4">
          <SelectGroup 
            label="Diplomatic Post" 
            name="about_visa.diplomatic_consular_post" 
            required 
            options={['NEW DELHI']} 
            value={visaInfoData.about_visa.diplomatic_consular_post} 
            onChange={handleChange} 
          />
          <InputGroup label="Visa Type" value={visaInfoData.about_visa.visa_type || visaType} name="abut_visa.visa_type" onChange={handleChange} />
          <InputGroup label="Purpose" name="about_visa.travel_purpose" value={visaInfoData.about_visa.travel_purpose} onChange={handleChange} />
          <InputGroup label="Days of Stay" name="about_visa.number_of_days_stay" type="number" required value={visaInfoData.about_visa.number_of_days_stay} onChange={handleChange} />
        </div>
        <div className="space-y-4">
          <InputGroup label="Date of Entry" name="about_visa.date_of_entry" type="date" required value={visaInfoData.about_visa.date_of_entry} onChange={handleChange} />
          <InputGroup label="Date of Departure" name="about_visa.date_of_departure" type="date" required value={visaInfoData.about_visa.date_of_departure} onChange={handleChange} />
          <InputGroup label="Means of Transport" name="about_visa.means_of_transport" value={visaInfoData.about_visa.means_of_transport} onChange={handleChange} />
        </div>
      </div>

      {/* --- Section 2: Previous Stay --- */}
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Previous stay in RS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
        <div className="space-y-4">
          <SelectGroup 
            label="Previously stayed?" 
            name="previous_stay.previously_stayed_in_rs" 
            options={['No', 'Yes']} 
            value={visaInfoData.previous_stay.previously_stayed_in_rs} 
            onChange={handleChange} 
          />
          <InputGroup label="Municipality" name="previous_stay.municipality" value={visaInfoData.previous_stay.municipality} onChange={handleChange} />
          <InputGroup label="Settlement" name="previous_stay.settlement" value={visaInfoData.previous_stay.settlement} onChange={handleChange} />
        </div>
        <div className="space-y-4">
          <InputGroup label="Address" name="previous_stay.address" value={visaInfoData.previous_stay.address} onChange={handleChange} />
          <InputGroup label="Stayed Until" name="previous_stay.stay_period_until" type="date" value={visaInfoData.previous_stay.stay_period_until} onChange={handleChange} />
          <InputGroup label="Basis for stay" name="previous_stay.basis_for_stay" value={visaInfoData.previous_stay.basis_for_stay} onChange={handleChange} />
        </div>
      </div>

      {/* --- Section 3: Intended Residence --- */}
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Intended residence</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
        <div className="space-y-4">
          <InputGroup label="Host Name" name="intended_residence.host_name" required value={visaInfoData.intended_residence.host_name} onChange={handleChange} />
          <InputGroup label="Street" name="intended_residence.street" required value={visaInfoData.intended_residence.street} onChange={handleChange} />
        </div>
        <div className="space-y-4">
          <InputGroup label="House Number" name="intended_residence.house_number" required value={visaInfoData.intended_residence.house_number} onChange={handleChange} />
          <InputGroup label="Municipality" name="intended_residence.municipality" required value={visaInfoData.intended_residence.municipality} onChange={handleChange} />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between border-t pt-8">
        <button className="bg-[#1a304e] text-white px-8 py-2 rounded text-sm" onClick={() => setStep(step - 1)}>
          Previous
        </button>
        <button className="bg-[#1a304e] text-white px-8 py-2 rounded text-sm" onClick={handleNext}>
          Next step
        </button>
      </div>
    </div>
  );
};

/* --- UI Helper Components --- */
const InputGroup = ({ label, required, type = "text", value, name, onChange, readOnly = false }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold mb-1 uppercase text-gray-700">{label}: {required && "*"}</label>
    <input 
      type={type} name={name} value={value || ""} onChange={onChange} readOnly={readOnly}
      className={`w-full border border-gray-300 p-2 text-sm rounded-sm ${readOnly ? 'bg-gray-100 italic' : 'bg-white'}`}
    />
  </div>
);

const SelectGroup = ({ label, required, options, value, name, onChange }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold mb-1 uppercase text-gray-700">{label}: {required && "*"}</label>
    <select name={name} value={value || ""} onChange={onChange} className="w-full border border-gray-300 p-2 text-sm rounded-sm bg-white">
      <option value="">Select...</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default VisaInformationForm;