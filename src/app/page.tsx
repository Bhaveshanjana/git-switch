import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import FeatureCard from "@/components/Featured";
import RepoList from "@/components/RepoList";


export default async function page() {
  const session = await getServerSession(authOptions);
  const isAuthed = !!session;
  return (
    <div>
      <Navbar />
      <main>
        {!isAuthed ? (
          <FeatureCard />
        ) : (
          <Suspense>
         <RepoList/>
          </Suspense>
        )}
      </main>
    </div>
  );
}
