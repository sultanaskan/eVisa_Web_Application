import React from 'react';

const FeeSection = () => {
  const feeData = [
    { description: "Visa application fee (Type D)", amount: "30.00", currency: "EUR" },
    { description: "Service and processing fee", amount: "2.00", currency: "EUR" }
  ];

  const total = feeData.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[#212529]">
      <h2 className="text-2xl font-bold mb-8 text-[#1a304e]">Fees</h2>

      {/* Fee Table */}
      <div className="border border-gray-200 rounded-sm overflow-hidden shadow-sm mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-600">Description</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-600 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {feeData.map((fee, index) => (
              <tr key={index} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">{fee.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold text-right">{fee.amount} {fee.currency}</td>
              </tr>
            ))}
            <tr className="bg-[#f8f9fa]">
              <td className="px-6 py-4 text-sm font-bold text-[#1a304e] uppercase">Total to be paid</td>
              <td className="px-6 py-4 text-lg font-black text-[#1a304e] text-right">{total} EUR</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Notice */}
      <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-100 rounded-sm mb-10">
        <div className="text-amber-500 mt-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900 uppercase mb-1">Payment Information</h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            Upon clicking "Submit application", you will be redirected to the secure payment gateway. 
            Please note that the visa fee is non-refundable regardless of the decision made on your application.
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default FeeSection;