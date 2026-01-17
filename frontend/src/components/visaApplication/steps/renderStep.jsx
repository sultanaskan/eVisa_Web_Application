
import TravelPurposeForm from "./travelPurpose";
import TravelDocsForm from './travelDocs';
import PersonalDataForm from "./personalData";
import VisaInformationForm from "./visaInfo";
import AddDocumentForm from "./addDoc";
import FeeSection from "./fees";
import VisaFees from "./visaFee";

export default function  renderStep(step, setStep, visaType){
  switch (step) {
    case 0:
      return <TravelPurposeForm step={step} setStep={setStep} visaType={visaType} />;
    case 1:
      return <PersonalDataForm  step={step} setStep={setStep} visaType={visaType} />;
    case 2:
      return <TravelDocsForm   step={step} setStep={setStep} visaType={visaType} />;
    case 3:
      return <VisaInformationForm  step={step} setStep={setStep} visaType={visaType}/>;
    case 4:
      return <AddDocumentForm  step={step} setStep={setStep} visaType={visaType}/>;
    case 5:
      return <FeeSection  step={step} setStep={setStep} visaType={visaType}/>
    case 6:
      return <VisaFees step={step} setStep={setStep} visaType={visaType} />; // fallback
  };

};         