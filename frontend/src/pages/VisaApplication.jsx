import React, { useState } from 'react';
import Header from '../components/layout/Header.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { RadioOption } from '../components/visaApplication/ui/radioOption.jsx';
import {Stepper} from '../components/visaApplication/ui/Stepper.jsx'
import Navbar from '../components/layout/navbar.jsx';
import TravelPurpose from '../components/visaApplication/steps/travelPurpose.jsx';
import renderStep from '../components/visaApplication/steps/renderStep.jsx';
import { SteperAction } from '../components/visaApplication/ui/Stepper.jsx';

const VisaApplication = () => {
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState(null);

  const options = [
    "Employment on the grounds of an employment contract...",
    "Enrolled in the registration decision (self-employment)",
    "Movement within the company",
    "Accredited foreign journalist"
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col">
      <Header />
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
          Application for visa type D
        </h1>
        
        <Stepper currentStep={step} />

        <section className="bg-white p-8 shadow-sm border border-gray-100 mt-10">
          <div>
              {renderStep(step)}
          </div>
          <div className="flex justify-end mt-12">
            <SteperAction step={step} setStep={setStep}/>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VisaApplication;