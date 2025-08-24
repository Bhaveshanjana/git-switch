"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 py-8">
        <div className="backdrop-blur bg-white/5 dark:bg-black/10 border border-[#202020e9] rounded-2xl flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-xs font-bold">
                  <Image src="/logo.svg" alt="logo" height="50" width="50" className="rounded-full size-7"/>
                </span>
              </div>
              <span className="text-sm font-semibold">Repo Switch</span>
            </Link>
          </div>
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
                  className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("github")}
                className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10"
              >
                Sign in with GitHub
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
