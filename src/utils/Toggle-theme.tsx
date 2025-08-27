"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDark(!isDark);
  };

  return (
    <div
      className={`flex w-16 h-7 p-1 rounded-full cursor-pointer transition-all duration-300 ${
        isDark
          ? "border border-slate-400  hover:bg-gray-600"
          : "hover:bg-gray-300  border border-[#65706e]"
      }`}
      onClick={handleThemeChange}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsDark(!isDark);
        }
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={`flex justify-center items-center w-5 h-5 rounded-full transition-transform duration-300 ${
            isDark ? "translate-x-0 bg-gray-500" : "translate-x-8 bg-gray-400"
          }`}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-gray-200 " strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-gray-800" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={`flex justify-center items-center w-5 h-5 rounded-full transition-transform duration-300 ${
            isDark ? "bg-transparent" : "-translate-x-8"
          }`}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-black" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
}
