import React from "react";
import "animate.css";
import {
  Users,
  BookOpen,
  HeartHandshake,
  MousePointerSquareDashed,
} from "lucide-react";

const AboutUsBanner = () => {
  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-teal-100 overflow-hidden">
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M30,50 Q50,30 70,50 Q50,70 30,50' fill='none' stroke='%23000000' stroke-width='0.5'/></svg>')",
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {/* Floating Icons */}
      <MousePointerSquareDashed className="absolute top-1/4 -left-20 w-40 h-40 text-emerald-300 opacity-10 animate-float" />
      <BookOpen className="absolute bottom-1/4 -right-20 w-40 h-40 text-teal-300 opacity-10 animate-float animation-delay-2000" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 animate__animated animate__fadeInDown">
            আমাদের ইতিহাস ও লক্ষ্য
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
            দ্বীনি শিক্ষার উন্নয়নে বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার
            এসোসিয়েশনের অঙ্গীকার
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate__animated animate__fadeIn animate__delay-2s">
          {[
            {
              icon: <MousePointerSquareDashed className="w-8 h-8" />,
              value: "২০১৫",
              label: "প্রতিষ্ঠার বছর",
            },
            {
              icon: <Users className="w-8 h-8" />,
              value: "১,২০০+",
              label: "সদস্য মাদ্রাসা",
            },
            {
              icon: <BookOpen className="w-8 h-8" />,
              value: "৫,০০০+",
              label: "প্রশিক্ষিত শিক্ষক",
            },
            {
              icon: <HeartHandshake className="w-8 h-8" />,
              value: "১০০+",
              label: "কর্মসূচি",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 text-center shadow-sm"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {React.cloneElement(stat.icon, {
                  className: "w-8 h-8 text-emerald-600",
                })}
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">
                {stat.value}
              </div>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quranic Verse */}
        <div className="mt-16 text-center animate__animated animate__fadeIn animate__delay-3s">
          <p className="font-arabic text-2xl text-emerald-600 mb-2">
            وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
          </p>
          <p className="text-slate-700">
            ``তোমরা ভালো কাজ ও তাকওয়ার ব্যাপারে একে অপরকে সহযোগিতা কর`` (সূরা
            আল-মায়িদা: 2)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsBanner;
