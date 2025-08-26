import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import RepoList from "@/components/RepoList";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default async function page() {
  const session = await getServerSession(authOptions);
  const isAuthed = !!session;
  return (
    <div className="bg-background dark:bg-foreground">
      <main>
        <Navbar />
        {!isAuthed ? (
          <Hero />
        ) : (
          <Suspense>
            <RepoList />
          </Suspense>
        )}
        <Footer />
      </main>
    </div>
  );
}
