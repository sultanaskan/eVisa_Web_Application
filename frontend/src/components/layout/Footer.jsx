// components/layout/Footer.jsx
import "../../App.css";
import rslogo from '../../assets/rslogo.png';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-20 font-sans">
      {/* Blue "Top of the page" bar */}
      <div className="bg-[#1a304e] w-full py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-end">
          <button 
            onClick={scrollToTop}
            className="text-white text-[11px] font-medium hover:underline flex items-center gap-1"
          >
            Top of the page
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-white pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            <img src={rslogo} alt="Republic of Serbia Coat of Arms" className="h-20 w-auto" />
            <div className="space-y-1">
              <h2 className="text-[22px] font-bold text-[#1a304e]">welcometoserbia.gov.rs</h2>
              <p className="text-sm text-gray-600">Welcome to Serbia</p>
            </div>
          </div>

          <div className="text-[12px] text-gray-500 leading-relaxed max-w-4xl space-y-2">
            <p>
              The Website is licensed under a{' '}
              <a href="#" className="text-[#5b96e0] font-bold hover:underline">
                Creative Commons
              </a>{' '}
              Attribution-NonCommercial-No Derivs 3.0 Serbia License. Web project{' '}
              <a href="https://ite.gov.rs" className="text-[#5b96e0] font-bold hover:underline">
                ite.gov.rs
              </a>
            </p>
            
            <div className="pt-2">
              <a href="#" className="text-[#5b96e0] font-bold hover:underline">
                Privacy Policy and terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};