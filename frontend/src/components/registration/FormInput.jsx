// components/registration/FormInput.jsx
export default function FormInput ({ label, sublabel, required, type = "text", ...props })
 {
  return  (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-bold text-slate-700">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    {sublabel && <p className="text-[11px] text-slate-500 italic">{sublabel}</p>}
    <input 
      type={type}
      className="border border-slate-300 p-2 text-sm focus:border-blue-500 outline-none"
      {...props}
    />
  </div>
);
 }