import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Halina Creations | Digital Artistry",
  description: "Bespoke digital invitations for weddings, birthdays, and milestones.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
       
        <main>{children}</main>
      </body>
    </html>
  );
}