import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';



const Navbar = () => {
  return (
    <nav className="w-full bg-[#2c4765] flex justify-between items-center px-4 md:px-12 text-white font-sans border-t border-white/5">
      {/* Menu Links */}
      <div className="flex overflow-x-auto scrollbar-hide">
       <NavLink 
        to="/" 
        className={({ isActive }) => 
          `px-6 py-4 ${isActive ? 'bg-[#1a304e] border-b-4 border-blue-400' : ''}`
        }
      >
        Home page
      </NavLink>
      <NavLink 
        to="/_request_inde" 
        className={({ isActive }) => 
          `px-6 py-4 ${isActive ? 'bg-[#1a304e] border-b-4 border-blue-400' : ''}`
        }
      >
        Visa c
      </NavLink>

      <NavLink 
        to="/_request_index" 
        className={({ isActive }) => 
          `px-6 py-4 ${isActive ? 'bg-[#1a304e] border-b-4 border-blue-400' : ''}`
        }
      >
        Visa D
      </NavLink>

      <NavLink 
        to="/_myrequests_index" 
        className={({ isActive }) => 
          `px-6 py-4 ${isActive ? 'bg-[#1a304e] border-b-4 border-blue-400' : ''}`
        }
      >
        My requests
      </NavLink>
      </div>

      {/* Language Selection */}
      <div className="hidden md:flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest">
        <button className="opacity-70 hover:opacity-100 transition-opacity">Ћир</button>
        <span className="opacity-30">|</span>
        <button className="opacity-70 hover:opacity-100 transition-opacity">Lat</button>
        <span className="opacity-30">|</span>
        <button className="border-b-2 border-white pb-0.5">Eng</button>
      </div>
    </nav>
  );
};

export default Navbar;