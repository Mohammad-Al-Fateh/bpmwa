import React from "react";
import {
  School,
  Users,
  BookOpenCheck,
  Network,
  ShieldCheck,
  BadgeDollarSign,
  UserPlus,
  Phone,
} from "lucide-react";
import Link from "next/link";

const DirectorEngagement = () => {
  const benefits = [
    {
      icon: <School className="w-6 h-6 text-green-600" />,
      title: "জাতীয় নেটওয়ার্ক",
      description: "সমগ্র বাংলাদেশের ৫০০+ মাদ্রাসার সাথে সংযোগ",
    },
    {
      icon: <BookOpenCheck className="w-6 h-6 text-emerald-600" />,
      title: "শিক্ষা মান উন্নয়ন",
      description: "আমাদের বিশেষায়িত কারিকুলাম ও প্রশিক্ষণ প্রোগ্রাম",
    },
    {
      icon: <BadgeDollarSign className="w-6 h-6 text-amber-600" />,
      title: "অর্থায়ন সুবিধা",
      description: "মাদ্রাসা উন্নয়নে বিশেষ অনুদান ও তহবিল ব্যবস্থাপনা",
    },
    {
      icon: <Network className="w-6 h-6 text-blue-600" />,
      title: "প্রযুক্তি সহায়তা",
      description: "ডিজিটাল লার্নিং ম্যানেজমেন্ট সিস্টেম প্রদান",
    },
    {
      icon: <Users className="w-6 h-6 text-teal-600" />,
      title: "শিক্ষক পুল",
      description: "যোগ্য শিক্ষক খুঁজে পেতে আমাদের ডাটাবেস ব্যবহার",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
      title: "গুণগত নিশ্চয়তা",
      description: "আমাদের মান নিয়ন্ত্রণ ও অ্যাক্রেডিটেশন সিস্টেম",
    },
  ];

  const registrationSteps = [
    {
      step: "১",
      title: "অনলাইন আবেদন",
      description: "আমাদের ওয়েবসাইটে রেজিস্ট্রেশন ফর্ম পূরণ করুন",
    },
    {
      step: "২",
      title: "মাদ্রাসা যাচাই",
      description: "আমাদের টিম কর্তৃক মাদ্রাসা ভেরিফিকেশন",
    },
    {
      step: "৩",
      title: "চুক্তি স্বাক্ষর",
      description: "পারস্পরিক সমঝোতা স্মারক (MOU) সম্পাদন",
    },
    {
      step: "৪",
      title: "সম্পূর্ণ একীকরণ",
      description: "আমাদের সকল সুবিধা ও প্রোগ্রামে অংশগ্রহণ",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              মাদ্রাসা পরিচালক হিসেবে যুক্ত হোন
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            আপনার মাদ্রাসাকে বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশনের
            সদস্য হিসেবে যুক্ত করুন
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <School className="w-8 h-8 text-green-600 mr-3" />
              সদস্য হওয়ার সুবিধাসমূহ
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex items-start">
                    <div
                      className="bg-opacity-20 p-2 rounded-lg mr-4"
                      style={{
                        backgroundColor: `${
                          benefit.icon.props.className.includes("green")
                            ? "rgba(147, 51, 234, 0.1)"
                            : benefit.icon.props.className.includes("emerald")
                            ? "rgba(16, 185, 129, 0.1)"
                            : benefit.icon.props.className.includes("amber")
                            ? "rgba(245, 158, 11, 0.1)"
                            : benefit.icon.props.className.includes("blue")
                            ? "rgba(59, 130, 246, 0.1)"
                            : benefit.icon.props.className.includes("teal")
                            ? "rgba(20, 184, 166, 0.1)"
                            : "rgba(220, 38, 38, 0.1)"
                        }`,
                      }}
                    >
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                সদস্য হওয়ার প্রক্রিয়া
              </h3>
              <div className="space-y-6">
                {registrationSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">সদস্য হওয়ার যোগ্যতা</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-200 mr-2">•</span>
                  <span>বাংলাদেশে নিবন্ধিত প্রাইভেট মাদ্রাসা</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-200 mr-2">•</span>
                  <span>ন্যূনতম ২ বছর পরিচালিত</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-200 mr-2">•</span>
                  <span>কমপক্ষে ৫০ জন শিক্ষার্থী</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-200 mr-2">•</span>
                  <span>আমাদের নীতিমালা মেনে চলার ইচ্ছা</span>
                </li>
              </ul>
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

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              প্রায়শই জিজ্ঞাসিত প্রশ্ন
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800">সদস্য ফি কত?</h4>
                <p className="text-gray-600">
                  প্রতি বছর মাত্র ৫,০০০ টাকা (ছোট মাদ্রাসার জন্য ৩,০০০ টাকা)
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">কতদিনে অনুমোদন পাব?</h4>
                <p className="text-gray-600">সাধারণত ৭-১০ কর্মদিবসের মধ্যে</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">
                  কোন ডকুমেন্ট প্রয়োজন?
                </h4>
                <p className="text-gray-600">
                  মাদ্রাসা রেজিস্ট্রেশন সার্টিফিকেট, পরিচালকের এনআইডি, ২ কপি
                  পাসপোর্ট সাইজ ছবি
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">যোগাযোগ</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                আরও তথ্যের জন্য আমাদের সদস্যতা বিভাগে যোগাযোগ করুন:
              </p>
              <p className="flex items-center text-gray-800">
                <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                +880 1711-234567
              </p>
              <p className="flex items-center text-gray-800">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                membership@bpmwa.org
              </p>
              <p className="flex items-center text-gray-800">
                <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                ১২৩ এলিফ্যান্ট রোড, ঢাকা ১০০০
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorEngagement;
