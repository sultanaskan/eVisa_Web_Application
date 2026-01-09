import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { InfoBanner, SupportSection } from '../components/home/SupportSection'; 
import { ServiceCards } from '../components/home/ServiceCards';
import { Footer } from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/navbar';

const ulHome = () => {
  return (
    <div>
    <Header/>
    <Navbar/>
        <div className="w-full bg-white font-sans min-h-screen">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left Side Title */}
            <div className="md:col-span-4">
                <h2 className="text-[40px] font-bold text-[#1a304e] leading-tight">
                Available services
                </h2>
            </div>
            
            {/* Right Side Cards */}
            <div className="md:col-span-8 border-l-4 border-[#5b96e0] pl-8">
                <ServiceCards />
            </div>
            </div>
            
            <InfoBanner />
            <SupportSection />
        </div>
        </div>
        <Footer/>
    </div>
  );
};

export default ulHome;