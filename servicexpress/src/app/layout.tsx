import "./globals.css";
import type { Metadata } from "next";
import { Inter,Poppins } from "next/font/google";
import RedirectToWaitlist from "./redirectWaitlist"; // Import the redirection component

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "ServiceXpress",
  description: "",
  icons: {
    icon: "favicons/favicon-32x32.png",
    apple: "favicons/apple-icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="152x152" href="favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
        <link rel="manifest" href="favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <RedirectToWaitlist /> {/* Add the redirection logic here */}
        {children}
      </body>
    </html>
  );
}
