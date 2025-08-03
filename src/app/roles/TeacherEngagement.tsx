import React from "react";
import {
  BookOpenText,
  Users,
  Award,
  Globe,
  Phone,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const TeacherEngagement = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              শিক্ষক হিসেবে আপনার ভূমিকা
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            ইসলামী শিক্ষার মান উন্নয়নে একজন শিক্ষকের অবদান অপরিসীম। আমাদের
            সংগঠনে যোগদান করে আপনি পাবেন:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="bg-emerald-50 rounded-xl p-8 mb-8 border border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BookOpenText className="w-8 h-8 text-emerald-600 mr-3" />
                পেশাদার উন্নয়ন
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>বছরে ১২টি বিশেষায়িত প্রশিক্ষণ কর্মশালা</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>
                    আধুনিক শিক্ষণ পদ্ধতি (মন্টেসরি, ব্লেন্ডেড লার্নিং)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>কুরআন শিক্ষার বিশেষ কৌশল (নূরানি, তারবিয়াতি)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">•</span>
                  <span>শিক্ষার্থী মূল্যায়নের আধুনিক পদ্ধতি</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                সম্প্রদায় ও নেটওয়ার্কিং
              </h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>জাতীয় পর্যায়ের শিক্ষক সম্মেলনে অংশগ্রহণ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>অনলাইন শিক্ষক ফোরামে সক্রিয় অংশগ্রহণ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>মেন্টরশিপ প্রোগ্রাম (অভিজ্ঞ শিক্ষকদের Guidance)</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-amber-50 rounded-xl p-8 mb-8 border border-amber-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-8 h-8 text-amber-600 mr-3" />
                স্বীকৃতি ও পুরস্কার
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    বছরের সেরা শিক্ষক পুরস্কার
                  </h4>
                  <p className="text-gray-600">
                    প্রতি বছর ৫ জন শিক্ষককে বিশেষ সম্মাননা
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    শিক্ষণ উদ্ভাবনী পুরস্কার
                  </h4>
                  <p className="text-gray-600">
                    নতুন শিক্ষণ পদ্ধতি উদ্ভাবনের জন্য ৫০,০০০ টাকা
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    আন্তর্জাতিক সনদপত্র
                  </h4>
                  <p className="text-gray-600">
                    আন্তর্জাতিক মানের প্রশিক্ষণ সনদ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Globe className="w-8 h-8 text-purple-600 mr-3" />
                যোগদান প্রক্রিয়া
              </h3>
              <ol className="space-y-4 text-gray-700 list-decimal list-inside">
                <li>অনলাইন আবেদন ফর্ম পূরণ</li>
                <li>প্রাথমিক যোগ্যতা যাচাই (২-৩ কর্মদিবস)</li>
                <li>মুখোমুখি সাক্ষাৎকার</li>
                <li>প্রশিক্ষণ প্রোগ্রামে অংশগ্রহণ</li>
                <li>চূড়ান্ত অনুমোদন</li>
              </ol>
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
        </div>
      </div>
    </section>
  );
};

export default TeacherEngagement;
