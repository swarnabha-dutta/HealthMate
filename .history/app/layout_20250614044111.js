import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "HealthMate- Doctors Appointment app",
  description: "Connect with doctors anytime,anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} `}>
        {/* header */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* footer */}
        <footer className="bg-muted">
          <div className="container mx-auto px-4 text-center text-gray-200">
            <p>Made with ❤️ by Swarnabha</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
