import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios.js';

const getInitialPersonalState = () => {
  const saved = sessionStorage.getItem("personalData");
  if (saved){
     return JSON.parse(saved);
  }
  return {
    personal_information: {
    first_name: "",
    last_name: "",
    birth_name: "",
    present_nationality: "",
    nationality_at_birth: "",
    gender: "",
    place_of_birth: "",
    country_of_birth: "",
    date_of_birth: "",
    marital_status: "",
    travel_document_type: "Ordinary Passport",
    travel_document_number: "",
    issued_by_country: "",
    issued_by_authority: "",
    family_data: {
      spouse_first_name: "",
      spouse_last_name: "",
      spouse_birth_name: "",
      spouse_nationality: "",
      spouse_place_of_birth: "",
      spouse_country_of_birth: "",
      child_first_name: "",
      child_last_name: "",
      child_birth_name: "",
      child_date_of_birth: "",
      child_place_of_birth: ""
    },
    employment_information: {
      current_occupation: "",
      employer_name: "",
      employer_address: "",
      employer_phone: ""
    }
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

const PersonalDetail = ({ step, setStep }) => {
  const { isAuthenticated, user } = useAuth();
  const [personalData, setPersonalData] = useState(() => getInitialPersonalState());
  const [visaRequest, setVisaRequest] = useState(() => getInitialReqState());

  // Boolean flags for UI toggles only (not sent to DB directly)
  const [hasSpouse, setHasSpouse] = useState(!!personalData.personal_information.family_data.spouse_first_name);
  const [hasChildren, setHasChildren] = useState(!!personalData.personal_information.family_data.child_first_name);



  //Load personal data from servper 
  useEffect( ()  => {
    const FetchPersonalData = async ()  => {
      if(!visaRequest._id) return;
      try{
        const res = await api.get(`/visa/visa-request/personal-details/${visaRequest._id}`);
        if(res?.data?.personal_information){
         sessionStorage.setItem("personalData", JSON.stringify(res.data))
         setPersonalData(res.data);
        }
      }catch(error){
        console.error("Faild to load personal data, "+ error)
      }
    };
    FetchPersonalData();
  } , [])





  const handleLocalChange = (e) => {
  const { name, value, type, checked } = e.target;
  const finalValue = type === 'checkbox' ? checked : value;

  setPersonalData((prev) => {
    const keys = name.split('.'); // Splits "personal_information.family_data.spouse_first_name"
    
    // Create a deep copy of the state
    const newState = { ...prev };
    let current = newState;

    // Traverse the object keys except for the last one
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      // Ensure the nested object exists
      current[key] = { ...current[key] };
      // Move deeper into the tree
      current = current[key];
    }

    // Set the value on the final key
    current[keys[keys.length - 1]] = finalValue;

    return newState;
  });
};

  const handleNext = async () => {
    if (!visaRequest?.visa_request_id) {
      return alert("Visa Request ID not found. Please go back to Step 1.");
    }

    try {
      // We wrap the state in the "personal_information" key as per your required schema
      console.log(`Personal Data befor sabing to  server: ${(personalData)}`);
      console.log(personalData);
      await api.put(`/visa/visa-request/personal-details/${visaRequest._id}`,personalData);
      sessionStorage.setItem("personalData", JSON.stringify(personalData));
      setStep(step + 1);
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving data.");
    }
  };

  if (!isAuthenticated) return <div className="p-6 text-center">Please log in to continue.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Personal information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="space-y-4">
          <InputGroup label="First name" name="personal_information.first_name" required value={personalData.personal_information.first_name} onChange={handleLocalChange} />
          <InputGroup label="Last name" name="personal_information.last_name" required value={personalData.personal_information.last_name} onChange={handleLocalChange} />
          <InputGroup label="Birth name" name="personal_information.birth_name" value={personalData.personal_information.birth_name} onChange={handleLocalChange} />
          <SelectGroup label="Gender" name="personal_information.gender" required options={['Male', 'Female']} value={personalData.personal_information.gender} onChange={handleLocalChange} />
          <InputGroup label="Date of birth" name="personal_information.date_of_birth" required type="date" value={personalData.personal_information.date_of_birth} onChange={handleLocalChange} />
          <SelectGroup label="Country of birth" name="personal_information.country_of_birth" required options={['Bangladesh', 'Serbia', 'USA']} value={personalData.personal_information.country_of_birth} onChange={handleLocalChange} />
          <InputGroup label="Place of birth" name="personal_information.place_of_birth" required value={personalData.personal_information.place_of_birth} onChange={handleLocalChange} />
        </div>

        <div className="space-y-4">
          <SelectGroup label="Present Nationality" name="personal_information.present_nationality" required options={['Bangladesh']} value={personalData.personal_information.present_nationality} onChange={handleLocalChange} />
          <InputGroup label="Nationality at birth" name="personal_information.nationality_at_birth" value={personalData.personal_information.nationality_at_birth} onChange={handleLocalChange} />
          <SelectGroup label="Marital status" name="personal_information.marital_status" required options={['Single', 'Married', 'Divorced', 'Widowed']} value={personalData.personal_information.marital_status} onChange={handleLocalChange} />
          <SelectGroup label="Travel Doc Type" name="personal_information.travel_document_type" options={['Ordinary Passport', 'Diplomatic']} value={personalData.personal_information.travel_document_type} onChange={handleLocalChange} />
          <InputGroup label="Travel Doc Number" name="personal_information.travel_document_number" required value={personalData.personal_information.travel_document_number} onChange={handleLocalChange} />
          <InputGroup label="Issued by Country" name="personal_information.issued_by_country" value={personalData.personal_information.issued_by_country} onChange={handleLocalChange} />
          <InputGroup label="Issued by Authority" name="personal_information.issued_by_authority" value={personalData.personal_information.issued_by_authority} onChange={handleLocalChange} />
        </div>
      </div>

      {/* --- FAMILY DATA --- */}
      <div className="mt-12 bg-[#f8f9fa] p-6 rounded-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-6 text-[#1a304e]">Family data</h3>
        <div className="space-y-6">
          <CheckboxGroup label="Do you have a spouse?" checked={hasSpouse} onChange={(e) => setHasSpouse(e.target.checked)} />
          {hasSpouse && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8 border-l-2 border-blue-200">
              <InputGroup label="Spouse First Name" name="personal_information.family_data.spouse_first_name" value={personalData.personal_information.family_data.spouse_first_name} onChange={handleLocalChange} />
              <InputGroup label="Spouse Last Name" name="personal_information.family_data.spouse_last_name" value={personalData.personal_information.family_data.spouse_last_name} onChange={handleLocalChange} />
              <InputGroup label="Spouse Birth Name" name="personal_information.family_data.spouse_birth_name" value={personalData.personal_information.family_data.spouse_birth_name} onChange={handleLocalChange} />
              <InputGroup label="Spouse Nationality" name="personal_information.family_data.spouse_nationality" value={personalData.personal_information.family_data.spouse_nationality} onChange={handleLocalChange} />
            </div>
          )}

          <CheckboxGroup label="Do you have children?" checked={hasChildren} onChange={(e) => setHasChildren(e.target.checked)} />
          {hasChildren && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8 border-l-2 border-blue-200">
              <InputGroup label="Child First Name" name="personal_information.family_data.child_first_name" value={personalData.personal_information.family_data.child_first_name} onChange={handleLocalChange} />
              <InputGroup label="Child Last Name" name="personal_information.family_data.child_last_name" value={personalData.personal_information.family_data.child_last_name} onChange={handleLocalChange} />
              <InputGroup label="Child DOB" name="personal_information.family_data.child_date_of_birth" type="date" value={personalData.personal_information.family_data.child_date_of_birth} onChange={handleLocalChange} />
            </div>
          )}
        </div>
      </div>

      {/* --- EMPLOYMENT --- */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6 text-[#1a304e]">Employment information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup label="Current Occupation" name="personal_information.employment_information.current_occupation" value={personalData.personal_information.employment_information.current_occupation} onChange={handleLocalChange} />
          <InputGroup label="Employer Name" name="personal_information.employment_information.employer_name" value={personalData.personal_information.employment_information.employer_name} onChange={handleLocalChange} />
          <InputGroup label="Employer Address" name="personal_information.employment_information.employer_address" value={personalData.personal_information.employment_information.employer_address} onChange={handleLocalChange} />
          <InputGroup label="Employer Phone" name="personal_information.employment_information.employer_phone" value={personalData.personal_information.employment_information.employer_phone} onChange={handleLocalChange} />
        </div>
      </div>

      <div className="mt-10 flex justify-between pt-6 border-t border-gray-100">
        <button className="bg-[#2c4765] text-white px-10 py-2 rounded-sm" onClick={() => setStep(step - 1)}>Previous</button>
        <button className="bg-[#2c4765] text-white px-10 py-2 rounded-sm" onClick={handleNext}>Next step</button>
      </div>
    </div>
  );
};

/* --- UI Helper Components --- */
const InputGroup = ({ label, required, type = "text", value, name, onChange }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold mb-1 uppercase text-gray-600">{label} {required && "*"}</label>
    <input type={type} name={name} value={value || ""} onChange={onChange} className="border border-gray-300 p-2 text-sm rounded-sm bg-white focus:ring-1 focus:ring-blue-400 outline-none" />
  </div>
);

const SelectGroup = ({ label, required, options, value, name, onChange }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold mb-1 uppercase text-gray-600">{label} {required && "*"}</label>
    <select name={name} value={value || ""} onChange={onChange} className="border border-gray-300 p-2 text-sm rounded-sm bg-white focus:ring-1 focus:ring-blue-400 outline-none">
      <option value="" disabled>Select...</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const CheckboxGroup = ({ label, checked, onChange }) => (
  <div className="flex items-center gap-3">
    <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4" />
    <span className="text-sm font-bold text-gray-700 uppercase">{label}</span>
  </div>
);

export default PersonalDetail;