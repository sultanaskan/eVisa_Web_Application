import React, { useState } from 'react';
import { User, CreditCard, Smartphone, Eye, EyeOff } from 'lucide-react'; // Using lucide-react for icons



const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('password'); // 'password', 'cert', or 'mobile'
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[500px] mx-auto bg-white shadow-sm border border-gray-200 mt-10">
      
    

      {/* 2. Form Content */}
      <div className="p-8 bg-[#f8faff]">
        {activeTab === 'password' && (
          <form className="space-y-6">
            <div className="flex flex-col items-center mb-6 text-slate-600">
              <div className="p-3 border-2 border-slate-400 rounded-full mb-2">
                <User size={32} />
              </div>
              <p className="text-sm text-center px-4">
                Login with a username and password is a basic security login. <a href="#" className="underline font-bold">Find out more.</a>
              </p>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Username:</label>
              <p className="text-xs text-slate-500 mb-2">(Email address used for registration)</p>
              <input 
                type="text" 
                className="w-full border border-slate-400 p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Password:</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full border border-slate-400 p-3 pr-16 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-4 text-xs font-bold text-slate-500 bg-gray-50 border-l border-slate-400 hover:bg-gray-100 uppercase"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#007b3d] text-white font-bold py-3 flex items-center justify-center gap-2 hover:bg-green-800 transition-colors uppercase">
              <span className="bg-white/20 p-1 rounded">
                <User size={16} />
              </span>
              Sign in
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-700 underline font-medium">Password forgotten</a>
            </div>
          </form>
        )}

        {/* Placeholders for other tabs */}
        {activeTab !== 'password' && (
          <div className="py-20 text-center text-slate-500">
            Authentication method for <strong>{activeTab}</strong> coming soon.
          </div>
        )}
      </div>

      {/* 3. Footer of the card */}
      <div className="p-6 text-center text-sm text-slate-700">
        Don't have an account at eid.gov.rs? <a href="/registe" className="underline font-bold">Register here.</a>
      </div>
    </div>
  );
};

// Sub-component for the Tabs to keep code clean
const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center justify-center p-4 text-[10px] md:text-xs font-medium border-r last:border-r-0 transition-colors
      ${active ? 'bg-[#1a365d] text-white' : 'bg-white text-slate-600 hover:bg-gray-50'}`}
  >
    <div className="mb-2">{icon}</div>
    <span className="text-center leading-tight uppercase">{label}</span>
  </button>
);

export default LoginForm;