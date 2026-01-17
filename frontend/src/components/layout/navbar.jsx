import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import your auth hook

const Navbar = () => {
  const { user } = useAuth(); // Access the user state

  // If there is no user logged in, return null (renders nothing)
  if (!user) {
    return null;
  }

  return (
    <nav className="w-full bg-[#2c4765] flex justify-between items-center px-4 md:px-12 text-white font-sans border-t border-white/5">
      {/* Menu Links */}
      <div className="flex overflow-x-auto scrollbar-hide">
        <NavLink 
          to="/home" 
          className={({ isActive }) => 
            `px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all ${
              isActive ? 'bg-[#1a304e] border-b-4 border-blue-400' : 'hover:bg-[#1a304e]/50'
            }`
          }
        >
          Home page
        </NavLink>
        
        <NavLink 
          to="/_request_index_c" 
          className={({ isActive }) => 
            `px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all ${
              isActive ? 'bg-[#1a304e] border-b-4 border-blue-400' : 'hover:bg-[#1a304e]/50'
            }`
          }
        >
          Visa c
        </NavLink>

        <NavLink 
          to="/_request_index_d" 
          className={({ isActive }) => 
            `px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all ${
              isActive ? 'bg-[#1a304e] border-b-4 border-blue-400' : 'hover:bg-[#1a304e]/50'
            }`
          }
        >
          Visa D
        </NavLink>

        <NavLink 
          to="/_myrequests_index" 
          className={({ isActive }) => 
            `px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all ${
              isActive ? 'bg-[#1a304e] border-b-4 border-blue-400' : 'hover:bg-[#1a304e]/50'
            }`
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