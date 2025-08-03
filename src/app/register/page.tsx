import Link from "next/link";
import React from "react";
import { FaSchool, FaUserGraduate } from "react-icons/fa";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">
            Student Registration
          </h1>
          <p className="text-lg text-teal-600">
            Choose your registration method to get started
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Institution Registration Card */}
          <Link href="/register/fromInstitution">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6 mx-auto">
                  <FaSchool className="text-3xl text-emerald-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                  Institution Registration
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                  Register through your educational institution with official
                  credentials.
                </p>
                <div className="text-center">
                  <span className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium transition-colors duration-300 hover:bg-emerald-700">
                    Register Now
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Student Self-Registration Card */}
          <Link href="/register/by-student">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6 mx-auto">
                  <FaUserGraduate className="text-3xl text-teal-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                  Direct Student Registration
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                  Register directly as a student with your personal information.
                </p>
                <div className="text-center">
                  <span className="inline-block px-6 py-2 bg-teal-600 text-white rounded-full text-sm font-medium transition-colors duration-300 hover:bg-teal-700">
                    Register Now
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-teal-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold underline hover:text-teal-800"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
