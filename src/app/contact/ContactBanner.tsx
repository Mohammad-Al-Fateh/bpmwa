import React from "react";
import "animate.css";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactBanner = () => {
  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-50 to-teal-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full animate-[pulse_20s_infinite]">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-200 mix-blend-multiply animate-[float_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-indigo-200 mix-blend-multiply animate-[float_10s_ease-in-out_infinite_reverse]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate__animated animate__fadeIn">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 animate__animated animate__fadeInDown">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
            যে কোনো প্রশ্ন বা সহায়তার জন্য নিচের মাধ্যমগুলোতে যোগাযোগ করতে
            পারেন
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate__animated animate__fadeInUp animate__delay-1s">
          {[
            {
              icon: <Mail className="w-8 h-8 text-blue-600" />,
              title: "ইমেইল",
              content: "info@madrasa-welfare.org",
              link: "mailto:info@madrasa-welfare.org",
              animation: "animate__bounceIn",
            },
            {
              icon: <Phone className="w-8 h-8 text-blue-600" />,
              title: "ফোন",
              content: "+৮৮০ ১৭XX-XXXXXX",
              link: "tel:+88017XXXXXXXX",
              animation: "animate__bounceIn",
            },
            {
              icon: <MapPin className="w-8 h-8 text-blue-600" />,
              title: "ঠিকানা",
              content: "১২৩ ইসলামী টাওয়ার, মতিঝিল, ঢাকা-১০০০",
              animation: "animate__bounceIn",
            },
            {
              icon: <Clock className="w-8 h-8 text-blue-600" />,
              title: "কর্মঘণ্টা",
              content: "শনি-বৃহস্পতি: সকাল ৯টা - বিকাল ৫টা",
              animation: "animate__bounceIn",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                item.animation
              } animate__animated animate__delay-${index + 1}s`}
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-slate-800 mb-2">
                {item.title}
              </h3>
              {item.link ? (
                <a
                  href={item.link}
                  className="text-slate-600 hover:text-blue-600 transition-colors text-center block"
                >
                  {item.content}
                </a>
              ) : (
                <p className="text-slate-600 text-center">{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
