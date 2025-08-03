import React from "react";
import "animate.css";
import Link from "next/link";
import { Phone, UserPlus } from "lucide-react";

const RolesHeroBanner = () => {
  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-teal-100 overflow-hidden">
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-10 left-0 w-full h-20 bg-repeat opacity-20"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'><path d='M20,10 C30,5 40,15 50,10 C60,5 70,15 80,10' stroke='%2300596B' fill='none' stroke-width='0.5'/></svg>')",
          }}
        ></div>
      </div>

      {/* Floating Islamic Elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 opacity-10 animate-float">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 0C100 0 143 50 143 100C143 150 100 200 100 200C100 200 57 150 57 100C57 50 100 0 100 0Z"
            stroke="#059669"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="absolute bottom-1/3 -right-20 w-40 h-40 opacity-10 animate-float animation-delay-2000">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 40C100 40 129 70 129 100C129 130 100 160 100 160C100 160 71 130 71 100C71 70 100 40 100 40Z"
            stroke="#0d9488"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="animate__animated animate__fadeInDown">
          <span className="inline-block bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            আপনার ভূমিকা খুঁজুন
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            ইসলামী শিক্ষার সেবক হোন
          </span>
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 animate__animated animate__fadeIn animate__delay-1s">
          বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশনের সাথে যুক্ত হয়ে
          দ্বীনি শিক্ষার মান উন্নয়নে অবদান রাখুন
        </p>

        <div className="animate__animated animate__fadeIn animate__delay-2s">
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <button className="relative overflow-hidden h-11 px-6 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 group">
                <span className="relative z-10 flex items-center gap-2">
                  <Phone size={16} />
                  যোগাযোগ করুন
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </Link>

            <Link href="/register">
              <button className="relative overflow-hidden h-11 px-6 rounded-full bg-white text-emerald-600 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 group border-2 border-emerald-500">
                <span className="relative z-10 flex items-center gap-2">
                  <UserPlus size={16} />
                  নিবন্ধন
                </span>
                <span className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default RolesHeroBanner;
