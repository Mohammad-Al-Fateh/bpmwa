"use client";
import React, { useState } from "react";
import "animate.css";

const ProgressBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const milestones = [
    {
      year: "2018",
      title: "প্রতিষ্ঠা লাভ",
      description: "১০টি মাদ্রাসা নিয়ে আমাদের যাত্রা শুরু",
      stats: "১০টি প্রতিষ্ঠান",
    },
    {
      year: "2020",
      title: "জাতীয় সম্প্রসারণ",
      description: "সমগ্র বাংলাদেশে আমাদের কার্যক্রম বিস্তার",
      stats: "১০০+ সদস্য",
    },
    {
      year: "2022",
      title: "শিক্ষক উন্নয়ন",
      description: "প্রশিক্ষণ কর্মসূচির মাধ্যমে শিক্ষকদের দক্ষতা বৃদ্ধি",
      stats: "৫০০+ প্রশিক্ষণ",
    },
    {
      year: "2024",
      title: "আন্তর্জাতিক সহযোগিতা",
      description: "বৈশ্বিক পর্যায়ে ইসলামী শিক্ষার প্রসার",
      stats: "১০+ আন্তর্জাতিক অংশীদার",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-teal-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInDown">
            আমাদের উন্নয়নের ধারা
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-6 animate__animated animate__fadeIn animate__delay-1s"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
            গত কয়েক বছরে আমাদের অর্জন ও অগ্রযাত্রা
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative mb-16 animate__animated animate__fadeIn animate__delay-2s">
          {/* Progress line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>
          <div
            className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transform -translate-y-1/2 z-10 transition-all duration-500"
            style={{
              width: `${(activeIndex + 1) * (100 / milestones.length)}%`,
            }}
          ></div>

          {/* Milestone indicators */}
          <div className="relative flex justify-between z-20">
            {milestones.map((milestone, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex flex-col items-center w-24 ${
                  index <= activeIndex ? "text-emerald-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all ${
                    index <= activeIndex
                      ? "bg-emerald-500 text-white scale-110"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{milestone.year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Milestone Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate__animated animate__fadeIn animate__delay-3s">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {milestones[activeIndex].title}
            </h3>
            <p className="text-gray-600 mb-6">
              {milestones[activeIndex].description}
            </p>
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">মাইলস্টোন অর্জন</h4>
                <p className="text-gray-600">{milestones[activeIndex].stats}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              সেই বছরের উল্লেখযোগ্য অর্জন
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-700">
                  বছরব্যাপী শিক্ষক প্রশিক্ষণ কর্মসূচি
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-700">
                  জাতীয় পর্যায়ে মাদ্রাসা সম্মেলন
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-700">
                  ১০০+ শিক্ষার্থী বৃত্তি প্রদান
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-700">নতুন কারিকুলাম প্রণয়ন</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats with Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate__animated animate__fadeIn animate__delay-4s">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-all">
            <div className="text-4xl font-bold text-emerald-600 mb-2 animate__animated animate__pulse animate__infinite">
              50+
            </div>
            <p className="text-gray-600">জেলায় শাখা</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-all">
            <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
            <p className="text-gray-600">সদস্য মাদ্রাসা</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-all">
            <div className="text-4xl font-bold text-amber-600 mb-2">5,000+</div>
            <p className="text-gray-600">প্রশিক্ষিত শিক্ষক</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100 hover:shadow-md transition-all">
            <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
            <p className="text-gray-600">কর্মসূচি</p>
          </div>
        </div>

        {/* Quranic Verse */}
        <div className="mt-16 text-center bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-100 animate__animated animate__fadeIn animate__delay-5s">
          <p className="font-arabic text-xl text-emerald-600 mb-2">
            وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ
            وَالْمُؤْمِنُونَ
          </p>
          <p className="text-gray-700">
            ``বলুন, তোমরা কাজ কর, আল্লাহ তোমাদের কাজ দেখবেন, আর তাঁর রাসূল এবং
            মুমিনগণও`` (সূরা তাওবা: 105)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBanner;
