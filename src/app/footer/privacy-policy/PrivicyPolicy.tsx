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
  Shield,
  AlertCircle,
  Clock,
  BookOpen,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          গোপনীয়তা নীতি
        </h1>
        <p className="text-gray-600">সর্বশেষ আপডেট: ১০ জুন, ২০২৪</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          {/* Introduction */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">ভূমিকা</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              মাদ্রাসা এসোসিয়েশন ওয়েবসাইটে আপনার গোপনীয়তা রক্ষা করা আমাদের জন্য
              অত্যন্ত গুরুত্বপূর্ণ। এই গোপনীয়তা নীতিটি ব্যাখ্যা করে যে আমরা
              কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার, এবং সুরক্ষা করি যখন
              আপনি আমাদের ওয়েবসাইট ব্যবহার করেন।
            </p>
          </div>

          {/* Information Collection */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                তথ্য সংগ্রহ
              </h2>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              আমরা নিম্নলিখিত ধরনের তথ্য সংগ্রহ করতে পারি:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <User className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>ব্যক্তিগত তথ্য (নাম, ইমেইল, ফোন নম্বর)</span>
              </li>
              <li className="flex items-start gap-2">
                <Server className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  স্বয়ংক্রিয়ভাবে সংগ্রহিত তথ্য (আইপি ঠিকানা, ব্রাউজার টাইপ)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Cookie className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>কুকিজ এবং ট্র্যাকিং টেকনোলজি</span>
              </li>
            </ul>
          </div>

          {/* Data Usage */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                তথ্য ব্যবহার
              </h2>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              আমরা আপনার তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করতে পারি:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>সেবা প্রদান এবং উন্নত করা</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>ব্যবহারকারী অভিজ্ঞতা কাস্টমাইজ করা</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>নতুন সেবা এবং বৈশিষ্ট্য উন্নয়ন</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>নিরাপত্তা এবং জালিয়াতি প্রতিরোধ</span>
              </li>
            </ul>
          </div>

          {/* Data Protection */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                তথ্য সুরক্ষা
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে প্রশাসনিক, প্রযুক্তিগত
              এবং শারীরিক নিরাপত্তা ব্যবস্থা প্রয়োগ করি। তথ্য এনক্রিপশন,
              সুরক্ষিত সার্ভার এবং প্রবেশ নিয়ন্ত্রণ ব্যবস্থা ব্যবহার করে আমরা
              আপনার ডেটা সুরক্ষা নিশ্চিত করি।
            </p>
          </div>

          {/* User Rights */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                ব্যবহারকারীর অধিকার
              </h2>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              আপনার ব্যক্তিগত তথ্য সম্পর্কে আপনার নিম্নলিখিত অধিকার রয়েছে:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <EyeOff className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>তথ্য দেখার এবং অ্যাক্সেস করার অধিকার</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>ভুল তথ্য সংশোধন করার অধিকার</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>তথ্য মুছে ফেলার অনুরোধ করার অধিকার</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>তথ্য প্রক্রিয়াকরণ সীমাবদ্ধ করার অধিকার</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">যোগাযোগ</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              গোপনীয়তা নীতি সম্পর্কিত কোন প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ
              করুন:
              <br />
              <a
                href="mailto:privacy@madrasa-association.org"
                className="text-blue-600 hover:underline"
              >
                privacy@madrasa-association.org
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          এই নীতি সময়ে সময়ে আপডেট করা হতে পারে। পরিবর্তনগুলি এই পৃষ্ঠায় পোস্ট
          করা হবে।
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
