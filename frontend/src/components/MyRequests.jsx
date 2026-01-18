import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

const MyRequestList = () => {
  const { user, isAuthenticated } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?._id) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/visa/visa-request/find-list/${user._id}`);
        
        // Target the specific array inside the response object
        if (response.data && response.data.visaRequestList) {
          setRequests(response.data.visaRequestList);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchRequests();
  }, [user, isAuthenticated]);

 
  if (!isAuthenticated) return <div className="p-20 text-center">Please log in.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-[#212529]">
      <h1 className="text-5xl font-bold text-[#1a304e] text-center mt-12 mb-20 tracking-tight">
        List of previously sent requests
      </h1>

      <div className="space-y-0 border-t border-gray-200">
        {loading ? (
          <div className="py-10 text-center text-gray-400 font-bold uppercase tracking-widest">Loading...</div>
        ) : requests.length > 0 ? (
          requests.map((req) => (
            <RequestRow key={req._id} request={req} />
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">No visa requests found.</div>
        )}
      </div>
    </div>
  );
};

const RequestRow = ({ request }) => {
  const navigate = useNavigate();

  //Handle open request
  const handleOpenRequest = () => {
    // 1. Clear any old draft data to prevent mixing applications

    // We use request.request_number based on your console log
    sessionStorage.setItem("visaRequest", JSON.stringify(request));

    
    // 4. Navigate based on the type found in the data
    const targetRoute = request.visa_type === "Type D" 
      ? "/_request_index_d" 
      : "/_request_index_c";

    navigate(targetRoute);
  };


  //Status Color
   const statusColors = {
    Draft: "bg-gray-800",    // Dark
    Pending: "bg-[#f0ad4e]", // Yellow
    Approved: "bg-green-600", // Green
    Rejected: "bg-red-600",   // Red
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-8 border-b border-gray-200 items-start hover:bg-gray-50 transition-colors px-2">
      <div>
        <h3 className="text-[#999] text-[11px] font-bold uppercase mb-1">Request number</h3>
        <p className="text-[#1a304e] font-bold text-lg">{request.request_number}</p>
      </div>

      <div>
        <h3 className="text-[#999] text-[11px] font-bold uppercase mb-1">Visa Number</h3>
        <p className="text-[#1a304e] font-bold text-lg">{request.visa_no || "N/A"}</p>
      </div>

      <div>
        <h3 className="text-[#999] text-[11px] font-bold uppercase mb-1">Status</h3>
        <span className={`${statusColors[request.status] || "bg-blue-500"}  bg-[#f0ad4e] text-white px-3 py-1 text-[11px] font-bold uppercase inline-block`}>
          {request.status}
        </span>
      </div>

      <div>
        <h3 className="text-[#999] text-[11px] font-bold uppercase mb-1">Visa Type</h3>
        <p className="text-[#1a304e] font-bold text-lg">{request.visa_type}</p>
      </div>

      <div className="flex justify-end items-center h-full">
        <button 
          onClick={handleOpenRequest}
          className="bg-[#2c4765] text-white px-5 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-wider hover:bg-[#1a304e] transition-all"
        >
          Open Request
        </button>
      </div>
    </div>
  );
};

export default MyRequestList;