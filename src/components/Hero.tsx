"use client";
import { signIn } from "next-auth/react";
import React from "react";

const Hero = () => {
  return (
    <div className="relative text-center overflow-hidden h-screen font-sans">
      <div className="absolute inset-0 flex justify-center items-start">
        {" "}
        <div className="glow-bg absolute w-[100vw] h-[30vh] top-[-50vh] "></div>{" "}
      </div>

      <div className="relative z-10 mt-44 p-4 w-4xl mx-auto divide-y space-y-3 divide-[#202020]">
        <h1 className="text-6xl">Manage Your Repos Effortlessly</h1>
        <p className="text-2xl w-lg mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground">
          Update repository visibility with just one click.
        </p>
        <div className="relative">
          <span>Signup with github</span>
          <button
            type="submit"
            className="absolute right-[50%] -top-0.5 translate-x-30 text-white w-10 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden"
          >
            <span className="relative w-full h-full block overflow-hidden">
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
    </div>
  );
};

export default Hero;
