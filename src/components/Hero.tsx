"use client";
import { sans, urban } from "@/utils/fonts";
import { Plus } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

const Hero = () => {
  return (
    <div className="relative text-center overflow-hidden h-screen font-sans">
      <div className="absolute inset-0 flex justify-center items-start">
        {" "}
        <div className="glow-bg absolute w-[100vw] h-[30vh] top-[-50vh] "></div>{" "}
      </div>

      <div className="relative z-10 mt-50 p-4 w-5xl mx-auto space-y-2 border border-slate-200 dark:border-slate-600 [mask-image:radial-gradient(200rem_24rem_at_center,white,transparent)]">
        <Plus className="absolute -left-4 -top-4 h-8 w-8 text-indigo-500" />
        <Plus className="absolute -bottom-6 -left-4 h-8 w-8 text-indigo-500" />
        <Plus className="absolute -right-4 -top-4 h-8 w-8 text-indigo-500" />
        <Plus className="absolute -bottom-6 -right-4 h-8 w-8 text-indigo-500" />
        <h1
          className={`text-6xl bg-clip-text text-transparent bg-gradient-to-b from-[#303020] dark:text-transparent dark:bg-gradient-to-b dark:from-[#2a13d5] dark:to-[#38c71b] ${sans}`}
        >
          Manage Your Repos Effortlessly
        </h1>
        <p
          className={`text-2xl w-lg mx-auto bg-clip-text text-gray-600 dark:text-gray-400 ${urban}`}
        >
          Update repository visibility with just one click.
        </p>
        <button
          type="submit"
          onClick={(()=> signIn())}
          className="relative flex items-center justify-center space-x-2 border border-slate-200 dark:border-slate-600  bg-[#20202000] px-4 py-1 mx-auto rounded-lg cursor-pointer"
        >
          <span className="text-white">Signup</span>

          <span className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden">
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
              →
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
              →
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
