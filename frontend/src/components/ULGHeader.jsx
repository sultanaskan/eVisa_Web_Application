import React from 'react';

export default function ULGHeader() {
  return (
    <header className="w-full border-b border-gray-200 bg-white py-3 px-6 md:px-12 flex items-center justify-between">
      {/* Left Side: Logo and Portal Name */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          {/* SVG Logo Placeholder */}
          <div className="w-10 h-10 border-2 border-slate-700 rounded-full flex items-center justify-center">
            <span className="text-xl font-serif font-bold text-slate-800">e</span>
          </div>
          <div className="h-0.5 w-full bg-red-600 mt-1"></div>
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-slate-800 leading-tight">
            eID.gov.rs
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Electronic identification portal
          </p>
        </div>
      </div>

      {/* Right Side: Burger Menu */}
      <button 
        className="w-10 h-10 rounded-full border border-gray-300 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors"
        aria-label="Menu"
      >
        <span className="w-5 h-0.5 bg-slate-600"></span>
        <span className="w-5 h-0.5 bg-slate-600"></span>
        <span className="w-5 h-0.5 bg-slate-600"></span>
      </button>
    </header>
  );
};
