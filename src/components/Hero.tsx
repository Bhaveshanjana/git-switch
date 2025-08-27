"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Plus } from "lucide-react";

export default function SignupSection() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    signIn("github");
  };

  return (
    <div className="relative text-center overflow-hidden h-screen font-sans">
      {/* Background effect */}
      <div className="absolute inset-0 flex justify-center items-start">
        <div className="glow-bg absolute w-[100vw] h-[30vh] top-[-50vh] "></div>
      </div>
      {/* Hero content */}
      <div className="relative z-10 mt-50 p-4 w-xs md:w-5xl mx-auto space-y-2 border border-dashed border-slate-400 dark:border-slate-600 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)]">
        <Plus className="absolute -left-4 -top-4 h-8 w-8 text-indigo-500" />
        <Plus className="absolute -bottom-6 -left-4 h-8 w-8 text-indigo-500" />
        <Plus className="absolute -right-4 -top-4 h-8 w-8 text-indigo-500" />
        <Plus className="absolute -bottom-6 -right-4 h-8 w-8 text-indigo-500" />
        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-[#303020] dark:text-transparent dark:bg-gradient-to-b dark:from-[#2a13d5] dark:to-[#38c71b]">
            Manage Your Repos Effortlessly
          </h1>
          <p className="text-sm md:text-2xl md:w-lg mx-auto bg-clip-text text-gray-600 dark:text-gray-400">
            Update repository visibility with just one click.
          </p>
        </div>
        {/* Sigup button */}
        <button
          type="button"
          onClick={handleSignIn}
          disabled={loading}
          className="relative flex items-center justify-center space-x-2 border border-slate-400 dark:border-slate-600 bg-[#20202007] hover:bg-[#20202017] dark:hover:bg-[#706d6d3d] transition-colors duration-300 px-2 md:px-4 py-1 mx-auto rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="dark:text-gray-100 text-gray-800 text-sm">
            {loading ? "Redirecting..." : "Signup"}
          </span>

          {!loading && (
            <span className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white/50 dark:bg-white/5 hover:bg-white/20 transition-colors group overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full text-gray-800 dark:text-white">
                →
              </span>
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0 text-gray-800 dark:text-white">
                →
              </span>
            </span>
          )}
          {loading && (
            <span className="w-4 h-4 border-2 border-t-transparent border-gray-600 dark:border-gray-200 rounded-full animate-spin ml-2"></span>
          )}
        </button>
      </div>
    </div>
  );
}
