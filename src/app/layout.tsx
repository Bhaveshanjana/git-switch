import "./globals.css";
import Provider from "../components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
