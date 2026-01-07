import RegistrationForm from "../components/registration/RegistrationForm.jsx"
import ULGHeader from "../components/ULGHeader.jsx"
import ULGFooter from "../components/ULGFooter.jsx"


export default function Register(){
    return (    
        //header section
        <>
            //header section
            <ULGHeader />
            //rest of the registration page content
            <div><RegistrationForm /></div>
            //footer section
            <ULGFooter />
            
        </>
        
    )
}