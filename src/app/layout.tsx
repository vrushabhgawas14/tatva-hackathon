import type { Metadata } from "next";
import "./index.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import RootLayoutClient from "@/lib/RootLayoutClient";

export const metadata: Metadata = {
  title: "Eco Friendly",
  description: "Environmental Awareness",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="bg-gray-400 text-white">
        <RootLayoutClient session={session}>
          <Navbar />
          {children}
          <Footer />
        </RootLayoutClient>
      </body>
    </html>
  );
}
