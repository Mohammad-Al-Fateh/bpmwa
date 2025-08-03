import React from "react";
import "animate.css";
import { Award, BookOpen, Phone, ChevronDown, UserPlus } from "lucide-react";
import Link from "next/link";

const ResultBanner = () => {
  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-teal-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-100 rounded-full opacity-10 transform -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-100 rounded-full opacity-10 transform translate-x-20 translate-y-20"></div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 opacity-5 animate-float">
        <BookOpen className="w-full h-full text-green-300" />
      </div>
      <div className="absolute bottom-1/4 right-10 w-20 h-20 opacity-5 animate-float animation-delay-2000">
        <Award className="w-full h-full text-indigo-300" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <div className="animate__animated animate__bounceIn inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
          <Award className="w-4 h-4 mr-2" />
          Exam Results 2023
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 animate__animated animate__fadeIn">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-indigo-600">
            Congratulations!
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 animate__animated animate__fadeIn animate__delay-1s">
          You have successfully passed all your exams with distinction. Your
          hard work has paid off!
        </p>

        {/* Action Buttons */}
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

        {/* Scroll indicator */}
        <div className="mt-12 animate__animated animate__bounce animate__infinite">
          <ChevronDown className="w-6 h-6 text-green-400 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default ResultBanner;
