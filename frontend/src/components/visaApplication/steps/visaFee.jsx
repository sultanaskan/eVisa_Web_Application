import React from 'react';

const VisaFees = ({n, p, d, sd }) => {
  // Mock data based on the portal screenshot
  const applicantName = `${d.personal_data?.first_name || 'MOHAMMAD'} ${d.personal_data?.last_name || 'HA...'}`.toUpperCase();
  const totalAmount = "5859.18 RSD";

  const handleInputChange = (e) => {
    sd(prev => ({
      ...prev,
      fee: {
        ...prev.fee,
        payment_authorization_code: e.target.value
      }
    }));
  };
            
  const handleCheck = () => {
    console.log("Checking authorization code:", d.fee?.payment_authorization_code);
  };

  const handlePay = () => {
    console.log("Processing payment for:", applicantName);
    n();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-3xl font-bold text-[#1a304e] mb-12">Visa fees</h2>

      <div className="max-w-md space-y-6">
        {/* First and last name */}
        <div className="flex flex-col">
          <label className="text-[13px] text-gray-600 mb-2">First and last name:</label>
          <div className="w-full border border-gray-300 rounded-sm bg-[#f8f9fa] h-10 flex items-center px-3 text-sm font-medium text-gray-700">
            {applicantName}
          </div>
        </div>

        {/* Total payment amount */}
        <div className="flex flex-col">
          <label className="text-[13px] text-gray-600 mb-2">Total payment amount</label>
          <div className="w-full border border-gray-300 rounded-sm bg-[#f8f9fa] h-10 flex items-center px-3 text-sm font-bold text-gray-800">
            {totalAmount}
          </div>
        </div>

        {/* Payment authorization code */}
        <div className="flex flex-col">
          <label className="text-[13px] text-gray-600 mb-2 flex items-center gap-1">
            Payment authorization code:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-sm h-10 px-3 text-sm focus:outline-none focus:border-[#1a304e]"
              value={d.fee?.payment_authorization_code || ""}
              onChange={handleInputChange}
            />
            <div className="w-6 h-6 rounded-full bg-[#f1c40f]"></div> {/* Status indicator circle */}
          </div>
        </div>

        {/* Check Button */}
        <button
          onClick={handleCheck}
          className="bg-[#1a304e] text-white px-8 py-2 rounded-sm text-sm font-bold hover:bg-[#2c4765] transition-colors"
        >
          Check
        </button>
      </div>

      {/* Information Text */}
      <div className="mt-10">
        <p className="text-[13px] text-gray-600 leading-relaxed">
          All payments will be made in the local currency of the Republic of Serbia - dinar (RSD). 
          For informative display of prices in other currencies, the exchange rate is used middle 
          exchange rate of the National Bank of Serbia. The amount for which your payment card will 
          be charged will be expressed in your local currency through conversion to the same at the 
          exchange rate used by the card organizations, which cannot be known to us at the time of 
          the transaction. As a result of this conversion there is a possibility of a slight difference 
          from the original price listed on our website. Thank you for your understanding.
        </p>
      </div>

      {/* Navigation Footer */}
      <div className="mt-16 flex justify-between items-center">
        <button
          className="bg-[#2c4765] text-white px-8 py-2 rounded-sm text-sm font-semibold hover:bg-[#1a304e]"
          onClick={p}
        >
          Previous step
        </button>
        
        <button
          className="bg-[#2c4765] text-white px-10 py-2 rounded-sm text-sm font-bold tracking-wider uppercase hover:bg-[#1a304e]"
          onClick={handlePay}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default VisaFees;