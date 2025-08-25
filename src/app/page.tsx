import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import RepoList from "@/components/RepoList";
import Hero from "@/components/Hero";

export default async function page() {
  const session = await getServerSession(authOptions);
  const isAuthed = !!session;
  return (
    <div>
      <Navbar />
      <main>
        {!isAuthed ? (
          <Hero />
        ) : (
          <Suspense>
            <RepoList />
          </Suspense>
        )}
      </main>
    </div>
  );
}
