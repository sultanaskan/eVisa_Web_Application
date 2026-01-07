// components/ui/Stepper.jsx
const steps = ["Travel purpose", "Personal data", "Travel documents", "Visa information", "Add documents", "Fees"];

export const Stepper = ({ currentStep }) => (
  <div className="flex items-center justify-between w-full max-w-4xl mx-auto my-12 relative">
    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />
    {steps.map((label, index) => (
      <div key={label} className="flex flex-col items-center gap-2">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] 
          ${index <= currentStep ? 'bg-blue-500 text-white' : 'bg-white border-2 border-blue-400 text-blue-400'}`}>
          {index + 1}
        </div>
        <span className={`text-[10px] text-center w-20 leading-tight ${index === currentStep ? 'font-bold' : 'text-gray-400'}`}>
          {label}
        </span>
      </div>
    ))}
  </div>
);



export function SteperAction({step, setStep}){

  function next(){
    if((step >= 0) && (step <= 5)){
      setStep(step+1);
      console.log(`step: ${step}`)
    }
  }

  function pre(){
    if((step >= 0) && (step <= 5)){
      setStep(step-1);
      console.log(`step: ${step}`)
    }
  }

  function submit(){
    console.log("Subition button clicked")
  }


  return(
      <div className="flex justify-between items-center pt-6 border-t border-gray-100">
        <button className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded text-xs font-bold uppercase hover:bg-gray-300 transition-colors" onClick={pre}>
          Previous step
        </button>
        <button className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded text-xs font-bold uppercase hover:bg-gray-300 transition-colors" onClick={next}>
          Next step
        </button>
        () (<button className="bg-[#1a304e] text-white px-12 py-2.5 rounded text-xs font-bold uppercase hover:bg-[#2c4765] transition-all shadow-md active:transform active:scale-95" onClick={submit}>
          Submit application & Pay
        </button>)
      </div>
  )
}