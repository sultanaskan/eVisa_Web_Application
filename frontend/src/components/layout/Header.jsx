import React, { useState } from 'react';
import logo from "../../assets/logo.svg";
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  // State to toggle the logout button visibility
  const [showLogout, setShowLogout] = useState(false);

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
      <div className="bg-white px-6 h-full flex items-center justify-center min-w-[150px] shadow-sm border-l border-gray-100">
        {user ? (
          <div className="flex items-center gap-3">
            {/* User Name as an invisible Button */}
            <button 
              onClick={() => setShowLogout(!showLogout)}
              className="text-[#1a304e] text-[11px] font-bold tracking-tight uppercase hover:opacity-70 transition-opacity focus:outline-none"
            >
              {user.fname} {user.lname}
            </button>

            {/* Logout Button - Appears after name when clicked */}
            {showLogout && (
              <button 
                onClick={logout}
                className="bg-red-50 text-red-600 border border-red-100 px-2 py-1 rounded-[2px] text-[10px] font-bold uppercase hover:bg-red-600 hover:text-white transition-all"
              >
                Logout
              </button>
            )}
          </div>
        ) : (
          /* Link to login if Guest */
          <Link 
            to="/login" 
            className="text-[#5b96e0] text-[11px] font-bold tracking-tight uppercase hover:text-[#1a304e] transition-colors"
          >
            Login / Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;