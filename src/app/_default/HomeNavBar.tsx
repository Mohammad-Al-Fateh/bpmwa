/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  BookOpen,
  GraduationCap,
  ArrowUpNarrowWide,
  University,
  LibraryBig,
  Contact,
  ShieldCheck,
  ClipboardList,
  History,
  School,
  ClipboardCheck,
  IdCard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "animate.css";

const HomeNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const menuItems = [
    { name: "হোম", path: "/", icon: <BookOpen size={16} /> },
    { name: "ভূমিকা", path: "/roles", icon: <GraduationCap size={16} /> },
    {
      name: "প্রগতি",
      path: "/progress",
      icon: <ArrowUpNarrowWide size={16} />,
    },
    {
      name: "রেজাল্ট",
      path: "/result",
      icon: <University size={16} />,
    },
    {
      name: "আমাদের সম্পর্কে",
      path: "/about-us",
      icon: <LibraryBig size={16} />,
    },
    {
      name: "এডমিড কার্ড",
      path: "/admit-card",
      icon: <IdCard size={16} />,
    },
    { name: "যোগাযোগ", path: "/contact", icon: <Contact size={16} /> },
  ];

  const renderMenuButtons = (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:bg-blue-50/50 rounded-lg animate__animated animate__fadeIn"
        >
          {item.icon && (
            <span className="text-blue-500 hidden">{item.icon}</span>
          )}
          {item.name}
        </Link>
      ))}
    </>
  );

  const authButtons = (
    <div className="flex gap-2 items-center">
      <Link href="/register" onClick={() => setIsOpen(false)}>
        <button className="relative overflow-hidden h-9 px-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 group">
          <span className="relative z-10 flex items-center gap-1">
            <UserPlus size={14} />
            নিবন্ধন
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-500"></span>
        </button>
      </Link>
      {user ? (
        <Link
          href={user.role === "student" ? "/student-profile" : "/dashboard"}
          onClick={() => setIsOpen(false)}
        >
          <button className="relative h-9 w-9 flex items-center justify-center rounded-full bg-white border border-blue-200 text-blue-600 shadow-sm hover:shadow-md transition-all duration-300 group">
            <Image
              src={
                user?.image ||
                "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
              }
              alt={user?.name}
              width={50}
              height={50}
              className="h-8 w-8 rounded-full"
            />
          </button>
        </Link>
      ) : (
        <Link href="/login" onClick={() => setIsOpen(false)}>
          <button className="relative h-9 w-9 flex items-center justify-center rounded-full bg-white border border-blue-200 text-blue-600 shadow-sm hover:shadow-md transition-all duration-300 group">
            <LogIn
              size={16}
              className="group-hover:scale-110 text-blue-600 transition-transform"
            />
          </button>
        </Link>
      )}
    </div>
  );

  return (
    <>
      <nav className="bg-white/40 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex justify-start items-center gap-2">
                <Image
                  src="/logo.jpg"
                  width={40}
                  height={40}
                  alt="Logo"
                  className="h-10 rounded-full w-auto"
                />
                <h1 className="font-bold leading-tight">
                  <span className="text-xl block bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 bg-clip-text text-transparent leading-[1]">
                    মাদ্রাসা
                  </span>
                  <span className="text-sm block bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent leading-[1]">
                    এসোসিয়েশন
                  </span>
                </h1>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex gap-1">{renderMenuButtons}</div>
              <div className="ml-2">{authButtons}</div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              {authButtons}
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50/30 focus:outline-none transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden h-screen fixed inset-0 z-50 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="relative w-full max-w-xs h-full bg-white/95 backdrop-blur-lg shadow-xl">
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex justify-between items-center px-4 pt-4 pb-2 border-gray-100 border-b">
                <Image
                  src="/logo.jpg"
                  width={100}
                  height={35}
                  alt="Logo"
                  className="h-8 rounded-full w-auto"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50/30 focus:outline-none transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-3 py-4 space-y-1">
                {[
                  ...menuItems,
                  {
                    name: "গোপনীয়তা নীতি",
                    path: "/footer/privacy-policy",
                    icon: <ShieldCheck className="w-4 h-4" />,
                  },
                  {
                    name: "পরীক্ষা ব্যবস্থাপনা",
                    path: "/footer/exam-system",
                    icon: <ClipboardList className="w-4 h-4" />,
                  },
                  {
                    name: "আমাদের ইতিহাস",
                    path: "/footer/history",
                    icon: <History className="w-4 h-4" />,
                  },
                  {
                    name: "সদস্য মাদ্রাসাসমূহ",
                    path: "/footer/madrasha-member",
                    icon: <School className="w-4 h-4" />,
                  },
                  {
                    name: "পরীক্ষা সেন্টার",
                    path: "/footer/exam-center",
                    icon: <ClipboardCheck className="w-4 h-4" />,
                  },
                ].map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    {item.icon && (
                      <span className="text-blue-500">{item.icon}</span>
                    )}
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto p-4 space-y-3 border-t">
                <Link
                  href="/register"
                  className="block"
                  onClick={() => setIsOpen(false)}
                >
                  <button className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium flex items-center justify-center gap-1 hover:shadow-lg transition-all duration-300">
                    <UserPlus size={14} />
                    নিবন্ধন করুন
                  </button>
                </Link>

                {user ? (
                  <Link
                    href={
                      user.role == "student" ? "/student-profile" : "/dashboard"
                    }
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="w-full py-2 px-4 rounded-full bg-white border border-blue-200 text-blue-600 text-sm font-medium flex items-center justify-center gap-1 hover:shadow-md transition-all duration-300">
                      <LogIn size={14} />
                      {user.role} panel
                    </button>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="w-full py-2 px-4 rounded-full bg-white border border-blue-200 text-blue-600 text-sm font-medium flex items-center justify-center gap-1 hover:shadow-md transition-all duration-300">
                      <LogIn size={14} />
                      লগইন
                    </button>
                  </Link>
                )}
                <a
                  href="https://code-biruny.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-bold text-center  text-sm transition-colors"
                >
                  Developed by Code Biruni
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-black/20 backdrop-blur-sm z-40 animate__animated animate__fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default HomeNavBar;
