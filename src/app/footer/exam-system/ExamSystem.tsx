import React from "react";
import {
  ShieldCheck,
  Lock,
  User,
  Database,
  Cookie,
  Server,
  EyeOff,
  Mail,
  AlertCircle,
  Clock,
  BookOpen,
  ChevronRight,
  Globe,
  ShieldHalf,
  FileText,
  HardDrive,
  Network,
  BellOff,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100/80 rounded-full mb-4">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          গোপনীয়তা নীতি
        </h1>
        <p className="text-gray-600">সর্বশেষ সংশোধন: ১০ জুন, ২০২৪</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8 md:p-10">
          {/* Introduction */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                ভূমিকা ও সংক্ষিপ্ত বিবরণ
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                মাদ্রাসা এসোসিয়েশন বাংলাদেশের ইসলামী শিক্ষা প্রতিষ্ঠানসমূহের
                একটি ঐক্যবদ্ধ প্ল্যাটফর্ম। আমরা আমাদের ব্যবহারকারীদের গোপনীয়তা
                রক্ষাকে অত্যন্ত গুরুত্বের সাথে বিবেচনা করি। এই গোপনীয়তা নীতিটি
                ব্যাখ্যা করে যে আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ,
                ব্যবহার, সংরক্ষণ এবং সুরক্ষা করি যখন আপনি আমাদের ওয়েবসাইট বা
                মোবাইল অ্যাপ্লিকেশন ব্যবহার করেন।
              </p>
              <p>
                আমাদের পরিষেবা ব্যবহার করার মাধ্যমে, আপনি এই গোপনীয়তা নীতিতে
                বর্ণিত শর্তাবলীতে সম্মত হচ্ছেন। যদি আপনি আমাদের গোপনীয়তা নীতির
                সাথে একমত না হন, অনুগ্রহ করে আমাদের পরিষেবা ব্যবহার করবেন না।
              </p>
            </div>
          </section>

          {/* Information Collection */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                তথ্য সংগ্রহ পদ্ধতি
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-gray-700">
                আমরা নিম্নলিখিত পদ্ধতিতে আপনার তথ্য সংগ্রহ করতে পারি:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Direct Collection */}
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <h3 className="font-medium text-gray-800">
                      সরাসরি প্রদত্ত তথ্য
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                      <span>রেজিস্ট্রেশন ফরম পূরণের সময়</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                      <span>যোগাযোগ ফরম জমা দেওয়ার সময়</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                      <span>সদস্যতা নবায়নের সময়</span>
                    </li>
                  </ul>
                </div>

                {/* Automatic Collection */}
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <HardDrive className="w-5 h-5 text-blue-500" />
                    <h3 className="font-medium text-gray-800">
                      স্বয়ংক্রিয় সংগ্রহ
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                      <span>কুকিজ এবং ট্র্যাকিং টেকনোলজি</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                      <span>লগ ফাইল এবং বিশ্লেষণ টুল</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                      <span>ডিভাইস তথ্য (আইপি, ব্রাউজার টাইপ)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Data Collected */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                সংগৃহীত তথ্যের ধরন
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: <User className="w-5 h-5 text-blue-500" />,
                  title: "ব্যক্তিগত তথ্য",
                  items: ["নাম", "ইমেইল ঠিকানা", "মোবাইল নম্বর", "ঠিকানা"],
                },
                {
                  icon: <Network className="w-5 h-5 text-blue-500" />,
                  title: "প্রযুক্তিগত তথ্য",
                  items: [
                    "আইপি ঠিকানা",
                    "ব্রাউজার টাইপ",
                    "ডিভাইস তথ্য",
                    "অপারেটিং সিস্টেম",
                  ],
                },
                {
                  icon: <Cookie className="w-5 h-5 text-blue-500" />,
                  title: "ব্যবহার সংক্রান্ত তথ্য",
                  items: [
                    "পৃষ্ঠা ভিউ",
                    "সেশনের সময়",
                    "ক্লিক প্যাটার্ন",
                    "পছন্দনীয় সেটিংস",
                  ],
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50/30 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {category.icon}
                    <h3 className="font-medium text-gray-800">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Data Usage */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <ShieldHalf className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                তথ্য ব্যবহারের উদ্দেশ্য
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "সেবা প্রদান",
                  description:
                    "আপনার অ্যাকাউন্ট তৈরি এবং পরিচালনা, পরীক্ষা ব্যবস্থাপনা এবং ফলাফল প্রকাশ করা।",
                },
                {
                  title: "যোগাযোগ",
                  description:
                    "আপনাকে গুরুত্বপূর্ণ নোটিশ, আপডেট এবং প্রশাসনিক বার্তা প্রেরণ করা।",
                },
                {
                  title: "সেবা উন্নয়ন",
                  description:
                    "আমাদের ওয়েবসাইট এবং মোবাইল অ্যাপ্লিকেশনের কার্যকারিতা উন্নত করা।",
                },
                {
                  title: "নিরাপত্তা",
                  description:
                    "জালিয়াতি সনাক্তকরণ এবং প্রতিরোধ, নিরাপত্তা ঝুঁকি মূল্যায়ন করা।",
                },
                {
                  title: "কানুনী প্রয়োজনে",
                  description:
                    "আইন প্রয়োগকারী সংস্থা বা সরকারী অনুরোধে তথ্য প্রদান করা।",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-white hover:bg-blue-50/30 rounded-lg transition-colors border border-gray-100"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                তথ্য শেয়ারিং ও প্রকাশ
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                আমরা আপনার ব্যক্তিগত তথ্য নিম্নলিখিত অবস্থায় তৃতীয় পক্ষের সাথে
                শেয়ার করতে পারি:
              </p>
              <ul className="space-y-3">
                {[
                  "সেবা প্রদানকারী (হোস্টিং, পেমেন্ট প্রসেসিং)",
                  "কানুনী বাধ্যবাধকতা (আদালতের আদেশ, সরকারী অনুরোধ)",
                  "ব্যবসায়িক স্থানান্তর (বিভাজন, একত্রীকরণ বা বিক্রয়ের ক্ষেত্রে)",
                  "আপনার সম্মতিতে (স্পষ্ট অনুমতি সাপেক্ষে)",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2">
                আমরা কখনই আপনার ব্যক্তিগত তথ্য বিজ্ঞাপন বা মার্কেটিং উদ্দেশ্যে
                তৃতীয় পক্ষের সাথে বিক্রি বা ভাগ করব না।
              </p>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                তথ্য সুরক্ষা ব্যবস্থা
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  প্রযুক্তিগত সুরক্ষা
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>এন্ড-টু-এন্ড এনক্রিপশন (SSL/TLS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>নিয়মিত সিকিউরিটি অডিট</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>ফায়ারওয়াল এবং ইন্ট্রুজন ডিটেকশন</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <Server className="w-5 h-5 text-green-500" />
                  প্রশাসনিক সুরক্ষা
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>ডেটা অ্যাক্সেস কন্ট্রোল</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>কর্মচারী গোপনীয়তা প্রশিক্ষণ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>ঘটনা প্রতিক্রিয়া পরিকল্পনা</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                ব্যবহারকারীর অধিকার
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <EyeOff className="w-5 h-5 text-blue-500" />,
                  title: "অ্যাক্সেসের অধিকার",
                  description:
                    "আপনার ব্যক্তিগত তথ্য কী সংগ্রহ করা হয়েছে তা জানার অধিকার",
                },
                {
                  icon: <AlertCircle className="w-5 h-5 text-blue-500" />,
                  title: "সংশোধনের অধিকার",
                  description:
                    "ভুল বা অসম্পূর্ণ তথ্য সংশোধন করার অনুরোধ করার অধিকার",
                },
                {
                  icon: <BellOff className="w-5 h-5 text-blue-500" />,
                  title: "মুছে ফেলার অধিকার",
                  description:
                    "নির্দিষ্ট শর্তে আপনার তথ্য মুছে ফেলার অনুরোধ করার অধিকার",
                },
                {
                  icon: <Clock className="w-5 h-5 text-blue-500" />,
                  title: "প্রক্রিয়াকরণ সীমাবদ্ধতা",
                  description:
                    "নির্দিষ্ট পরিস্থিতিতে তথ্য প্রক্রিয়াকরণ সীমাবদ্ধ করার অধিকার",
                },
              ].map((right, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50/30 rounded-lg border border-blue-100 h-full"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {right.icon}
                    <h3 className="font-medium text-gray-800">{right.title}</h3>
                  </div>
                  <p className="text-sm text-gray-700">{right.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                আপনার অধিকার প্রয়োগ করতে বা কোন প্রশ্ন থাকলে আমাদের গোপনীয়তা
                দলকে ইমেইল করুন:
                <a
                  href="mailto:privacy@madrasa-association.org"
                  className="text-blue-600 hover:underline ml-1"
                >
                  privacy@madrasa-association.org
                </a>
              </p>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                নীতি আপডেট
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। আমরা নীতিতে
                উল্লেখযোগ্য পরিবর্তন করলে, আমরা আমাদের ওয়েবসাইটে সংশোধিত
                সংস্করণ পোস্ট করব এবং প্রয়োজনে ইমেইল নোটিফিকেশন পাঠাব।
              </p>
              <div className="p-4 bg-yellow-50/50 rounded-lg border border-yellow-100">
                <h3 className="font-medium text-gray-800 mb-2">
                  গুরুত্বপূর্ণ নোট:
                </h3>
                <p className="text-sm">
                  এই নীতিতে কোনো পরিবর্তন করা হলে, এই পৃষ্ঠার শীর্ষে ``সর্বশেষ
                  সংশোধন`` তারিখ আপডেট করা হবে। পরিবর্তনগুলি পোস্ট করার পর আপনি
                  যদি আমাদের পরিষেবা ব্যবহার চালিয়ে যান, তাহলে আপনি সংশোধিত
                  নীতিতে সম্মত হচ্ছেন বলে বিবেচিত হবে।
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                যোগাযোগ তথ্য
              </h2>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                এই গোপনীয়তা নীতি সম্পর্কিত কোন প্রশ্ন বা উদ্বেগ থাকলে, অনুগ্রহ
                করে আমাদের সাথে যোগাযোগ করুন:
              </p>
              <p className="font-medium">মাদ্রাসা এসোসিয়েশন গোপনীয়তা দল</p>
              <p>
                ইমেইল:{" "}
                <a
                  href="mailto:privacy@madrasa-association.org"
                  className="text-blue-600 hover:underline"
                >
                  privacy@madrasa-association.org
                </a>
              </p>
              <p>
                ফোন:{" "}
                <a
                  href="tel:+880123456789"
                  className="text-blue-600 hover:underline"
                >
                  +৮৮০ ১২৩৪ ৫৬৭৮৯
                </a>
              </p>
              <p>ঠিকানা: ১২৩ ইসলামী রোড, ঢাকা-১২০৬, বাংলাদেশ</p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          এই গোপনীয়তা নীতিটি মাদ্রাসা এসোসিয়েশন ওয়েবসাইট এবং সমস্ত সহযোগী
          ডিজিটাল প্ল্যাটফর্মে প্রযোজ্য।
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
