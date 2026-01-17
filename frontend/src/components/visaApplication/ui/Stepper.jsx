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


}