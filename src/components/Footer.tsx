import React from "react";
import { Twitter, Github, GithubIcon } from "lucide-react";
import { edu, quick, share } from "@/utils/fonts";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className=" bg-background dark:bg-foreground py-2 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-full mx-auto">
        {/* Main content in 2 columns */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          {/* Left side - Love message */}
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <span className={`text-sm sm:text-base font-medium ${quick}`}>
              Give a star
            </span>
            <Link href="https://github.com/Bhaveshanjana/git-switch" className="cursor-pointer">
              <GithubIcon className="h-5 w-5 text-cyan-400 fill-current" />
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://x.com/Bhavesh2034"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="https://github.com/Bhaveshanjana/git-switch"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>

            {/* RepoSwitch heading */}
            <h3
              className={`text-xs md:text-lg font-semibold text-gray-900 dark:text-white ${share}`}
            >
              RepoSwitch
            </h3>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-2 md:mt-6 border-t border-gray-100 dark:border-gray-800">
          <p
            className={`text-center text-xs md:text-lg text-gray-500 dark:text-gray-400 ${edu}`}
          >
            Created by Bhavesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
