import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provide";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";



const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "HealthMate- Doctors Appointment app",
  description: "Connect with doctors anytime,anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearence={{
      baseTheme:dark,
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* header */}
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          {/* footer */}
          <footer className="bg-muted/50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-200">
              <p>Made with ❤️ by Swarnabha</p>
            </div>
          </footer>
        </ThemeProvider>
        {/* header */}
        
      </body>
      </html>
    </ClerkProvider>
  );
}
