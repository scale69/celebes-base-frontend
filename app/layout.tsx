import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CELEBES SULTRA - Portal Berita Sulawesi Tenggara",
  description:
    "Portal berita terkini dan terpercaya dari Sulawesi Tenggara. Berita Sultra, Ekonomi, Politik, Olahraga, Nasional, dan Hiburan.",
  keywords:
    "berita sultra, sulawesi tenggara, kendari, news, berita terkini, indonesia",
  authors: [{ name: "CELEBES SULTRA" }],
  creator: "CELEBES SULTRA",
  publisher: "CELEBES SULTRA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "CELEBES SULTRA - Portal Berita Sulawesi Tenggara",
    description:
      "Portal berita terkini dan terpercaya dari Sulawesi Tenggara",
    type: "website",
    locale: "id_ID",
    siteName: "CELEBES SULTRA",
  },
  twitter: {
    card: "summary_large_image",
    title: "CELEBES SULTRA",
    description: "Portal berita terkini dan terpercaya dari Sulawesi Tenggara",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className=" flex flex-col bg-gray-50 h-full">
              <main
                className="flex-1 "
              >
                <div className="xl:container mx-auto px-4 py-6">
                  {/* <div className="w-full flex gap-6"> */}
                  <div className="grid justify-center  grid-cols-1 lg:grid-cols-10 gap-6">
                    {/* Left Ad */}
                    <LeftSidebar />
                    {/* Main Content */}
                    {/* <div className="lg:col-span-7"> */}
                    <div className=" lg:col-span-6">
                      {children}
                    </div>
                    {/* Right Sidebar */}
                    <RightSidebar />
                  </div>
                </div>
              </main>
            </div>
            <Footer />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html >
  );
}
