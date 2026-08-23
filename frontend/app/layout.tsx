import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeafLens AI | Plant Disease Detection",
  description: "Upload a plant leaf image and identify potential diseases with AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
