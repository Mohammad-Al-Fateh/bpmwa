"use client";
import React, { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "BPMWA-র প্রশিক্ষণে আমার শিক্ষাদানের পদ্ধতি সম্পূর্ণ বদলে গেছে। এখন আমি আরো কার্যকরভাবে কুরআন শিক্ষা দিতে পারছি।",
      author: "মুহাম্মদ ইব্রাহিম",
      role: "হিফজ শিক্ষক, ঢাকা",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "আমার মাদ্রাসা BPMWA-তে যোগ দেওয়ার পর থেকে শিক্ষার্থীদের উপস্থিতি ও ফলাফল উল্লেখযোগ্য হারে বেড়েছে।",
      author: "আয়েশা সিদ্দিকা",
      role: "প্রধান শিক্ষিকা, চট্টগ্রাম",
      rating: 4,
    },
    {
      id: 3,
      quote:
        "বৃত্তি পেয়ে আমি আমার পড়ালেখা চালিয়ে যেতে পারছি। আল্লাহ BPMWA-কে উত্তম প্রতিদান দিন।",
      author: "আব্দুর রহমান",
      role: "শিক্ষার্থী, রাজশাহী",
      rating: 5,
    },
    {
      id: 4,
      quote:
        "জাতীয় হিফজ প্রতিযোগিতায় অংশগ্রহণ আমার সন্তানের আত্মবিশ্বাস বাড়িয়েছে।",
      author: "ফাতেমা খাতুন",
      role: "অভিভাবক, সিলেট",
      rating: 5,
    },
    {
      id: 5,
      quote: "শিক্ষক প্রশিক্ষণ কর্মশালা আমার পেশাদার বিকাশে সহায়ক হয়েছে।",
      author: "ইমরান হোসেন",
      role: "আরবি শিক্ষক, খুলনা",
      rating: 4,
    },
    {
      id: 6,
      quote:
        "BPMWA-র সাংস্কৃতিক কর্মসূচি আমাদের শিক্ষার্থীদের সৃজনশীলতা প্রকাশের সুযোগ করে দিয়েছে।",
      author: "জাকির হোসেন",
      role: "সাংস্কৃতিক সম্পাদক, বরিশাল",
      rating: 5,
    },
    {
      id: 7,
      quote:
        "মাদ্রাসা নেটওয়ার্কিং এর মাধ্যমে আমরা অনেক মূল্যবান সম্পদ শেয়ার করতে পারি।",
      author: "ইউসুফ আলী",
      role: "প্রতিষ্ঠাতা, রংপুর",
      rating: 4,
    },
    {
      id: 8,
      quote:
        "ওয়েবিনার সিরিজের মাধ্যমে আমরা আধুনিক শিক্ষা পদ্ধতি সম্পর্কে জানতে পেরেছি।",
      author: "সাদিয়া ইসলাম",
      role: "শিক্ষিকা, কুমিল্লা",
      rating: 5,
    },
    {
      id: 9,
      quote:
        "BPMWA-র মাধ্যমে আমরা জাতীয় পর্যায়ে আমাদের মাদ্রাসার সাফল্য প্রদর্শন করতে পেরেছি।",
      author: "রফিকুল ইসলাম",
      role: "পরিচালক, ময়মনসিংহ",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Show 3 testimonials at a time
  const visibleTestimonials = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }

  // Auto-rotate every 5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            সাফল্যের গল্প
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            আমাদের সদস্যদের মূল্যবান অভিজ্ঞতা
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Quote className="w-8 h-8 text-emerald-400 rotate-180 mb-4" />
                <p className="text-gray-700 italic mb-6">
                  ``{testimonial.quote}``
                </p>

                <div className="flex items-center">
                  <div className="bg-emerald-100 p-2 rounded-full mr-4">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-emerald-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-emerald-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex <= index && index < currentIndex + 3
                  ? "bg-emerald-600"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
