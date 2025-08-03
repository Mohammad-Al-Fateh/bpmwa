/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toPng } from "html-to-image";
import axios from "axios";
import Image from "next/image";
import { Loader2, Download } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Exam {
  _id: string;
  name: string;
}

interface FormData {
  registerNo: string;
  examId: string;
}

interface StudentData {
  examInfo: {
    examId: string;
    examName: string;
    examDate: string;
  };
  studentInfo: {
    registerNo: string;
    roll: string;
    fatherName: string;
    motherName: string;
    branch: {
      name: string;
      address: string;
    };
    institution: {
      name: string;
      address: string;
    };
    class: {
      name: string;
    };
    center: string;
  };
  userInfo: {
    name: string;
    email: string;
    number: string;
    role: string;
    gender: string;
    dateOfBirth: string;
    address: {
      present: string;
      permanent: string;
    };
    image: string;
  };
}

export default function AdmitCardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const [filename, setFilename] = useState("admit-card");

  // Fetch exams on component mount
  React.useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/select/exam`
        );
        if (response.data.success) {
          setExams(response.data.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch exams");
      }
    };
    fetchExams();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/student/card`,
        data
      );
      if (response.data.success) {
        setStudentData(response.data.data);
        setFilename(`admit-card-${data.registerNo}`);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch student data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsGeneratingImage(true);
      if (targetRef.current) {
        const dataUrl = await toPng(targetRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          width: 850,
          height: 500,
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${filename}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/all-admit-card`}
          className="px-3 p-1 rounded-md bg-blue-800 text-white font-bold text-sm"
        >
          {" "}
          Get All Admit Card{" "}
        </Link>
        {/* Form Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Admit Card Generator
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="registerNo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Register Number
              </label>
              <input
                id="registerNo"
                type="text"
                {...register("registerNo", {
                  required: "Register number is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter register number"
              />
              {errors.registerNo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.registerNo.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="examId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Exam
              </label>
              <select
                id="examId"
                {...register("examId", {
                  required: "Exam selection is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select an exam</option>
                {exams.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.name}
                  </option>
                ))}
              </select>
              {errors.examId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.examId.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                "Generate Admit Card"
              )}
            </button>
          </form>
        </div>

        {/* Admit Card Section - Only show download button when data is available */}
        {studentData && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-end">
              <button
                onClick={handleDownloadImage}
                disabled={isGeneratingImage}
                className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
              >
                {isGeneratingImage ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Admit Card
                  </>
                )}
              </button>
            </div>

            {/* Hidden Admit Card Design for Download */}
            <div className="fixed -left-[9999px]">
              <div
                ref={targetRef}
                className="relative w-[850px] h-[500px] bg-gradient-to-r from-emerald-50 to-teal-100 border border-gray-200 rounded-lg overflow-hidden p-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Image
                      src="/logo.jpg"
                      alt="Institution Logo"
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-white"
                    />
                    <div className="ml-4">
                      <h1 className="text-2xl font-bold text-green-800">
                        বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন
                      </h1>
                      <p className="text-sm text-gray-700">
                        An educational community dedicated to excellence in
                        private madrasa education
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Admit Card</p>
                    <p className="text-lg font-bold text-blue-800">
                      {studentData.examInfo.examName}
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-b-2 border-gray-300 py-2 my-4">
                  <h2 className="text-xl font-bold text-center text-blue-800">
                    {studentData.studentInfo.center}
                  </h2>
                </div>

                {/* Student Information */}
                <div className="flex justify-between mt-6">
                  <div className="w-2/3 pr-6">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="py-1 text-gray-800 font-medium">
                            Name:
                          </td>
                          <td className="py-1 text-gray-800">
                            {studentData.userInfo.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-800 font-medium">
                            Father`s Name:
                          </td>
                          <td className="py-1 text-gray-800">
                            {studentData.studentInfo.fatherName}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-800 font-medium">
                            Mother`s Name:
                          </td>
                          <td className="py-1 text-gray-800">
                            {studentData.studentInfo.motherName}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-800 font-medium">
                            Class:
                          </td>
                          <td className="py-1 text-gray-800">
                            {studentData.studentInfo.class.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-800 font-medium">
                            Roll No:
                          </td>
                          <td className="py-1 text-gray-800">
                            {studentData.studentInfo.roll}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-1 text-gray-800 font-medium">
                            Register No:
                          </td>
                          <td className="py-1 text-gray-800">
                            {studentData.studentInfo.registerNo}
                          </td>
                        </tr>

                        <tr>
                          <td className="py-1 text-gray-800 font-medium">
                            Gender:
                          </td>
                          <td className="py-1 text-gray-800">
                            {studentData.userInfo.gender}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Exam Information */}
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">
                        Exam Information
                      </h3>
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="py-1 text-gray-800 font-medium">
                              Exam Date:
                            </td>
                            <td className="py-1 text-gray-800">
                              {formatDate(studentData.examInfo.examDate)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-800 font-medium">
                              Center:
                            </td>
                            <td className="py-1 text-gray-800">
                              {studentData.studentInfo.center}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1 text-gray-800 font-medium">
                              Address:
                            </td>
                            <td className="py-1 text-gray-800">
                              {studentData.studentInfo.institution.address}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Student Photo */}
                  <div className="w-1/3 flex flex-col items-center">
                    <div className="relative hidden w-48 h-48 border-4 border-white rounded-md shadow-md overflow-hidden mb-4">
                      <Image
                        src={studentData.userInfo.image}
                        alt="Student Photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="h-48"></div>
                    <div className="text-center">
                      <div className="h-20 border-t-2 border-b-2 border-gray-300 flex items-center justify-center my-4">
                        <p className="text-sm text-gray-600">
                          Authorized Signature
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-600">
                  <p className="text-sm">
                    This admit card must be presented at the exam center along
                    with valid ID proof
                  </p>
                  <p className="mt-1">
                    © {new Date().getFullYear()} Bangladesh Private Madrasa
                    Welfare Association
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
