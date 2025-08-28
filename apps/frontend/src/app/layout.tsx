import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import ClientLayout from "apps/frontend/src/components/clientComponent";
import ReduxProvider from "../components/ReduxProvider";
import Footer from "../components/Footer";
import { Toaster } from "../components/ui/sonner";

const assistant = Assistant({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
});

export const metadata: Metadata = {
  title: "GNR",
  description:
    "Elevate your presents with our premium gift packaging. Discover luxury gift boxes, elegant ribbons, and unique wrapping paper that make every occasion special.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={assistant.variable}>
      <link rel="shortcut icon" href="/Images/GNR.svg" />
      <body className={assistant.variable}>
        <ReduxProvider>
          <ClientLayout />
          {children}
          <Footer />
        </ReduxProvider>
        <Toaster offset={{ top: 0, left: 0 }} />
      </body>
    </html>
  );
}
