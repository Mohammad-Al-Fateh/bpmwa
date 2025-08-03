"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-emerald-50 to-teal-100 flex flex-col items-center justify-center p-6">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply animate-blob"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
        {/* Header with logo */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 flex flex-col items-center">
          <div className="w-24 h-24 relative mb-4">
            <Image
              src="/logo.jpg"
              alt="Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-white text-center">404</h1>
        </div>

        {/* Main content */}
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you`re looking for doesn`t exist or has been moved.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center px-6 py-3 bg-white text-emerald-600 border border-emerald-200 rounded-lg font-medium hover:bg-emerald-50 transition-all shadow-sm"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center text-gray-500 mb-2 sm:mb-0">
            <Phone className="w-4 h-4 mr-2" />
            <span>Need help? Call +880 1234 567890</span>
          </div>
          <button
            onClick={() => router.back()}
            className="text-sm text-emerald-600 hover:text-emerald-800 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to previous page
          </button>
        </div>
      </div>
    </div>
  );
}
