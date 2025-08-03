import React from "react";
import {
  Target,
  Users,
  BookOpenCheck,
  Globe,
  Star,
  Phone,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const FutureGoals = () => {
  const goals = [
    {
      icon: <Target className="w-8 h-8 text-emerald-600" />,
      title: "জাতীয় মাদ্রাসা বোর্ড প্রতিষ্ঠা",
      description: "২০২৬ সালের মধ্যে স্বাধীন মাদ্রাসা শিক্ষা বোর্ড গঠন",
      timeline: "২০২৬",
    },
    {
      icon: <BookOpenCheck className="w-8 h-8 text-blue-600" />,
      title: "ডিজিটাল লার্নিং প্ল্যাটফর্ম",
      description: "১০০% মাদ্রাসায় ডিজিটাল শিক্ষা ব্যবস্থা চালু",
      timeline: "২০২৫",
    },
    {
      icon: <Globe className="w-8 h-8 text-amber-600" />,
      title: "আন্তর্জাতিক মানসম্মত শিক্ষা",
      description: "২০টি দেশের সাথে শিক্ষা বিনিময় প্রোগ্রাম",
      timeline: "২০২৭",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "১ মিলিয়ন শিক্ষার্থী",
      description: "আমাদের নেটওয়ার্কভুক্ত মাদ্রাসায় শিক্ষার্থী সংখ্যা",
      timeline: "২০২৮",
    },
    {
      icon: <Star className="w-8 h-8 text-red-600" />,
      title: "মডেল মাদ্রাসা প্রতিষ্ঠা",
      description: "প্রতিটি জেলায় ১টি করে আদর্শ মাদ্রাসা",
      timeline: "২০২৫",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              আমাদের ভবিষ্যৎ লক্ষ্য
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            আগামী ৫ বছরের জন্য আমাদের কৌশলগত পরিকল্পনা
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 relative overflow-hidden group"
            >
              {/* Timeline badge */}
              <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                {goal.timeline}
              </div>

              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${
                  goal.icon.props.className.includes("emerald")
                    ? "bg-emerald-100"
                    : goal.icon.props.className.includes("blue")
                    ? "bg-blue-100"
                    : goal.icon.props.className.includes("amber")
                    ? "bg-amber-100"
                    : goal.icon.props.className.includes("purple")
                    ? "bg-purple-100"
                    : "bg-red-100"
                }`}
              >
                {goal.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {goal.title}
              </h3>
              <p className="text-gray-600 mb-4">{goal.description}</p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.random() * 30 + 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100 inline-block">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              আমাদের এই যাত্রায় অংশ নিন
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              আপনার সক্ষমতা অনুযায়ী শিক্ষক, স্বেচ্ছাসেবক বা দাতা হিসেবে আমাদের
              সাথে যুক্ত হোন
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
        </div>
      </div>
    </section>
  );
};

export default FutureGoals;
