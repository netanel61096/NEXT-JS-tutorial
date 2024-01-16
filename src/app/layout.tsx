import "./globals.css";
import AppHeader from "@/components/AppHeader";
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  icons: {
    icon: "/layout.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session =await getServerSession(authOptions)
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
        <header>
          <AppHeader />
        </header>
        <main className="max-w-5xl mx-auto py-6 px-5 ">
        {children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
