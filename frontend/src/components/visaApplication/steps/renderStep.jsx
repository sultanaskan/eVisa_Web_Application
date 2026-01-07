
import TravelPurposeForm from "./travelPurpose";
import TravelDocsForm from './travelDocs';
import PersonalDataForm from "./personalData";
import VisaInformationForm from "./visaInfo";
import AddDocumentForm from "./addDoc";
import FeeSection from "./fees";


export default function  renderStep(step){
  switch (step) {
    case 0:
      return <TravelPurposeForm />;
    case 1:
      return <PersonalDataForm />;
    case 2:
      return <TravelDocsForm />;
    case 3:
      return <VisaInformationForm />;
    case 4:
      return <AddDocumentForm />;
    case 5:
      return <FeeSection />; // fallback
  };

};         