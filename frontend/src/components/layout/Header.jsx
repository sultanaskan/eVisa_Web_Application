import React from 'react';
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <div className="w-full bg-[#1a304e] h-14 flex justify-between items-center px-4 md:px-12 font-sans">
      {/* Logo Section */}
      <div className="flex items-center h-full py-2">
        <div className="flex items-center space-x-2 border-r border-white/20 pr-4">
          <img 
            src={logo} 
            alt="Welcome to Serbia" 
            className="h-10"
          />
        </div>
      </div>

      {/* User Identity / Account Box */}
      <div className="bg-white px-6 h-full flex items-center justify-center min-w-[150px] shadow-sm">
        <span className="text-gray-700 text-[11px] font-bold tracking-tight uppercase">
          MOHAMadMsdfgAD HA...
        </span>
      </div>
    </div>
  );
};

export default Header;