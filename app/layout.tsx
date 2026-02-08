import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
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
            {children}
            <Footer />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html >
  );
}
