import React from "react";
import { Quote, User, School, Award, HeartHandshake } from "lucide-react";

const ImpactStories = () => {
  const stories = [
    {
      quote:
        "BPMWA-র প্রশিক্ষণে অংশ নিয়ে আমি এখন আরবি ভাষা শেখানোর আধুনিক পদ্ধতি জানি। আমার মাদ্রাসার শিক্ষার্থীদের ফলাফল ৪০% বৃদ্ধি পেয়েছে।",
      author: "মুহাম্মদ ইব্রাহিম",
      role: "আরবি শিক্ষক, ঢাকা",
      impact: "শিক্ষার্থীদের ফলাফল ৪০% বৃদ্ধি",
      icon: <School className="w-6 h-6 text-emerald-600" />,
    },
    {
      quote:
        "আমার ছেলে হিফজ প্রতিযোগিতায় জাতীয় পর্যায়ে পুরস্কার পেয়েছে। BPMWA-র বিশেষ প্রশিক্ষণ কর্মসূচি এর পেছনে বড় ভূমিকা রেখেছে।",
      author: "আয়েশা বেগম",
      role: "অভিভাবক, চট্টগ্রাম",
      impact: "জাতীয় হিফজ প্রতিযোগিতায় বিজয়ী",
      icon: <Award className="w-6 h-6 text-blue-600" />,
    },
    {
      quote:
        "দরিদ্র পরিবার থেকে আসা সত্ত্বেও BPMWA-র বৃত্তির মাধ্যমে আমি আমার পড়ালেখা চালিয়ে যেতে পারছি। আজ আমি মাদ্রাসার সেরা শিক্ষার্থী।",
      author: "আব্দুর রহমান",
      role: "শিক্ষার্থী, রাজশাহী",
      impact: "বৃত্তিপ্রাপ্ত মেধাবী শিক্ষার্থী",
      icon: <HeartHandshake className="w-6 h-6 text-amber-600" />,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              আমাদের প্রভাব ও সাফল্য
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            আমাদের কর্মসূচি কীভাবে মানুষের জীবন বদলে দিচ্ছে
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 relative"
            >
              <Quote className="absolute top-6 left-6 w-8 h-8 text-gray-200" />

              <div className="relative z-10">
                <p className="text-gray-700 italic mb-6">``{story.quote}``</p>

                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{story.author}</h4>
                    <p className="text-gray-600 text-sm">{story.role}</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <div
                    className="bg-opacity-20 p-2 rounded-lg mr-3"
                    style={{
                      backgroundColor: story.icon.props.className.includes(
                        "emerald"
                      )
                        ? "rgba(16, 185, 129, 0.1)"
                        : story.icon.props.className.includes("blue")
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgba(245, 158, 11, 0.1)",
                    }}
                  >
                    {story.icon}
                  </div>
                  <p className="text-gray-700 font-medium">{story.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 rounded-xl p-8 text-white mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">৯৫%</div>
              <p>সন্তুষ্ট শিক্ষক</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">১০০০+</div>
              <p>বৃত্তিপ্রাপ্ত শিক্ষার্থী</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">৭৫%</div>
              <p>ফলাফল বৃদ্ধি</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">৫০+</div>
              <p>জেলায় কার্যক্রম</p>
            </div>
          </div>
        </div>

        {/* Quranic Verse */}
        <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-3xl mx-auto">
          <p className="font-arabic text-xl text-purple-600 mb-2">
            وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ
            أُنِيبُ
          </p>
          <p className="text-gray-700">
            ``আমার সাফল্য তো কেবল আল্লাহর সাহায্যেই সম্ভব, তাঁরই উপর আমি ভরসা
            করি এবং তাঁরই দিকে আমি ফিরে যাই`` (সূরা হুদ: 88)
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactStories;
