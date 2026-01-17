import React from 'react';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* The Spinning Circle */}
      <div className="w-16 h-16 border-4 border-slate-200 border-t-[#007b3d] rounded-full animate-spin"></div>
      
      {/* Optional Loading Text */}
      <p className="mt-4 text-white font-bold tracking-wide uppercase">
        Processing Request...
      </p>
    </div>
  );
};

export default FullScreenLoader;