"use client";

import { roboto, share } from "@/utils/fonts";
import { ThemeToggle } from "@/utils/Toggle-theme";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 py-8">
        <div className="bg-transparent backdrop-blur-xl border border-dashed border-slate-200 dark:border-slate-600  shadow-lg shadow-black/20 dark:bg-black/5  rounded-2xl flex items-center justify-between px-4 py-4">
          {/* Logo and Heading */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className=" w-7 h-7 rounded-lg bg-transparent flex items-center justify-center">
                <span className="text-xs">
                  <Image src="/logo.svg" alt="logo" height="50" width="50" />
                </span>
              </div>
              <span
                className={`text-sm md:text-lg  text-gray-800 dark:text-gray-200 ${share}`}
              >
                Repo Switch
              </span>
            </Link>
          </div>
          {/* Signout and Theme toggle button */}
          <div className="flex items-center gap-3">
            {isAuthed ? (
              <>
                {session?.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                )}
                <button
                  onClick={() => signOut()}
                  className={`text-xs text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-slate-400  hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer ${roboto}`}
                >
                  Sign out
                </button>
                <ThemeToggle />
              </>
            ) : (
              <ThemeToggle />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
