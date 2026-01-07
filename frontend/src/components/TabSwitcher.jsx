import React from 'react';
import { User, CreditCard, Smartphone } from 'lucide-react';

const TabSwitcher = ({ activeTab, onTabChange }) => {
  // Define tabs in an array for easy maintenance
  const tabs = [
    { 
      id: 'password', 
      label: 'Username and password', 
      icon: <User size={24} strokeWidth={1.5} /> 
    },
    { 
      id: 'certificate', 
      label: 'Qualified electronic certificate', 
      icon: <CreditCard size={24} strokeWidth={1.5} /> 
    },
    { 
      id: 'mobile', 
      label: 'Mobile application', 
      icon: <Smartphone size={24} strokeWidth={1.5} /> 
    },
  ];

  return (
    <nav className="flex w-full border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex flex-col items-center justify-center p-4 min-h-[100px] transition-all duration-200 border-r last:border-r-0
            ${activeTab === tab.id 
              ? 'bg-[#1a365d] text-white' 
              : 'bg-white text-slate-500 hover:bg-gray-50'
            }`}
          aria-selected={activeTab === tab.id}
        >
          <div className={`mb-3 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>
            {tab.icon}
          </div>
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wide leading-tight text-center">
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default TabSwitcher;