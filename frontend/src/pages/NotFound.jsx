import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-[#1a304e]">404</h1>
      <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
      
      <Link to="/">
        <button className="mt-6 bg-[#1a304e] text-white px-8 py-3 rounded-[4px] font-bold text-sm uppercase hover:bg-[#2c4765] transition-colors">
          Back to Home
        </button>
      </Link>
    </div>
  );
};