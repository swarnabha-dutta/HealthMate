import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({subse})

export const metadata = {
  title: "HealthMate- Doctors Appointment app",
  description: "Connect with doctors anytime,anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
