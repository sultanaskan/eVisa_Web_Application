import React, { useState } from 'react';
import DocumentSection from './DocumentSection.jsx';
import FormInput from './FormInput.jsx';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import FullScreenLoader from '../FullScreenLooder.jsx';

export default function RegistrationForm() {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  
  // Use state instead of a 'var' so the UI re-renders when loading changes
  const [loading, setLoading] = useState(false);
  
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Check passwords before even calling the API
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);

    try {
      // 2. The api.post will now work because we fixed axios.js
      const response = await api.post('/auth/register', formData);
      
      alert("Registration successful! \nYou can login now.");
      navigate('/login'); 

    } catch (error) {
      console.error("Registration Error:", error);

      // Check if the error is from the server response
      if (error.response) {
        // The server responded with a status code (400, 401, 500, etc)
        const serverMessage = error.response.data?.message || "Server rejected registration.";
        alert(`Error: ${serverMessage}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert("Network Error: Could not reach the server. Please check your connection.");
      } else {
        // Something else happened in setting up the request
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-10 shadow-sm border border-gray-100">
      {/* Link handleSubmit to the form onSubmit */}
      <form className="space-y-10" onSubmit={handleSubmit}>
        
        {/* Full screen loader shows when loading is true */}
        {loading && <FullScreenLoader />}
        
        <DocumentSection />

        <hr className="border-slate-100" />

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="First name (Use English alphabet only)"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required 
            />

            <FormInput 
              label="Last name (Use English alphabet only)"
              name='lname'
              value={formData.lname}
              onChange={handleChange}
              required 
            />
            
            <FormInput 
              label="Document type" 
              name="dType"
              type="select" 
              value={formData.dType}
              onChange={handleChange}
              required 
            />

            <FormInput
              label="Country that issued the passport"
              name="passCountry" 
              type="select" 
              value={formData.passCountry} 
              onChange={handleChange}
              required 
            />

            <FormInput 
              label="Document number"
              name="dNumber" 
              value={formData.dNumber} 
              onChange={handleChange} 
              required 
            />

            <FormInput 
              label="Document expiration date" 
              name="dEDate" 
              type="date" 
              value={formData.dEDate} 
              onChange={handleChange}
              required 
            />
          </div>
        </section>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Username and password</h3>
          <FormInput 
            label="User name" 
            sublabel="Enter your email address" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required  
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="Password" 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />

            <FormInput 
              label="Password confirmation" 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="flex gap-1 h-1.5 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 bg-slate-200 rounded-full"></div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500">
            Password must contain 8-20 characters, uppercase, lowercase, number, and special character.
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-start gap-3 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" className="mt-1" required />
            <span>I agree with the Terms of Use and accept the Privacy Policy.</span>
          </label>
          
          <div className="flex justify-end">
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#1a365d] text-white px-8 py-3 font-bold flex items-center gap-2 hover:bg-slate-800 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"} <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}