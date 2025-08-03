import React from "react";
import {
  BookOpen,
  Users,
  Award,
  Globe,
  ChevronRight,
  MousePointerSquareDashed,
} from "lucide-react";

export default function MadrashassociationHistory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 font-bangla">
            মাদ্রাসা শিক্ষাবোর্ডের ঐতিহাসিক গঠন
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-bangla">
            বাংলাদেশের ইসলামী শিক্ষা ব্যবস্থার উন্নয়নে মাদ্রাসা শিক্ষাবোর্ডের
            ভূমিকা ও ইতিকথা
          </p>
          <div className="w-32 h-1.5 bg-emerald-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center font-bangla">
              <BookOpen className="mr-2 h-6 w-6" />
              কালানুক্রমিক ইতিহাস
            </h2>

            <div className="space-y-8">
              {/* Timeline Item 1 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    ১৯৮৫
                  </div>
                  <div className="w-0.5 h-full bg-emerald-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-bangla">
                    বাংলাদেশ মাদ্রাসা শিক্ষাবোর্ড প্রতিষ্ঠা
                  </h3>
                  <p className="text-gray-600 font-bangla">
                    স্বাধীনতা পরবর্তী সময়ে ইসলামী শিক্ষার মান উন্নয়নের লক্ষ্যে
                    সরকারি উদ্যোগে বাংলাদেশ মাদ্রাসা শিক্ষাবোর্ড প্রতিষ্ঠিত হয়।
                    প্রাথমিকভাবে ঢাকা, চট্টগ্রাম ও রাজশাহী বিভাগের ৫০টি মাদ্রাসা
                    নিয়ে যাত্রা শুরু করে।
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    ১৯৯০
                  </div>
                  <div className="w-0.5 h-full bg-emerald-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-bangla">
                    সমন্বিত শিক্ষাক্রম চালু
                  </h3>
                  <p className="text-gray-600 font-bangla">
                    সাধারণ শিক্ষার সাথে সামঞ্জস্য রেখে নতুন শিক্ষাক্রম প্রণয়ন
                    করা হয়। দাখিল (মাধ্যমিক) ও আলিম (উচ্চ মাধ্যমিক) পর্যায়ে
                    বিজ্ঞান ও মানবিক শাখা চালু করা হয়।
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    ২০০৬
                  </div>
                  <div className="w-0.5 h-full bg-emerald-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-bangla">
                    কারিগরি শাখা প্রবর্তন
                  </h3>
                  <p className="text-gray-600 font-bangla">
                    মাদ্রাসা শিক্ষার্থীদের জন্য কম্পিউটার শিক্ষা ও কারিগরি
                    প্রশিক্ষণ চালু করা হয়। দেশব্যাপী ১০০টি মডেল মাদ্রাসায়
                    কম্পিউটার ল্যাব স্থাপন করা হয়।
                  </p>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    ২০১৭
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-bangla">
                    ডিজিটাল মাদ্রাসা প্রকল্প
                  </h3>
                  <p className="text-gray-600 font-bangla">
                    প্রধানমন্ত্রী শেখ হাসিনার বিশেষ উদ্যোগে সকল মাদ্রাসায়
                    ডিজিটাল ক্লাসরুম চালু করা হয়। অনলাইন ভর্তি ও ফলাফল প্রকাশ
                    ব্যবস্থা চালু হয়।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Achievements */}
          <div className="space-y-8">
            {/* Current Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center font-bangla">
                <Users className="mr-2 h-6 w-6" />
                বর্তমান পরিসংখ্যান
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <MousePointerSquareDashed className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600 font-bangla">
                      মোট মাদ্রাসা
                    </p>
                    <p className="text-2xl font-bold text-emerald-700">
                      ৯,৩৫৬টি
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <BookOpen className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600 font-bangla">
                      শিক্ষার্থী
                    </p>
                    <p className="text-2xl font-bold text-emerald-700">
                      ৩৪ লক্ষ+
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <Award className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600 font-bangla">
                      শিক্ষক
                    </p>
                    <p className="text-2xl font-bold text-emerald-700">
                      ১,২৫,০০০+
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notable Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center font-bangla">
                <Award className="mr-2 h-6 w-6" />
                উল্লেখযোগ্য অর্জন
              </h2>
              <div className="space-y-3">
                {[
                  "আন্তর্জাতিক ইসলামী বিশ্ববিদ্যালয়ে স্বীকৃতি",
                  "মাদ্রাসা শিক্ষার্থীদের জন্য বিশেষ শিক্ষাবৃত্তি",
                  "মাদ্রাসা শিক্ষকদের প্রশিক্ষণ কর্মসূচি",
                  "ই-লার্নিং প্ল্যাটফর্ম চালু",
                  "মাদ্রাসা শিক্ষার্থীদের বিশ্ববিদ্যালয় ভর্তিতে কোটা",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700 font-bangla">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* International Collaboration */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center font-bangla">
                <Globe className="mr-2 h-6 w-6" />
                আন্তর্জাতিক সহযোগিতা
              </h2>
              <p className="text-gray-600 mb-3 font-bangla">
                সৌদি আরব, মালয়েশিয়া ও তুরস্কের ইসলামী বিশ্ববিদ্যালয়ের সাথে
                সমঝোতা স্মারক স্বাক্ষরিত হয়েছে। প্রতি বছর ২০০ জন শিক্ষার্থী
                বৃত্তি পেয়ে থাকেন।
              </p>
              <div className="flex space-x-2">
                {["সৌদি আরব", "মালয়েশিয়া", "তুরস্ক", "কাতার"].map(
                  (country, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bangla"
                    >
                      {country}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 italic max-w-3xl mx-auto font-bangla">
            ``ইসলামী শিক্ষা ও আধুনিক শিক্ষার সমন্বয়ে গড়ে উঠছে নতুন প্রজন্ম, যারা
            ধর্মীয় মূল্যবোধ ও আধুনিক জ্ঞানে সমৃদ্ধ হয়ে দেশ ও জাতির সেবায় নিয়োজিত
            হবে।``
          </p>
        </div>
      </div>
    </div>
  );
}
