import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      authorization: { params: { scope: "read:user repo" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        (token as any).accessToken = account.access_token;
      }
      if (profile && typeof profile === "object") {
        (token as any).githubLogin = (profile as any).login;
        (token as any).avatarUrl = (profile as any).avatar_url;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session.user as any).login = (token as any).githubLogin;
      if ((token as any).avatarUrl) {
        session.user!.image = (token as any).avatarUrl as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {},
};