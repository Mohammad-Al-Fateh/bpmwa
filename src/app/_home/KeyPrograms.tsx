import React from "react";
import { BookOpenText, Medal, Mic, User2Icon, Users } from "lucide-react";

const KeyPrograms = () => {
  const programs = [
    {
      icon: <BookOpenText className="w-8 h-8" />,
      title: "শিক্ষক প্রশিক্ষণ",
      description: "আধুনিক শিক্ষণ পদ্ধতিতে প্রশিক্ষণ প্রদান",
      stat: "৫০০+ প্রশিক্ষিত শিক্ষক",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <User2Icon className="w-8 h-8" />,
      title: "হিফজুল কুরআন",
      description: "জাতীয় পর্যায়ে হিফজ প্রতিযোগিতা ও সনদ প্রদান",
      stat: "২০০+ প্রতিযোগী",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <Medal className="w-8 h-8" />,
      title: "বৃত্তি প্রদান",
      description: "মেধাবী ও দরিদ্র শিক্ষার্থীদের জন্য বৃত্তি",
      stat: "১০০০+ বৃত্তিপ্রাপ্ত",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "সাংস্কৃতিক প্রতিযোগিতা",
      description: "ক্বেরাত, হামদ, নাত ও ইসলামী বিতর্ক",
      stat: "৫০+ আয়োজিত ইভেন্ট",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            আমাদের প্রধান কার্যক্রম
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            দ্বীনি শিক্ষার উন্নয়নে আমাদের বিভিন্ন কর্মসূচি
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="p-6">
                <div
                  className={`${program.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
                >
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-500">
                    {program.stat}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-transparent via-gray-50 to-transparent h-1 w-full"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">৫০+</div>
            <p className="text-gray-600">মাদ্রাসা সংযুক্ত</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">৫০০+</div>
            <p className="text-gray-600">প্রশিক্ষিত শিক্ষক</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">১০০০+</div>
            <p className="text-gray-600">বৃত্তিপ্রাপ্ত শিক্ষার্থী</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">৫০+</div>
            <p className="text-gray-600">সফল ইভেন্ট</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyPrograms;
