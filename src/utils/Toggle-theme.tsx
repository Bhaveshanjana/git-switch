"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDark(!isDark);
  };
  const iconVariants = {
    hidden: {
      translateY: -30,
      opacity: 0,
    },
    visible: {
      translateY: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      translateY: -30,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };
  return (
    <button className="flex cursor-pointer " onClick={handleThemeChange}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "moon" : "sun"}
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mr-2"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-gray-300 " strokeWidth={2} />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" strokeWidth={2} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
