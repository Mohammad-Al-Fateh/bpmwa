import React from "react";
import Link from "next/link";
import { FaInfoCircle, FaArrowRight, FaUserTie } from "react-icons/fa";

export default function RegisterByStudent() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">
            শিক্ষার্থী নিবন্ধন
          </h1>
          <p className="text-lg text-teal-600">
            আমাদের শিক্ষামূলক প্ল্যাটফর্মে যোগ দিন
          </p>
        </div>

        {/* তথ্য বাক্স */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-yellow-500">
          <div className="flex items-start">
            <FaInfoCircle className="text-2xl text-yellow-500 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                সরাসরি শিক্ষার্থী নিবন্ধন বর্তমানে বন্ধ আছে
              </h2>
              <p className="text-gray-600 mb-4">
                আমরা বর্তমানে শুধুমাত্র স্বীকৃত শিক্ষা প্রতিষ্ঠানের মাধ্যমে
                নিবন্ধন গ্রহণ করছি। এটি আমাদের শিক্ষার্থী সম্প্রদায়ের গুণমান
                এবং সত্যতা বজায় রাখতে সাহায্য করে।
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                  <FaUserTie className="mr-2" /> প্রতিষ্ঠানের সদস্য?
                </h3>
                <p className="text-blue-700 mb-3">
                  যদি আপনি কোন শিক্ষা প্রতিষ্ঠানের সাথে যুক্ত থাকেন, অনুগ্রহ করে
                  আপনার প্রতিষ্ঠানের পোর্টালের মাধ্যমে নিবন্ধন করুন।
                </p>
                <Link
                  href="/register/fromInstitution"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  প্রতিষ্ঠান নিবন্ধনে যান
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* অতিরিক্ত তথ্য বিভাগ */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            প্রতিষ্ঠান নিবন্ধন কেন?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-teal-100 p-1 rounded-full mr-3 mt-1">
                <div className="bg-teal-500 w-2 h-2 rounded-full"></div>
              </div>
              <span className="text-gray-700">
                <strong>যাচাইকৃত সনদপত্র:</strong> আপনার একাডেমিক রেকর্ড
                সঠিকভাবে প্রমাণীকরণ করা হবে
              </span>
            </li>
            <li className="flex items-start">
              <div className="bg-teal-100 p-1 rounded-full mr-3 mt-1">
                <div className="bg-teal-500 w-2 h-2 rounded-full"></div>
              </div>
              <span className="text-gray-700">
                <strong>প্রতিষ্ঠানের সুবিধা:</strong> আপনার স্কুল দ্বারা প্রদত্ত
                সকল বৈশিষ্ট্য এবং সম্পদে অ্যাক্সেস
              </span>
            </li>
            <li className="flex items-start">
              <div className="bg-teal-100 p-1 rounded-full mr-3 mt-1">
                <div className="bg-teal-500 w-2 h-2 rounded-full"></div>
              </div>
              <span className="text-gray-700">
                <strong>ভবিষ্যত অ্যাক্সেস:</strong> সরাসরি শিক্ষার্থী নিবন্ধন
                পরবর্তী পর্যায়ে পাওয়া যাবে
              </span>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              সাহায্য প্রয়োজন?
            </h3>
            <p className="text-gray-600 mb-4">
              সহায়তার জন্য আপনার প্রতিষ্ঠানের প্রশাসক বা আমাদের সহায়তা দলকে
              যোগাযোগ করুন।
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                সাপোর্টে যোগাযোগ
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                সাধারণ প্রশ্নাবলী
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
