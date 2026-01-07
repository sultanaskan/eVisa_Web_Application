// components/layout/Footer.jsx
import "../../App.css";
import Header from "./Header";
import rslogo from '../../assets/rslogo.png';


export const Footer = () => (
  <footer className="w-full bg-white mt-20 pt-10 pb-6 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center md:items-start">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img src={rslogo} alt="Serbia" className="h-16 w-auto" />
        <div>
          <h2 className="text-xl font-bold text-slate-800">welcometoserbia.gov.rs</h2>
          <p className="text-xs text-slate-500">Welcome to Serbia</p>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 max-w-2xl text-center md:text-left">
        The Website is licensed under a license of Creative Commons Attribution-Non-commercial-No rework 3.0 Serbia. 
        Web project <a href="#" className="underline">ite.gov.rs</a>
      </p>
      <div className="mt-4 flex gap-4 text-[10px] text-gray-400">
        <a href="#">Terms of use</a>
        <a href="#">Privacy Policy</a>
      </div>
    </div>
  </footer>
);