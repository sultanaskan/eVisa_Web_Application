import RegistrationForm from "../components/registration/RegistrationForm.jsx"
import ULGHeader from "../components/ULGHeader.jsx"
import ULGFooter from "../components/ULGFooter.jsx"


export default function Register(){
    return (    
        //header section
        <>
            <ULGHeader />
            <div><RegistrationForm /></div>
            <ULGFooter />
            
        </>
        
    )
}