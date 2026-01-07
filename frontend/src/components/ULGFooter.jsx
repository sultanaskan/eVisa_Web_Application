import React from 'react';

const ULGFooter = () => {
  return (
    <footer className="w-full bg-white py-12 px-6 md:px-24 border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-6">
        
        {/* Left Side: Official Coat of Arms */}
        <div className="flex-shrink-0">
          {/* Replace with actual .png or .svg of the Serbian Coat of Arms */}
          <img 
            src="/serbian-coat-of-arms.png" 
            alt="Republic of Serbia" 
            className="w-16 h-auto"
          />
        </div>

        {/* Right Side: Text Information */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-700">eid.gov.rs</h2>
            <p className="text-slate-500 text-sm font-medium">Electronic identification portal</p>
          </div>

          <div className="max-w-2xl">
            <p className="text-xs text-gray-400 leading-relaxed">
              The website is licensed under the terms of the license Creative Commons 
              Attribution – Non Commercial – No Derivatives 3.0 Serbia. 
              Web project <a href="https://ite.gov.rs" className="hover:underline font-semibold text-gray-500">ite.gov.rs</a>
            </p>
          </div>

          <nav className="flex gap-6 mt-2">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Terms of use
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default ULGFooter;