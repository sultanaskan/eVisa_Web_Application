import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios.js';


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


const AddDocumentForm = ({ step, setStep }) => {
  const { isAuthenticated } = useAuth();
  
  // 1. Core State: Holds filenames and storage URLs
  const [documents, setDocuments] = useState(() => {
    const saved = sessionStorage.getItem("visa_docs_meta");
    return saved ? JSON.parse(saved) : {
      photography: null,
      scanned_travel_document: null,
      invitation_letter: null,
      ministry_accreditation: null,
      additional_document_1: null,
      additional_document_2: null,
      additional_document_3: null,
      additional_document_4: null,
      additional_document_5: null,
    };
  });

  // 2. State for live files to be uploaded
  const [filesToUpload, setFilesToUpload] = useState({});
  const [previews, setPreviews] = useState({});
  const [visaRequest] = useState(() => getInitialReqState());
  
  // Load previews from sessionStorage/Server URLs on mount
 useEffect(() => {
  const syncDocuments = async () => {
    // 1. Check if we already have data in our 'documents' state
    const hasExistingData = Object.values(documents).some(doc => doc?.url);
    if (!hasExistingData && visaRequest?.visa_request_id) {
      try {
        // 2. Single API call to get all documents for this ID
        const result = await api.get(`/visa/visa-request/documents/${visaRequest.visa_request_id}`);
        if (result.data && result.data.documents) {
          const serverDocs = result.data.documents;
          // 3. Update the metadata state (documents)
          setDocuments(serverDocs);
          // 4. Update the preview state (previews)
          const newPreviews = {};
          Object.keys(serverDocs).forEach(key => {
            if (serverDocs[key]?.url) {
              newPreviews[key] = serverDocs[key].url;
            }
          });
          setPreviews(newPreviews);
          // 5. Keep sessionStorage in sync
          sessionStorage.setItem("visa_docs_meta", JSON.stringify(serverDocs));
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    } else {
      // 6. If we ALREADY had data in state, just build the previews from that
      const existingPreviews = {};
      Object.keys(documents).forEach(key => {
        if (documents[key]?.url) {
          existingPreviews[key] = documents[key].url;
        }
      });
      setPreviews(existingPreviews);
    }
  };
  syncDocuments();
}, [visaRequest?.visa_request_id]); // Run when the ID is available



  useEffect(()=>{
    const loadDocsFromServer = async () =>{
      if(visaRequest.visa_request_id){
        const res = api.get(`/visa/visa-request/documents/${visaRequest.visa_request_id}`);
      }
    }
  })





  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Save to local upload queue
    setFilesToUpload(prev => ({ ...prev, [field]: file }));
    // Update metadata state
    const updatedMeta = {
      ...documents,
      [field]: { name: file.name, size: file.size, lastModified: file.lastModified, isPending: true }
    };
    setDocuments(updatedMeta);
  
    // Save metadata to sessionStorage before submit
    sessionStorage.setItem("visa_docs_meta", JSON.stringify(updatedMeta));

    // Generate UI Preview
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [field]: url }));
    } else {
      setPreviews(prev => ({ ...prev, [field]: 'pdf_icon' }));
    }
  };

  const handleNext = async () => {
    if (!visaRequest?.visa_request_id ) return alert("Visa Request ID not found.");
    const pendingKeys = Object.keys(filesToUpload);
    if (pendingKeys.length > 0) {
      const formData = new FormData();
      pendingKeys.forEach(key => formData.append(key, filesToUpload[key]));

      try {
        const response = await api.put(`/visa/visa-request/documents/${visaRequest.visa_request_id}`, 
          formData, 
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        // Update sessionStorage with permanent URLs from server
        const finalDocs = { ...documents };
        // Assuming response returns { links: { photography: "http://..." } }
        Object.keys(response.data.links || {}).forEach(key => {
          finalDocs[key] = {
            ...finalDocs[key],
            url: response.data.links[key],
            isPending: false
          };
        });

        sessionStorage.setItem("visa_docs_meta", JSON.stringify(finalDocs));
        setDocuments(finalDocs);
        setStep(step + 1);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      }
    } else {
      setStep(step + 1);
    }
  };

  const allDocs = [
    { id: 'photography', label: 'Photography', req: true, hint: '.jpg, .png' },
    { id: 'scanned_travel_document', label: 'National travel document', req: true, hint: '.pdf, .jpg' },
    { id: 'invitation_letter', label: 'Invitation letter', req: true, hint: '.pdf' },
    { id: 'ministry_accreditation', label: 'Accreditation of the ministry', req: false, hint: '.pdf' },
    { id: 'additional_document_1', label: 'Additional document 1', req: false, hint: '.pdf, .jpg' },
    { id: 'additional_document_2', label: 'Additional document 2', req: false, hint: '.pdf, .jpg' },
    { id: 'additional_document_3', label: 'Additional document 3', req: false, hint: '.pdf, .jpg' },
    { id: 'additional_document_4', label: 'Additional document 4', req: false, hint: '.pdf, .jpg' },
    { id: 'additional_document_5', label: 'Additional document 5', req: false, hint: '.pdf, .jpg' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-4 text-[#1a304e]">Documents</h2>
      
      {/* Visual Preview Slots */}
      <div className="flex gap-4 mb-12">
        <PreviewSlot label="PHOTO" src={previews.photography} />
        <PreviewSlot label="PASSPORT" src={previews.scanned_travel_document} dark={false} />
      </div>

      <div className="space-y-6">
        {allDocs.map((doc) => (
          <div key={doc.id} className="flex flex-col">
            <label className="text-[11px] font-bold text-[#1a304e] mb-1.5 uppercase">
              {doc.label} {doc.req && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center max-w-xl">
              <div className="flex-1 border border-gray-300 rounded-l-sm bg-[#f1f1f1] h-10 px-3 text-sm text-gray-500 italic flex items-center truncate">
                {documents[doc.id]?.name || "No file selected"}
              </div>
              <label className="cursor-pointer bg-[#f8f9fa] border border-gray-300 border-l-0 px-5 h-10 flex items-center text-sm font-bold text-gray-700 hover:bg-gray-200 rounded-r-sm transition-colors">
                Select file
                <input type="file" className="hidden" onChange={(e) => handleFileChange(doc.id, e)} />
              </label>
            </div>
            {documents[doc.id]?.url && (
              <a href={documents[doc.id].url} target="_blank" rel="noreferrer" className="text-blue-600 text-[10px] font-bold mt-1 underline">
                View Uploaded Document
              </a>
            )}
            <p className="text-[10px] text-gray-400 mt-1">{doc.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between pt-6 border-t">
        <button className="bg-[#1a304e] text-white px-10 py-2 rounded-sm text-sm" onClick={() => setStep(step - 1)}>
          Previous
        </button>
        <button className="bg-[#1a304e] text-white px-10 py-2 rounded-sm text-sm" onClick={handleNext}>
          Next Step
        </button>
      </div>
    </div>
  );
};

const PreviewSlot = ({ label, src, dark = true }) => (
  <div className={`w-40 h-40 border-2 shadow-sm flex items-center justify-center overflow-hidden ${dark ? 'bg-[#1e293b] border-white' : 'bg-white border-gray-200'}`}>
    {src && src !== 'pdf_icon' ? (
      <img src={src} className="w-full h-full object-cover" alt="preview" />
    ) : (
      <span className={`text-[9px] font-bold ${dark ? 'text-white/30' : 'text-gray-400'}`}>
        {src === 'pdf_icon' ? 'PDF ATTACHED' : `${label} PREVIEW`}
      </span>
    )}
  </div>
);

export default AddDocumentForm;