import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leo's F1 Dream",
  description: "A boy's imagination takes flight",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
