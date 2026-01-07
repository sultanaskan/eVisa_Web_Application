import React, { useState } from 'react';

const AddDocumentForm = () => {
  const [files, setFiles] = useState({});

  const requiredDocs = [
    { id: 'passport', label: 'Copy of travel document (Passport)', description: 'Color scan of the data page.' },
    { id: 'photo', label: 'Photo', description: 'Recent passport-size color photo.' },
    { id: 'insurance', label: 'Health Insurance', description: 'Proof of health insurance for the period of stay.' },
    { id: 'employment', label: 'Proof of employment', description: 'Employment contract or certificate of employment.' }
  ];

  const handleFileChange = (id, fileName) => {
    setFiles(prev => ({ ...prev, [id]: fileName }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-4 text-[#1a304e]">Add documents</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> Only PDF, JPG, or PNG files are allowed. Maximum file size per document is 2MB. 
          Please ensure all scans are clear and readable.
        </p>
      </div>

      <div className="space-y-6">
        {requiredDocs.map((doc) => (
          <div key={doc.id} className="border border-gray-200 rounded-sm p-5 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <label className="text-[13px] font-bold uppercase tracking-tight text-[#1a304e] flex items-center gap-2">
                  {doc.label} <span className="text-red-500">*</span>
                  <div className="w-4 h-4 rounded-full bg-[#d4af37] opacity-80" title="Help"></div>
                </label>
                <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
              </div>

              <div className="flex items-center gap-3">
                {files[doc.id] ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate max-w-[150px]">{files[doc.id]}</span>
                    <button 
                      onClick={() => handleFileChange(doc.id, null)}
                      className="text-red-500 text-xs hover:underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer bg-white border border-[#2c4765] text-[#2c4765] px-4 py-2 text-xs font-bold uppercase hover:bg-gray-50 transition-colors rounded-sm">
                    Upload File
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.id, e.target.files[0]?.name)}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-4 border-t border-gray-100 flex justify-between items-center">
        <p className="text-[11px] text-gray-400 italic font-medium uppercase">
          Step 5 of 6: Documents Upload
        </p>
        <div className="flex gap-4">
          <button className="bg-[#1a304e] text-white px-8 py-2 rounded text-sm font-semibold hover:bg-[#2c4765] transition-colors">
            Previous step
          </button>
          <button className="bg-[#1a304e] text-white px-8 py-2 rounded text-sm font-semibold hover:bg-[#2c4765] transition-colors">
            Next step
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentForm;