import { useEffect, useState } from "react";
import SunIcon from "./Icons/SunIcon";
import MoonIcon from "./Icons/MoonIcon";

const NavBar: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 bg-white dark:bg-neutral-800 shadow-md transition-all">
      <p className="text-lg font-bold text-gray-800 dark:text-white">FocusOnSteroids</p>
      <p className="text-3xl font-bold mr-22 text-gray-800 dark:text-white">Focus Session</p>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full transition-all hover:scale-105"
      >
        {darkMode ? <SunIcon className="w-6 h-6 transition-all" /> : <MoonIcon className="w-6 h-6 transition-all" />}
      </button>
    </div>
  );
};

export default NavBar;
