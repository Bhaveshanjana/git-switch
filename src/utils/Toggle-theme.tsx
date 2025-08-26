"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(true);

  const combineClasses = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDark(!isDark);
  };
  return (
    <div
      className={combineClasses(
        "flex w-16 h-7.5 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "border border-slate-400 bg-gray-800  hover:bg-gray-700 "
          : " hover:bg-gray-400 bg-gray-200 border border-[#65706e]",
        className
      )}
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
          className={combineClasses(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark ? "transform translate-x-0 " : "transform translate-x-8 "
          )}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-gray-200" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-gray-800" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={combineClasses(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "transform -translate-x-8"
          )}
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
