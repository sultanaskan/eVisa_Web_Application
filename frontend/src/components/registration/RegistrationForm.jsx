import React from 'react';
import DocumentSection from './DocumentSection.jsx';
import FormInput from './FormInput.jsx';
import CredentialsSection from './CredentialsSection.jsx';

export default function RegistrationForm(){
  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-10 shadow-sm border border-gray-100">
      <form className="space-y-10">
        
        {/* Section 1: Document Instructions & Upload */}
        <DocumentSection />

        <hr className="border-slate-100" />

        {/* Section 2: Identity Details */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="First name (Use English alphabet only)" required />
            <FormInput label="Last name (Use English alphabet only)" required />
            <FormInput label="Document type" type="select" required />
            <FormInput label="Country that issued the passport" type="select" required />
            <FormInput label="Document number" required />
            <FormInput label="Document expiration date" type="date" required />
          </div>
        </section>

        {/* Section 3: Credentials */}
        <CredentialsSection />

        {/* Section 4: Terms & Submission */}
        <div className="space-y-4">
          <label className="flex items-start gap-3 text-xs text-slate-600">
            <input type="checkbox" className="mt-1" />
            <span>I agree with the Terms of Use... and accept the Privacy Policy...</span>
          </label>
          
          <div className="flex justify-end">
            <button className="bg-[#1a365d] text-white px-8 py-3 font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
              Register <span className="text-xl">→</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};