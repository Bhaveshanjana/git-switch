import "./globals.css";
import Provider from "../components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider session={session}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
