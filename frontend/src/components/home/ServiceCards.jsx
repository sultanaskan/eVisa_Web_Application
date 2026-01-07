export const ServiceCards = () => (
  <div className="space-y-16">
    {/* Visa C Section */}
    <div className="pb-12 border-b border-gray-100">
      <h3 className="text-3xl font-bold text-[#1a304e] mb-4">Visa C</h3>
      <p className="text-[#4a5568] text-lg mb-6 leading-relaxed">
        A short-stay visa C is a permit issued to a foreigner for entry, transit and short-term stay on the territory of the Republic of Serbia for up to 90 days.
      </p>
      <button className="bg-[#1a304e] text-white px-8 py-3 rounded-[4px] font-bold text-sm uppercase hover:bg-[#2c4765] transition-colors">
        Start application
      </button>
    </div>

    {/* Visa D Section */}
    <div>
      <h3 className="text-3xl font-bold text-[#1a304e] mb-4">Visa D</h3>
      <p className="text-[#4a5568] text-lg mb-6 leading-relaxed">
        Visa D for a long stay is a permit issued to a foreigner for entry and stay, and work in case when the visa is issued on the basis of employment, in the territory of the Republic of Serbia for a period of 90 to 180 days.
      </p>
      <button className="bg-[#1a304e] text-white px-8 py-3 rounded-[4px] font-bold text-sm uppercase hover:bg-[#2c4765] transition-colors">
        Start application
      </button>
    </div>
  </div>
);