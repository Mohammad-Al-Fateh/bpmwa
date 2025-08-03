import type { Metadata } from "next";
import { Geist, Geist_Mono, Tiro_Bangla } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import HomeNavBar from "./_default/HomeNavBar";
import HomeFooter from "./_default/HomeFooter";
import AosWrapper from "./AosWrapper";
import NextTopLoader from "nextjs-toploader";

// ✅ Fonts
const tiroBangla = Tiro_Bangla({
  weight: "400",
  subsets: ["latin", "bengali"],
  variable: "--font-tiro-bangla",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// ✅ Metadata
export const metadata: Metadata = {
  title:
    "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন | Madrasha Association of Bangladesh",
  description:
    "আলেম সমাজের ঐক্য ও মাদ্রাসার উন্নয়নই আমাদের লক্ষ্য। মেধাবী শিক্ষার্থীদের বৃত্তি, শিক্ষক প্রশিক্ষণ এবং দ্বীনি শিক্ষার পরিবেশ উন্নয়নে কাজ করছি।",
  keywords: [
    "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন",
    "মাদ্রাসা বৃত্তি",
    "মাদ্রাসা এসোসিয়েশন",
    "মাদ্রাসা ওয়েলফেয়ার",
    "মাদ্রাসা শিক্ষক প্রশিক্ষণ",
    "হিফজ প্রতিযোগিতা",
    "দ্বীনি শিক্ষা উন্নয়ন",
    "বৃত্তি পরীক্ষা",
    "বাংলাদেশ প্রাইভেট মাদ্রাসা",
    "প্রাইভেট মাদ্রাসা উন্নয়ন",
    "মাদ্রাসা শিক্ষাব্যবস্থা",
    "মাদ্রাসা ছাত্রছাত্রী",
    "বাংলাদেশ ইসলামী শিক্ষা",
    "মাদ্রাসা একাডেমিক উন্নয়ন",
    "বেসরকারি মাদ্রাসা এসোসিয়েশন",
    "মাদ্রাসা সেবা কার্যক্রম",
    "প্রাইভেট মাদ্রাসা বৃত্তি",
    "মাদ্রাসা ভর্তি পরীক্ষা",
    "ইসলামী শিক্ষা প্রসার",
    "বাংলা মাদ্রাসা উন্নয়ন",
    "মাদ্রাসা কল্যাণ সংগঠন",

    // 🔹 English Keywords
    "Bangladesh Private Madrasah Welfare Association",
    "Madrasha Association of Bangladesh",
    "Bangladesh madrasha",
    "Bangladesh madrasah",
    "madrasah association",
    "private madrasah",
    "madrasah welfare",
    "madrasah scholarship",
    "Islamic education Bangladesh",
    "alim society unity",
    "private madrasa Bangladesh",
    "madrasha training program",
    "madrasha exam",
    "madrasha registration",
    "madrasah education system",
    "madrasah students Bangladesh",
    "madrasa teacher training",
    "madrasah development Bangladesh",
    "madrasha merit scholarship",
    "madrasah welfare association",
    "bangla madrasah welfare",
    "religious education development",
    "hifzul quran competition",
    "scholarship program for madrasah",
    "madrasha teacher development",
    "britti exam madrasah",
    "madrasha ngo Bangladesh",
    "madrasha unity association",
    "private islamic school Bangladesh",
    "madrasah support initiative",
    "bangladesh madrasah network",
  ],
  authors: [{ name: "Bangladesh Madrasha Association" }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://madrasha-shhociation-britti.vercel.app",
    title: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন",
    description:
      "আলেম সমাজের ঐক্য, মাদ্রাসার উন্নয়ন এবং দ্বীনি শিক্ষার পরিবেশ উন্নয়নই আমাদের লক্ষ্য।",
    siteName: "Madrasha Association",
    images: [
      {
        url: "https://i.postimg.cc/BQP10jDv/logo-2.webp",
        width: 1200,
        height: 630,
        alt: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন",
    description:
      "দ্বীনি শিক্ষার মান উন্নয়ন এবং আলেম সমাজের ঐক্যের মাধ্যমে সমাজে নৈতিক উন্নয়ন সাধনই আমাদের মিশন।",
    site: "@madrasah_welfare",
    images: ["https://i.postimg.cc/BQP10jDv/logo-2.webp"],
  },
  metadataBase: new URL("https://madrasha-shhociation-britti.vercel.app"),
  verification: {
    google: "548jsiiwBxZPY3ss4bgLIk-tirGmZGrJTzHE0DKx2Uo",
  },
  other: {
    facebook_page:
      "https://www.facebook.com/p/Bangladesh-Private-Madrasah-Welfare-Association-100092627167960/",
  },
};

// ✅ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light">
      <head>
        {/* ✅ Standard Meta */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="bn" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="no-referrer-when-downgrade" />

        {/* ✅ Canonical */}
        <link
          rel="canonical"
          href="https://madrasha-shhociation-britti.vercel.app/"
        />

        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* ✅ Facebook Page */}
        <link
          rel="me"
          href="https://www.facebook.com/p/Bangladesh-Private-Madrasah-Welfare-Association-100092627167960/"
        />

        {/* ✅ Apple & MS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#008000" />

        {/* ✅ Performance */}
        <meta
          httpEquiv="Cache-Control"
          content="public, max-age=604800, must-revalidate"
        />
        <meta httpEquiv="Expires" content="1y" />
        <meta
          name="format-detection"
          content="telephone=no,email=no,address=no"
        />

        {/* ✅ PWA Ready */}
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ SEO Schema / JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন",
              alternateName: "Bangladesh Private Madrasa Welfare Association",
              url: "https://madrasha-shhociation-britti.vercel.app",
              logo: "https://i.postimg.cc/BQP10jDv/logo-2.webp",
              sameAs: [
                "https://www.facebook.com/p/Bangladesh-Private-Madrasah-Welfare-Association-100092627167960/",
              ],
              description:
                "আলেম সমাজের ঐক্য ও মাদ্রাসার উন্নয়নই আমাদের লক্ষ্য। মেধাবী শিক্ষার্থীদের বৃত্তি, শিক্ষক প্রশিক্ষণ এবং দ্বীনি শিক্ষার পরিবেশ উন্নয়নে কাজ করছি।",
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tiroBangla.variable} antialiased`}
      >
        <noscript>
          আপনার ব্রাউজারে জাভাস্ক্রিপ্ট সক্রিয় করুন সম্পূর্ণ অভিজ্ঞতা পেতে।
        </noscript>

        <AosWrapper>
          <NextTopLoader
            color="#008000"
            showSpinner={true}
            height={3}
            zIndex={99999999999}
          />
          <Toaster />
          <HomeNavBar />
          {children}
          <HomeFooter />
        </AosWrapper>
      </body>
    </html>
  );
}
