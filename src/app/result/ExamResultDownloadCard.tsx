/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { Loader2, Download, Award, Percent } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

// interface Subject {
//   name: string;
//   totalNumber: number;
//   getNumber: number;
// }

// interface ResultData {
//   exam: {
//     name: string;
//     date: string;
//   };
//   student: {
//     name: string; // Matches AdmitCardForm's studentData.userInfo.name
//     className: string; // Matches AdmitCardForm's studentData.studentInfo.class.name
//     registerNo: string;
//     roll: string;
//     center?: string;
//   };
//   subjects: Subject[];
//   resultType: string;
//   total: number;
// }

// interface ExamResultDownloadCardProps {
//   resultData: ResultData;
//   filename: string;
// }

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toString() !== "Invalid Date"
    ? date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
};

export default function ExamResultDownloadCard({ resultData, filename }: any) {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  // Placeholder data URI for logo if both primary and fallback images fail
  const placeholderLogo =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  // Preload images to ensure they are available before generating the PNG
  const preloadImages = async (imageUrls: string[]): Promise<void> => {
    const promises = imageUrls.map(
      (url) =>
        new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.src = url;
          img.crossOrigin = "anonymous"; // Ensure CORS compatibility
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        })
    );
    try {
      await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsGeneratingImage(true);

      // Use placeholder if logoError is true
      const imageUrl = logoError ? placeholderLogo : "/logo.jpg";
      await preloadImages([imageUrl]);

      if (!targetRef.current) {
        throw new Error("Target element not found");
      }

      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: 850,
        height: 1000,
        skipFonts: true,
        backgroundColor: "#fff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${filename}.png`;
      link.click();
    } catch (error: any) {
      console.error("Image generation error:", error);
      toast.error(
        error.message || "Failed to generate image. Please try again."
      );
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDownloadImage}
        disabled={isGeneratingImage}
        className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg shadow hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50"
      >
        {isGeneratingImage ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download Result
          </>
        )}
      </button>

      <div className="fixed -left-[9999px]">
        <div
          ref={targetRef}
          className="relative w-[850px] h-[500px] bg-gradient-to-r from-emerald-50 to-teal-100 border border-gray-200 rounded-lg overflow-hidden p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {logoError ? (
                <div className="w-20 h-20 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-500 text-xs">
                  Logo
                </div>
              ) : (
                <Image
                  src="/logo.jpg"
                  alt="Institution Logo"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-white"
                  onError={() => setLogoError(true)}
                />
              )}
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-green-800">
                  বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন
                </h1>
                <p className="text-sm text-gray-700">
                  An educational community dedicated to excellence in private
                  madrasa education
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Exam Result</p>
              <p className="text-lg font-bold text-blue-800">
                {resultData.exam.name || "N/A"}
              </p>
            </div>
          </div>

          {/* Exam Title */}
          <div className="border-t-2 border-b-2 border-gray-300 py-2 my-4">
            <h2 className="text-xl font-bold text-center text-blue-800">
              {resultData.exam.name || "N/A"} Examination Result
            </h2>
          </div>

          {/* Student Information */}
          <div className="flex justify-between mb-6">
            <div className="w-2/3 pr-6">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 text-gray-800 font-medium">
                      Registration No:
                    </td>
                    <td className="py-1">
                      {resultData.student.registerNo || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 text-gray-800 font-medium">Roll No:</td>
                    <td className="py-1">{resultData.student.roll || "N/A"}</td>
                  </tr>

                  <tr>
                    <td className="py-1 text-gray-800 font-medium">
                      Exam Date:
                    </td>
                    <td className="py-1">{formatDate(resultData.exam.date)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-1/3 flex flex-col items-center">
              <div className="relative w-32 h-32 border-4 border-white rounded-md shadow-md overflow-hidden mb-4 bg-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  No Photo
                </div>
              </div>
              <div className="text-center">
                <div className="h-16 border-t-2 border-b-2 border-gray-300 flex items-center justify-center my-2">
                  <p className="text-xs text-gray-600">Authorized Signature</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject-wise Marks result is hidden*/}
          <div className="mb-4 hidden">
            <h3 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Subject-wise Marks
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left text-gray-700 font-medium border">
                    Subject
                  </th>
                  <th className="py-2 px-4 text-center text-gray-700 font-medium border">
                    Total Marks
                  </th>
                  <th className="py-2 px-4 text-center text-gray-700 font-medium border">
                    Obtained Marks
                  </th>
                  <th className="py-2 px-4 text-center text-gray-700 font-medium border">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultData.subjects && resultData.subjects.length > 0 ? (
                  resultData.subjects.map((subject: any, index: number) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-2 px-4 text-gray-800 border">
                        {subject.name || "N/A"}
                      </td>
                      <td className="py-2 px-4 text-center text-gray-800 border">
                        {subject.totalNumber || "N/A"}
                      </td>
                      <td className="py-2 px-4 text-center text-gray-800 border">
                        {subject.getNumber || "N/A"}
                      </td>
                      <td className="py-2 px-4 text-center text-gray-800 border">
                        {subject.totalNumber && subject.totalNumber !== 0
                          ? (
                              (subject.getNumber / subject.totalNumber) *
                              100
                            ).toFixed(2)
                          : "N/A"}
                        {subject.totalNumber && subject.totalNumber !== 0
                          ? "%"
                          : ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-2 px-4 text-center text-gray-800 border"
                    >
                      No subjects available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-gray-800 font-medium">Result Type:</span>
              <span className="ml-2 text-gray-800 capitalize">
                {resultData.resultType || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <Percent className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-800 font-medium">Total Marks:</span>
              <span className="ml-2 text-gray-800">
                {resultData.total || "N/A"}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-600">
            <p>
              This is an official document. Any tampering will be considered as
              forgery.
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} Bangladesh Private Madrasa Welfare
              Association
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
