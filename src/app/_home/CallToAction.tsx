import React from "react";
import { HandHeart, Gem, MousePointerSquareDashed } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-700 to-teal-600 overflow-hidden">
      {/* Islamic Pattern Border */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-8 bg-repeat-x bg-[length:200px_8px]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='8' viewBox='0 0 100 8'><path d='M0,4 C15,8 30,0 50,4 C70,8 85,0 100,4' stroke='white' fill='none'/></svg>')",
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-8 bg-repeat-x bg-[length:200px_8px]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='8' viewBox='0 0 100 8'><path d='M0,4 C15,0 30,8 50,4 C70,0 85,8 100,4' stroke='white' fill='none'/></svg>')",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            data-aos="fade-up"
          >
            যোগ দিন আমাদের সাথে
          </h2>
          <p
            className="text-emerald-100 text-lg max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            দ্বীনি শিক্ষার উন্নয়নে আপনার অবদান রাখুন
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Volunteer */}
          <Link href="/volunteer">
            <div className="bg-white rounded-xl p-6 text-center border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                আপনার সময় দিন
              </h3>
              <p className="text-gray-600 mb-4">
                আমাদের মিশনে স্বেচ্ছাসেবক হোন
              </p>
              <button className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors">
                স্বেচ্ছাসেবক হোন
              </button>
            </div>
          </Link>

          {/* Donate */}
          <Link href="/donate">
            <div className="bg-white rounded-xl p-6 text-center border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                সহযোগিতা করুন
              </h3>
              <p className="text-gray-600 mb-4">মাদ্রাসা উন্নয়নে দান করুন</p>
              <button className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors">
                দান করুন
              </button>
            </div>
          </Link>

          {/* Join */}
          <Link href="/join">
            <div className="bg-white rounded-xl p-6 text-center border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointerSquareDashed className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                সংযুক্ত করুন
              </h3>
              <p className="text-gray-600 mb-4">আপনার মাদ্রাসাকে যুক্ত করুন</p>
              <button className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors">
                রেজিস্টার করুন
              </button>
            </div>
          </Link>
        </div>

        {/* Quranic Verse */}
        <div
          className="mt-12 text-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p className="text-emerald-100 font-arabic text-xl mb-2">
            مَنْ ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ
          </p>
          <p className="text-white">
            ``কে আছে যে আল্লাহকে উত্তম ঋণ দেবে? তাহলে তিনি তাকে বহুগুণে বৃদ্ধি
            করে দেবেন`` (সূরা আল-বাকারা: 245)
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
