import React from "react";
import {
  UserRound,
  GraduationCap,
  Globe,
  BookOpenText,
  HeartHandshake,
  Award,
  ShieldCheck,
  BookHeart,
  MousePointerSquareDashed,
} from "lucide-react";

const TeamLeadership = () => {
  const leadership = [
    {
      name: "মুফতি আব্দুল্লাহ আল মামুন",
      role: "সভাপতি",
      bio: "আল-আজহার বিশ্ববিদ্যালয় থেকে ফিকহে বিশেষজ্ঞ, ২০ বছরের বেশি অভিজ্ঞতাসম্পন্ন ইসলামী স্কলার",
      expertise: ["ফিকহুল ইসলাম", "মাদ্রাসা প্রশাসন", "শিক্ষা নীতি"],
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
    },
    {
      name: "ড. আয়েশা সিদ্দিকা",
      role: "সাধারণ সম্পাদক",
      bio: "ইসলামিক শিক্ষায় পিএইচডিধারী, নারী শিক্ষা বিশেষজ্ঞ ও শিক্ষা সংশোধনী কর্মসূচির পরিচালক",
      expertise: [
        "শিক্ষা ব্যবস্থাপনা",
        "মহিলা শিক্ষা",
        "কারিকুলাম ডেভেলপমেন্ট",
      ],
      icon: <BookOpenText className="w-5 h-5 text-blue-600" />,
    },
    {
      name: "প্রফেসর মুহাম্মদ ইউসুফ আলী",
      role: "সাংগঠনিক সম্পাদক",
      bio: "৩০০+ মাদ্রাসা প্রতিষ্ঠায় ভূমিকা, জাতীয় পর্যায়ের সংগঠক ও প্রশিক্ষণ বিশেষজ্ঞ",
      expertise: ["সংগঠন বিকাশ", "প্রশিক্ষণ কর্মসূচি", "মাদ্রাসা নেটওয়ার্কিং"],
      icon: <Globe className="w-5 h-5 text-purple-600" />,
    },
  ];

  const departments = [
    {
      name: "শিক্ষা উন্নয়ন বিভাগ",
      description: "মাদ্রাসা শিক্ষার মানোন্নয়ন ও কারিকুলাম ডেভেলপমেন্ট",
      icon: <BookHeart className="w-8 h-8 text-emerald-600" />,
      stats: "৫০+ প্রশিক্ষণ কর্মসূচি",
    },
    {
      name: "শিক্ষক বিষয়ক বিভাগ",
      description: "শিক্ষকদের পেশাগত উন্নয়ন ও কল্যাণ",
      icon: <UserRound className="w-8 h-8 text-blue-600" />,
      stats: "৫,০০০+ প্রশিক্ষিত শিক্ষক",
    },
    {
      name: "সামাজিক সহায়তা বিভাগ",
      description: "দরিদ্র শিক্ষার্থীদের জন্য বৃত্তি ও সুযোগ সৃষ্টি",
      icon: <HeartHandshake className="w-8 h-8 text-amber-600" />,
      stats: "১০০০+ বৃত্তিপ্রাপ্ত",
    },
    {
      name: "গুণগত মান নিশ্চিতকরণ",
      description: "মাদ্রাসার শিক্ষার মান তদারকি ও মূল্যায়ন",
      icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
      stats: "২০০+ মাদ্রাসা অডিট",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              আমাদের নেতৃত্ব ও সংগঠন
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            যারা নেতৃত্ব দিচ্ছেন এবং আমাদের কার্যক্রমকে এগিয়ে নিচ্ছেন
          </p>
        </div>

        {/* Leadership Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {leadership.map((leader, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 flex justify-center">
                <div className="bg-white p-1 rounded-full">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-emerald-600">
                    {leader.name.charAt(0)}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {leader.name}
                </h3>
                <span className="inline-block bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {leader.role}
                </span>
                <p className="text-gray-600 mb-4">{leader.bio}</p>

                <h4 className="font-medium text-gray-800 mb-2">বিশেষজ্ঞতা:</h4>
                <ul className="space-y-2">
                  {leader.expertise.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-emerald-500 mr-2">
                        {leader.icon}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Departments Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center">
            <MousePointerSquareDashed className="w-8 h-8 text-emerald-600 mr-3" />
            আমাদের প্রধান বিভাগসমূহ
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: dept.icon.props.className.includes(
                      "emerald"
                    )
                      ? "rgba(16, 185, 129, 0.1)"
                      : dept.icon.props.className.includes("blue")
                      ? "rgba(59, 130, 246, 0.1)"
                      : dept.icon.props.className.includes("amber")
                      ? "rgba(245, 158, 11, 0.1)"
                      : "rgba(147, 51, 234, 0.1)",
                  }}
                >
                  {dept.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{dept.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{dept.description}</p>
                <p className="text-emerald-600 font-medium text-sm">
                  {dept.stats}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Council */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Award className="w-8 h-8 mr-3" />
            উপদেষ্টা পরিষদ
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "মুফতি মুহাম্মদ আব্দুল হালীম (প্রখ্যাত ইসলামী স্কলার)",
              "ড. ফারহানা ইয়াসমীন (শিক্ষা বিশেষজ্ঞ)",
              "প্রফেসর এম. এ. মান্নান (মাদ্রাসা শিক্ষা বোর্ডের সাবেক চেয়ারম্যান)",
              "মাওলানা ইব্রাহীম খলিল (আন্তর্জাতিক ইসলামী সংগঠনের প্রতিনিধি)",
              "ড. কামরুল হাসান (অর্থনীতি বিশেষজ্ঞ)",
              "আইনুন নাহার (সামাজিক উন্নয়ন কর্মী)",
            ].map((member, index) => (
              <div key={index} className="flex items-start">
                <span className="text-emerald-200 mr-2">•</span>
                <span>{member}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 inline-block max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              আমাদের সাথে যুক্ত হোন
            </h3>
            <p className="text-gray-600 mb-6">
              আপনি যদি ইসলামী শিক্ষার উন্নয়নে কাজ করতে আগ্রহী হন, আমাদের টিমের
              অংশ হওয়ার জন্য আবেদন করুন
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-bold hover:shadow-lg transition-all">
              ক্যারিয়ার সুযোগ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamLeadership;
