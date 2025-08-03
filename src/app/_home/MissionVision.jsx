import {
  Award,
  BookOpen,
  Users,
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-emerald-200 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-200 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            আমাদের লক্ষ্য ও উদ্দেশ্য
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            আমরা একটি ঐক্যবদ্ধ আলেম সমাজ গঠনের মাধ্যমে সমাজের সার্বিক উন্নয়নে
            কাজ করে যাচ্ছি
          </p>
          <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all hover:-translate-y-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-emerald-100 p-3 rounded-xl mr-4">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">মিশন</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              "আলেম সমাজের ঐক্য ও মাদ্রাসার উন্নয়ন এবং দ্বীনি শিক্ষার
              মানোন্নয়নের মাধ্যমে সমাজের কল্যাণ সাধন। আমরা বিশ্বাস করি যে
              ঐক্যবদ্ধ প্রচেষ্টার মাধ্যমেই সমাজের প্রকৃত পরিবর্তন সম্ভব।"
            </p>
          </div>

          <div
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all hover:-translate-y-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">ভিশন</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              "যুগোপযোগী দ্বীনি শিক্ষার সমন্বয়ে তাকওয়াবান, দক্ষ ও আদর্শ নাগরিক
              গড়ে তোলা। আমাদের লক্ষ্য এমন একটি সমাজ গঠন যেখানে নৈতিকতা ও জ্ঞানের
              সমন্বয়ে মানুষ আলোকিত জীবন যাপন করবে।"
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            আমাদের মূলনীতি
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            আমাদের সকল কার্যক্রম পরিচালিত হয় কিছু মৌলিক নীতির ভিত্তিতে
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="w-8 h-8 text-white" />,
              bg: "bg-blue-500",
              title: "ঐক্যবদ্ধ আলেম সমাজ",
              desc: "মতপার্থক্য ভুলে ঐক্যের প্রাচীর গড়ে তোলা",
            },
            {
              icon: <BookOpen className="w-8 h-8 text-white" />,
              bg: "bg-emerald-500",
              title: "কুরআন-সুন্নাহ ভিত্তিক",
              desc: "প্রামাণিক দ্বীনি শিক্ষার প্রচার",
            },
            {
              icon: <HeartHandshake className="w-8 h-8 text-white" />,
              bg: "bg-amber-500",
              title: "সামাজিক সম্প্রীতি",
              desc: "সকল স্তরের মানুষের মধ্যে সম্প্রীতি প্রতিষ্ঠা",
            },
            {
              icon: <Award className="w-8 h-8 text-white" />,
              bg: "bg-purple-500",
              title: "মানসম্মত শিক্ষা",
              desc: "শিক্ষক ও শিক্ষার্থীদের দক্ষতা উন্নয়ন",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div
                className={`${item.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto`}
              >
                {item.icon}
              </div>
              <h4 className="font-bold text-gray-800 text-lg mb-2 text-center">
                {item.title}
              </h4>
              <p className="text-gray-600 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
