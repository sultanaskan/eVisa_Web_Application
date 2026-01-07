export const InfoBanner = () => (
  <div className="mt-20 bg-[#eab308] p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
    <div className="w-40 h-40 border-4 border-white flex-shrink-0 flex items-center justify-center">
      {/* Yellow box icon area */}
    </div>
    <div className="text-white">
      <h4 className="text-2xl font-bold mb-2">Did you find the service you are looking for?</h4>
      <p className="text-lg opacity-90 mb-6">
        Learn more about the visa regime. Find more information, instructions and documentation needed on Entry & Stay Regulations.
      </p>
      <button className="bg-[#1a304e] px-6 py-2.5 font-bold text-sm uppercase rounded-[4px]">
        Entry & Stay Regulations
      </button>
    </div>
  </div>
);

export const SupportSection = () => (
  <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-gray-100 pt-16 pb-20">
    <h2 className="text-[#5b96e0] text-4xl font-bold">Support</h2>
    <div>
      <p className="text-gray-600 mb-6 text-lg">
        If you have additional questions about the visa regime, permits and electronic services, please contact us:
      </p>
      <button className="bg-[#1a304e] text-white px-10 py-3 rounded-[4px] font-bold text-sm uppercase">
        Contact
      </button>
    </div>
  </div>
);