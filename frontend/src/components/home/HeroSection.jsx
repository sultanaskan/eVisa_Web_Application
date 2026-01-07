export const HeroSection = () => (
  <div className="relative h-[450px] w-full overflow-hidden">
    {/* Background Image - Using a placeholder similar to the portal */}
    <img 
      src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600" 
      alt="Office background" 
      className="w-full h-full object-cover brightness-50"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 tracking-tight">
        Welcome to eServices
      </h1>
      <p className="text-white text-lg md:text-xl max-w-3xl leading-relaxed opacity-90">
        Here you can use electronic services of diplomatic and consular offices and other competent authorities of the Republic of Serbia.
      </p>
    </div>
  </div>
);