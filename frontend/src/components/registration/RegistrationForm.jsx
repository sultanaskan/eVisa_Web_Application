import React, { useState } from 'react';
import DocumentSection from './DocumentSection.jsx';
import FormInput from './FormInput.jsx';
import api from '../../api/axios.js'

export default function RegistrationForm(){
  
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    dType: '',
    passCountry: '',
    dNumber: '',
    dEDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });
  




  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }



  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      
      if(formData.password == formData.confirmPassword){
          const responce = await api.post(`/auth/register`, formData);
          localStorage.setItem('userInfo', JSON.stringify(responce?.data))    

         alert('Registration Successfull!' + JSON.parse(localStorage.getItem('userInfo')).fname);

         window.location.href ="/";
      }else{
        console.log("Password not mached")
        alert("Password matching error..");
      }    
    }catch(error){
      console.error('Registration Error: ', error.responce?.data || error.message);
      alert('Error: '+ (error.response?.data?.message || 'Submission failed'));
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-10 shadow-sm border border-gray-100">
      <form className="space-y-10">
        
        {/* Section 1: Document Instructions & Upload */}
        <DocumentSection />

        <hr className="border-slate-100" />

        {/* Section 2: Identity Details */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
            label="First name (Use English alphabet only)"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required />

            <FormInput 
            label="Last name (Use English alphabet only)"
            value={formData.lname}
            name='lname'
            onChange={handleChange}
            required />
            
            <FormInput 
            label="Document type" 
            name="dType"
            onChange={handleChange}
            value={formData.dType}
            type="select" 
            required />


            <FormInput
             label="Country that issued the passport"
              name="passCountry" 
              type="select" 
              value={formData.passCountry} 
              onChange={handleChange}
              required />

            <FormInput 
            label="Document number"
            name="dNumber" 
              value={formData.dNumber} 
              onChange={handleChange} 
            required />

            <FormInput 
            label="Document expiration date" 
             name="dEDate" 
              type="date" 
              value={formData.dEDate} 
              onChange={handleChange}
            required />

          </div>
        </section>

        {/* Section 3: Credentials */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Username and password</h3>
          <FormInput 
          label="User name" 
          sublabel="Enter your email address" 
          name="email"
          value= {formData.email}
          onChange={handleChange}
          required  />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
            label="Password" 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required />

            <FormInput 
            label="Password confirmation" 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required />
            
          </div>

          {/* Password Strength Meter */}
          <div className="flex gap-1 h-1.5 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 bg-slate-200 rounded-full"></div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">
            Password must contain 8-20 characters, uppercase, lowercase, number, and special character.
          </p>
        </div>


        {/* Section 4: Terms & Submission */}
        <div className="space-y-4">
          <label className="flex items-start gap-3 text-xs text-slate-600">
            <input type="checkbox" className="mt-1" />
            <span>I agree with the Terms of Use... and accept the Privacy Policy...</span>
          </label>
          
          <div className="flex justify-end">
            <button className="bg-[#1a365d] text-white px-8 py-3 font-bold flex items-center gap-2 hover:bg-slate-800 transition-all" onClick={handleSubmit}>
              Register <span className="text-xl">→</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};