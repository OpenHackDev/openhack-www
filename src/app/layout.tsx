import type { Metadata } from "next";
import { BaseOhFooter } from "@/components/interaction/footer/BaseOhFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenHack",
  description: "Coding made fun again",
  openGraph: {
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <body className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">{children}</div>
        <BaseOhFooter />
      </body>
    </html>
  );
}
