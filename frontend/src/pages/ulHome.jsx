import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { InfoBanner, SupportSection } from '../components/home/SupportSection'; 
import { Footer } from '../components/layout/Footer';
import Header from '../components/layout/Header';

const ULHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-white font-sans">
        <HeroSection />
        
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            
            {/* Left Side Title - "All eServices in one place" */}
            <div className="md:col-span-4">
              <h2 className="text-[38px] font-bold text-[#1a304e] leading-[1.1] tracking-tight">
                All eServices <br /> in one place
              </h2>
            </div>
            
            {/* Right Side Content - Two Sections with Blue Left Borders */}
            <div className="md:col-span-8 space-y-20">
              
              {/* For foreign citizens section */}
              <div className="border-l-[6px] border-[#5b96e0] pl-10">
                <h3 className="text-[28px] font-bold text-[#1a304e] mb-6">
                  For foreign citizens
                </h3>
                <p className="text-[#4a5568] text-lg leading-relaxed mb-8 max-w-2xl">
                  Apply for visa C, visa D or temporary residence approval in Republic of Serbia.
                  <br /><br />
                  List of available services will be presented after you login.
                </p>
                <div className="flex items-center gap-8">
                  <button className="bg-[#1a304e] text-white px-10 py-3 rounded-md font-bold text-sm hover:bg-[#2c4765] transition-colors uppercase tracking-wider">
                    Login
                  </button>
                  <button className="text-[#5b96e0] font-bold text-sm hover:underline uppercase tracking-wider">
                    Register an account
                  </button>
                </div>
              </div>

              {/* For companies in Republic of Serbia section */}
              <div className="border-l-[6px] border-[#5b96e0] pl-10">
                <h3 className="text-[28px] font-bold text-[#1a304e] mb-6">
                  For companies in Republic of Serbia
                </h3>
                <div className="text-[#4a5568] text-lg leading-relaxed space-y-4 mb-8 max-w-2xl">
                  <p>Apply if you wish to employ one or more foreign citizens.</p>
                  <p>eServices available for companies are group visa D and group temporary residence,</p>
                  <p>and unified permit for temporary residence and work.</p>
                  <p>To access eServices register on eGovernment Portal.</p>
                </div>
                <button className="bg-[#5b96e0] text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-[#4a85cf] transition-colors uppercase tracking-wider">
                  Open eGovernment Portal
                </button>
              </div>

            </div>
          </div>
          
          {/* Yellow Banner and Support Section */}
          <div className="mt-24 space-y-12">
            <InfoBanner />
            <SupportSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ULHome;