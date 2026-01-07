import React, { useState } from 'react';
import { Paperclip, Info, Smartphone } from 'lucide-react'; // Using lucide-react for icons

const DocumentSection = () => {
  const [autoReadConsent, setAutoReadConsent] = useState(false);

  return (
    <section className="space-y-6">
      {/* 1. Instructional Info Box */}
      <div className="bg-[#e7f6f8] border-l-4 border-[#00bcd4] p-4 flex items-start gap-4">
        <Info className="text-[#00bcd4] flex-shrink-0" size={20} />
        <div className="text-sm text-slate-700 leading-relaxed">
          <p className="font-bold mb-1">Find out who is eCitizen?</p>
          <p>
            Attach a read, scanned or photographed ID card or passport. If you attach your ID card, 
            you must take a photo and attach both sides. After uploading, the system will automatically 
            read the data and enter it into the registration form.
          </p>
          <a href="#" className="text-[#00bcd4] font-bold text-xs uppercase mt-2 block hover:underline">
            More details +
          </a>
        </div>
      </div>

      {/* 2. Automatic Data Read Consent */}
      <div className="flex items-start gap-3 p-2">
        <input 
          type="checkbox" 
          id="ocr-consent"
          checked={autoReadConsent}
          onChange={(e) => setAutoReadConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#1a365d]"
        />
        <label htmlFor="ocr-consent" className="text-xs text-slate-600 leading-tight">
          I agree to have the document automatically (machine) read. By having the attached document read, 
          the data on the registration form will be automatically filled in. Otherwise, you must enter the data manually.
        </label>
      </div>

      {/* 3. Attachment Area */}
      <div className="flex flex-col md:flex-row items-center gap-8 py-4">
        <div className="w-full md:w-1/2 space-y-4">
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-slate-300 py-3 px-4 bg-white hover:bg-gray-50 transition-colors text-slate-700 font-medium shadow-sm"
          >
            <Paperclip size={18} className="text-slate-400" />
            Attach documents
          </button>
          
          <div className="text-[11px] text-slate-500">
            <p>Maximum two documents, 3MB each.</p>
            <p>Allowed formats: <span className="font-bold text-slate-700">.png, .jpeg, .jpg</span></p>
          </div>
        </div>

        {/* Illustration Placeholder */}
        <div className="hidden md:flex flex-1 items-center justify-center border-l border-gray-100 pl-8">
          <div className="relative text-center">
            <Smartphone size={48} className="text-slate-300 mx-auto mb-2" />
            <p className="text-[10px] text-slate-400 max-w-[150px]">
              Instructions for preparing an identification document
            </p>
            <a href="#" className="text-red-600 text-[10px] font-bold hover:underline">Click here</a>
          </div>
        </div>
      </div>

      {/* 4. Identity Confirmation Warning */}
      <div className="flex items-start gap-2 text-red-700 text-[11px] font-medium leading-tight">
        <div className="bg-red-700 text-white rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 text-[10px]">!</div>
        <p>By submitting the document in electronic form, you confirm your identity.</p>
      </div>
    </section>
  );
};

export default DocumentSection;