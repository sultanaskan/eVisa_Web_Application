// components/ui/RadioOption.jsx
export const RadioOption = ({ label, selected, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 mb-3 border cursor-pointer flex items-center gap-4 transition-all
      ${selected ? 'bg-[#5da0e8] text-white border-blue-600' : 'bg-[#d9e2f1] text-slate-700 border-transparent hover:bg-slate-200'}`}
  >
    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
      ${selected ? 'bg-white border-white' : 'border-slate-400'}`}>
      {selected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </div>
);