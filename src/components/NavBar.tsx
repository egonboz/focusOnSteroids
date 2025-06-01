import { useState } from "react";

const NavBar: React.FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className="w-full flex items-center justify-between px-6 py-2 bg-white shadow-md">
      <p className="text text-l font-bold text-gray-800">FocusOnSteroids</p>
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full transition-all hover:scale-105">
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

export default NavBar