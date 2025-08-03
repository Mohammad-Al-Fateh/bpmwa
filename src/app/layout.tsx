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

// ✅ Determine primary domain
const isPrimaryDomain = process.env.VERCEL_URL?.includes("bpmwa");
const primaryDomain = "https://bpmwa.vercel.app";
const secondaryDomain = "https://madrasha-shhociation-britti.vercel.app";
const canonicalUrl = isPrimaryDomain ? primaryDomain : secondaryDomain;

// ✅ Metadata
export const metadata: Metadata = {
  title: {
    default: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন | BPMWA",
    template: "%s | বাংলাদেশ প্রাইভেট মাদ্রাসা এসোসিয়েশন",
  },
  description:
    "আলেম সমাজের ঐক্য ও মাদ্রাসার উন্নয়নই আমাদের লক্ষ্য। মেধাবী শিক্ষার্থীদের বৃত্তি, শিক্ষক প্রশিক্ষণ এবং দ্বীনি শিক্ষার পরিবেশ উন্নয়নে কাজ করছি।",
  keywords: [
    // Primary Bengali Keywords
    "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন",
    "বিপিএমডব্লিউএ",
    "BPMWA",
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

    // Primary English Keywords
    "Bangladesh Private Madrasah Welfare Association",
    "BPMWA",
    "madrasah association",
    "private madrasah",
    "madrasah welfare",
    "madrasah scholarship",
    "Islamic education Bangladesh",
    "alim society unity",
    "private madrasa Bangladesh",
    "madrasha training program",

    // Secondary Keywords
    "madrasah students Bangladesh",
    "madrasa teacher training",
    "madrasah development Bangladesh",
    "bangla madrasah welfare",
    "religious education development",
    "hifzul quran competition",
    "scholarship program for madrasah",
    "madrasha teacher development",
    "madrasah ngo Bangladesh",
    "madrasha unity association",
    "private islamic school Bangladesh",
    "bangladesh madrasah network",
  ],
  authors: [{ name: "Bangladesh Private Madrasah Welfare Association" }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: canonicalUrl,
    title: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন | BPMWA",
    description:
      "আলেম সমাজের ঐক্য, মাদ্রাসার উন্নয়ন এবং দ্বীনি শিক্ষার পরিবেশ উন্নয়নই আমাদের লক্ষ্য।",
    siteName: "BPMWA | বাংলাদেশ প্রাইভেট মাদ্রাসা এসোসিয়েশন",
    images: [
      {
        url: "https://i.postimg.cc/BQP10jDv/logo-2.webp",
        width: 1200,
        height: 630,
        alt: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন লোগো",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bpmwa_official",
    creator: "@bpmwa_official",
    title: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন",
    description:
      "দ্বীনি শিক্ষার মান উন্নয়ন এবং আলেম সমাজের ঐক্যের মাধ্যমে সমাজে নৈতিক উন্নয়ন সাধনই আমাদের মিশন।",
    images: ["https://i.postimg.cc/BQP10jDv/logo-2.webp"],
  },
  metadataBase: new URL(canonicalUrl),
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "bn-BD": canonicalUrl,
    },
  },
  verification: {
    google: "548jsiiwBxZPY3ss4bgLIk-tirGmZGrJTzHE0DKx2Uo",
    yandex: "yandex-verification-code",
  },
  other: {
    "fb:app_id": "your-facebook-app-id",
    "fb:pages": "100092627167960",
    "og:locale:alternate": "en_US",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Bengali" />
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Bangladesh" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="distribution" content="global" />

        {/* ✅ Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* ✅ Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#008000" />
        <meta name="msapplication-TileColor" content="#008000" />
        <meta name="theme-color" content="#008000" />

        {/* ✅ Social Media */}
        <link
          rel="me"
          href="https://www.facebook.com/p/Bangladesh-Private-Madrasah-Welfare-Association-100092627167960/"
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/p/Bangladesh-Private-Madrasah-Welfare-Association-100092627167960/"
        />

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

        {/* ✅ PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="BPMWA" />
        <meta name="apple-mobile-web-app-title" content="BPMWA" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* ✅ SEO Schema / JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": `${canonicalUrl}#organization`,
              name: "বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন",
              alternateName: [
                "BPMWA",
                "Bangladesh Private Madrasah Welfare Association",
              ],
              url: canonicalUrl,
              logo: "https://i.postimg.cc/BQP10jDv/logo-2.webp",
              sameAs: [
                "https://www.facebook.com/p/Bangladesh-Private-Madrasah-Welfare-Association-100092627167960/",
              ],
              description:
                "আলেম সমাজের ঐক্য ও মাদ্রাসার উন্নয়নই আমাদের লক্ষ্য। মেধাবী শিক্ষার্থীদের বৃত্তি, শিক্ষক প্রশিক্ষণ এবং দ্বীনি শিক্ষার পরিবেশ উন্নয়নে কাজ করছি।",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Bangladesh",
                addressRegion: "Dhaka",
              },
              foundingDate: "2023",
              foundingLocation: "Dhaka, Bangladesh",
              keywords:
                "মাদ্রাসা বৃত্তি, মাদ্রাসা এসোসিয়েশন, বাংলাদেশ প্রাইভেট মাদ্রাসা, madrasah association, private madrasah",
              telephone: "+880XXXXXXXXXX",
              potentialAction: {
                "@type": "SearchAction",
                target: `${canonicalUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tiroBangla.variable} antialiased`}
      >
        <noscript>
          আপনার ব্রাউজারে জাভাস্ক্রিপ্ট সক্রিয় করুন সম্পূর্ণ অভিজ্ঞতা পেতে।
          <br />
          Please enable JavaScript in your browser for the best experience.
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
