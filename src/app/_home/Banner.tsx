import React from "react";
import "animate.css";
import Link from "next/link";
import { UserPlus, Phone, Users } from "react-feather";

export default function Banner() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-100 via-teal-100 to-emerald-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="animate__animated animate__fadeInLeft">
            <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
              নতুন আগমন
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              বাংলাদেশ প্রাইভেট মাদ্রাসা{" "}
              <span className="text-emerald-700">ওয়েলফেয়ার এসোসিয়েশন</span>
            </h1>

            <p className="text-gray-700 text-lg mb-8">
              আলেম সমাজের মধ্যে ঐক্যের দুর্ভেদ্য প্রাচীর গড়ে তোলা এবং তাদের
              যোগ্যতা ও দক্ষতায় পরিচালিত প্রাইভেট মাদ্রাসা সমূহের পারস্পরিক
              সহযোগিতার মাধ্যমে দ্বীনি শিক্ষার মান ও পরিবেশ বজায় রাখাই আমাদের
              লক্ষ্য।
            </p>

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

          {/* Right Side - Simplified Card */}
          <div className="animate__animated w-full flex justify-center items-center md:justify-end animate__fadeInRight animate__delay-1s">
            <div className="bg-white w-full md:w-[70%] rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                আমাদের মূল কর্মসূচি
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-lg mr-4">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      শিক্ষক প্রশিক্ষণ
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      মাদ্রাসা শিক্ষকদের জন্য যুগোপযোগী প্রশিক্ষণ কর্মশালা
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      বৃত্তি প্রদান
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      মেধাবী ও দরিদ্র শিক্ষার্থীদের জন্য বৃত্তি ব্যবস্থা
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      সাম্প্রতিক কর্মসূচি
                    </h3>
                    <p className="text-gray-700 mt-1">
                      জাতীয় হিফজুল কুরআন বৃত্তি পরীক্ষা এবং ইসলামী সংস্কৃতি
                      চর্চা প্রতিযোগিতা।
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                <p className="text-emerald-800 text-sm text-center font-medium">
                  ``আল্লাহ তা`য়ালা ততক্ষণ পর্যন্ত কোন জাতির ভাগ্যের পরিবর্তন
                  করেন না যতক্ষণ না ঐ জাতি নিজের ভাগ্য নিজে পরিবর্তন না করে।``
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
