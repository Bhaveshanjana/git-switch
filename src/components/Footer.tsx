import React from "react";
import { Heart, Twitter, Github, Star, GithubIcon } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className=" bg-background dark:bg-foreground py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main content in 2 columns */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Left side - Love message */}
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <span className="text-sm sm:text-base font-medium">
              Give a star
            </span>
            <a href="https://github.com/Bhaveshanjana/git-switch">
              <GithubIcon className="h-5 w-5 text-red-500 fill-current" />
            </a>
          </div>
          <div className="flex items-center space-x-6">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>

            {/* RepoSwitch heading */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              RepoSwitch
            </h3>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-6 pt-2 border-t border-gray-100 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Created by bhavesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
