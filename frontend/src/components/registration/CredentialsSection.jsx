// components/registration/CredentialsSection.jsx
import FormInput from './FormInput.jsx';


export default function CredentialsSection(){
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 border-b pb-2">Username and password</h3>
      <FormInput label="User name" sublabel="Enter your email address" required />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput label="Password" type="password" required />
        <FormInput label="Password confirmation" type="password" required />
      </div>

      {/* Password Strength Meter */}
      <div className="flex gap-1 h-1.5 mt-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 bg-slate-200 rounded-full"></div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500">
        Password must contain 8-20 characters, uppercase, lowercase, number, and special character.
      </p>
    </div>
  );
};