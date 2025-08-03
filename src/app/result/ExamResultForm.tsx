"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  BookOpen,
  Hash,
  ClipboardList,
  ChevronDown,
  Search,
  Loader2,
} from "lucide-react";
import ExamResultDisplay from "./ExamResultDisplay";

interface Exam {
  _id: string;
  name: string;
}

interface FormData {
  examId: string;
  registerNo: string;
}

interface Subject {
  name: string;
  totalNumber: number;
  getNumber: number;
}

interface ResultData {
  exam: {
    name: string;
    date: string;
  };
  student: {
    registerNo: string;
    roll: string;
    center?: string;
  };
  subjects: Subject[];
  resultType: string;
  total: number;
}

export default function ExamResultForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [filename, setFilename] = useState("exam-result");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/all/exam`
        );
        if (response.data.success) {
          setExams(response.data.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch exams");
      }
    };
    fetchExams();
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!data.examId || !data.registerNo) {
      toast.error("Please select exam and enter registration number");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/result/${data.examId}/card/${data.registerNo}`
      );
      if (response.data.success) {
        setResultData(response.data.data);
        setFilename(`result-${data.registerNo}`);
        toast.success("Result fetched successfully");
      } else {
        toast.error("No result found for the given details");
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      toast.error("Failed to fetch result. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate__animated animate__fadeInUp">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Check Your Results
          </h2>
          <p className="text-gray-500">
            Enter your details to view exam results
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <label
              htmlFor="examId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Exam
            </label>
            <div className="relative">
              <select
                id="examId"
                {...register("examId", {
                  required: "Exam selection is required",
                })}
                className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
              >
                <option value="">-- Select Exam --</option>
                {exams.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.name}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-3 text-gray-400">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div className="absolute right-3 top-3 text-gray-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
            {errors.examId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.examId.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="registerNo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Registration Number
            </label>
            <div className="relative">
              <input
                id="registerNo"
                type="text"
                {...register("registerNo", {
                  required: "Registration number is required",
                })}
                placeholder="Enter registration number"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <Hash className="w-5 h-5" />
              </div>
            </div>
            {errors.registerNo && (
              <p className="mt-1 text-sm text-red-600">
                {errors.registerNo.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all animate__animated animate__pulse animate__infinite disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search Results
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Having trouble? Contact exam department</p>
        </div>
      </div>

      {resultData && (
        <ExamResultDisplay resultData={resultData} filename={filename} />
      )}
    </div>
  );
}
