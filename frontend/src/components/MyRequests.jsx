import React from 'react';

const MyRequestList = () => {
  // Mock data based on the provided screenshot
  const requests = [
    {
      id: "320860",
      name: "MOHAMMAD HASAN",
      status: "Draft request",
      visaType: "Visa D",
      visId: "/"
    },
    {
      id: "355195",
      name: "MOHAMMAD HASAN",
      status: "Draft request",
      visaType: "Visa C",
      visId: "/"
    },
    {
      id: "355195",
      name: "MOHAMMAD HASAN",
      status: "Draft request",
      visaType: "Visa C",
      visId: "/"
    },
    {
      id: "355195",
      name: "MOHAMMAD HASAN",
      status: "Draft request",
      visaType: "Visa C",
      visId: "/"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-[#212529]">
      <h1 className="text-5xl font-bold text-[#1a304e] text-center mt-12 mb-20">
        List of previously sent requests
      </h1>

      <div className="space-y-0 border-t border-gray-200">
        {requests.map((req) => (
          <RequestRow key={req.id} request={req} />
        ))}
      </div>
    </div>
  );
};

const RequestRow = ({ request }) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-8 border-b border-gray-200 items-start">
    {/* Request Number */}
    <div>
      <h3 className="text-[#999] text-sm font-medium mb-1">Request number</h3>
      <p className="text-[#1a304e] font-bold text-lg">{request.id}</p>
    </div>

    {/* Name */}
    <div>
      <h3 className="text-[#999] text-sm font-medium mb-1">First and last name</h3>
      <p className="text-[#1a304e] font-bold text-lg leading-tight uppercase">
        {request.name}
      </p>
    </div>

    {/* Status */}
    <div>
      <h3 className="text-[#999] text-sm font-medium mb-1">Status</h3>
      <span className="bg-[#f0ad4e] text-white px-3 py-1 text-sm font-medium inline-block">
        {request.status}
      </span>
    </div>

    {/* Visa Type */}
    <div>
      <h3 className="text-[#999] text-sm font-medium mb-1">Visa</h3>
      <p className="text-[#1a304e] font-bold text-lg">{request.visaType}</p>
    </div>

    {/* Vis Id & Action */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-[#999] text-sm font-medium mb-1">Vis Id</h3>
        <p className="text-[#1a304e] font-bold text-lg">{request.visId}</p>
      </div>
      
      <button className="bg-[#2c4765] text-white px-6 py-3 rounded text-sm font-bold hover:bg-[#1a304e] transition-colors shadow-sm">
        Open Request
      </button>
    </div>
  </div>
);

export default MyRequestList;