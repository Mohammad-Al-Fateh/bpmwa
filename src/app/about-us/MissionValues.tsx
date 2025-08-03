import React from "react";
import {
  BookText,
  Users,
  HeartHandshake,
  Gem,
  Award,
  Globe,
  Shield,
  BookOpenCheck,
} from "lucide-react";

const MissionValues = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              আমাদের মিশন ও মূল্যবোধ
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            ইসলামী শিক্ষার উন্নয়নে আমাদের অঙ্গীকার ও আদর্শ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Mission Section */}
          <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-100">
            <div className="flex items-center mb-6">
              <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                <BookText className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">আমাদের মিশন</h3>
            </div>

            <p className="text-gray-700 mb-6">
              বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশনের মূল মিশন হল
              দেশব্যাপী ইসলামী শিক্ষার মান উন্নয়ন, আলেম সমাজের মধ্যে ঐক্য
              প্রতিষ্ঠা এবং যুগোপযোগী দ্বীনি শিক্ষার সমন্বয়ে আদর্শ নাগরিক গড়ে
              তোলা।
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1">
                  •
                </span>
                <span className="text-gray-700">
                  মাদ্রাসা শিক্ষার আধুনিকায়ন ও মানসম্মত শিক্ষা নিশ্চিতকরণ
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1">
                  •
                </span>
                <span className="text-gray-700">
                  শিক্ষকদের পেশাগত দক্ষতা উন্নয়নে প্রশিক্ষণ প্রদান
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1">
                  •
                </span>
                <span className="text-gray-700">
                  দরিদ্র ও মেধাবী শিক্ষার্থীদের জন্য বৃত্তি ব্যবস্থা
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-emerald-100 text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1">
                  •
                </span>
                <span className="text-gray-700">
                  ইসলামী সংস্কৃতি ও মূল্যবোধের প্রচার ও প্রসার
                </span>
              </li>
            </ul>
          </div>

          {/* Values Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <div className="bg-teal-100 p-3 rounded-lg mr-4">
                <HeartHandshake className="w-8 h-8 text-teal-600" />
              </div>
              আমাদের মূল্যবোধ
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Gem className="w-6 h-6 text-amber-600" />,
                  title: "মানসম্মত শিক্ষা",
                  description: "কুরআন-সুন্নাহ ভিত্তিক প্রামাণিক জ্ঞান প্রদান",
                },
                {
                  icon: <Users className="w-6 h-6 text-blue-600" />,
                  title: "ঐক্য ও সংহতি",
                  description: "আলেম সমাজের মধ্যে ভ্রাতৃত্ববোধ জাগ্রত করা",
                },
                {
                  icon: <Shield className="w-6 h-6 text-emerald-600" />,
                  title: "আমানতদারিতা",
                  description: "দায়িত্বশীলতা ও জবাবদিহিতার সংস্কৃতি",
                },
                {
                  icon: <Globe className="w-6 h-6 text-purple-600" />,
                  title: "সমাজ সেবা",
                  description: "সামাজিক দায়বদ্ধতা ও উন্নয়নমূলক কাজ",
                },
                {
                  icon: <Award className="w-6 h-6 text-red-600" />,
                  title: "মর্যাদা রক্ষা",
                  description: "আলেমদের সম্মান ও অধিকার সংরক্ষণ",
                },
                {
                  icon: <BookOpenCheck className="w-6 h-6 text-teal-600" />,
                  title: "নবুয়তের আদর্শ",
                  description: "ইখলাস ও সততার সাথে জ্ঞান বিতরণ",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start">
                    <div
                      className={`p-2 rounded-lg mr-4 ${
                        value.icon.props.className.includes("amber")
                          ? "bg-amber-100"
                          : value.icon.props.className.includes("blue")
                          ? "bg-blue-100"
                          : value.icon.props.className.includes("emerald")
                          ? "bg-emerald-100"
                          : value.icon.props.className.includes("purple")
                          ? "bg-purple-100"
                          : value.icon.props.className.includes("red")
                          ? "bg-red-100"
                          : "bg-teal-100"
                      }`}
                    >
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{value.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-16 bg-gradient-to-r from-slate-50 to-teal-50 rounded-xl p-12 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
              <div className="bg-emerald-100 p-6 rounded-full">
                <Globe className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <div className="md:w-2/3 md:pl-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                আমাদের ভিশন
              </h3>
              <p className="text-gray-700 mb-6">
                ২০৩০ সালের মধ্যে বাংলাদেশের প্রতিটি প্রাইভেট মাদ্রাসাকে একটি
                আদর্শ দ্বীনি শিক্ষা প্রতিষ্ঠানে রূপান্তর করা, যেখানে আধুনিক
                শিক্ষার সাথে ইসলামী মূল্যবোধের সমন্বয়ে সুশিক্ষিত, দক্ষ ও
                নৈতিকতাসম্পন্ন নাগরিক গড়ে উঠবে।
              </p>
              <div className="bg-white p-6 rounded-lg border border-emerald-100">
                <h4 className="font-bold text-emerald-600 mb-3">
                  কৌশলগত উদ্দেশ্য
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                      ✓
                    </span>
                    <span>জাতীয় মাদ্রাসা শিক্ষা বোর্ড প্রতিষ্ঠা</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                      ✓
                    </span>
                    <span>ডিজিটাল লার্নিং প্ল্যাটফর্ম চালু</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                      ✓
                    </span>
                    <span>১০,০০০+ শিক্ষক প্রশিক্ষণ</span>
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center mr-2">
                      ✓
                    </span>
                    <span>প্রতিটি জেলায় মডেল মাদ্রাসা</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionValues;
