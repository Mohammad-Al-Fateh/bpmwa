/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  BookOpen,
  ClipboardList,
  FileText,
  Hash,
  Type,
  Calendar,
  School,
  Save,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";

interface ISuggestionForm {
  subject: string;
  class: string;
  chapter: string;
  topic: string;
  questionType: "MCQ" | "Written" | "Short" | "Broad";
  marks: number;
  suggestionText: string;
  examYear?: string;
  institution?: string;
}

const questionTypes = ["MCQ", "Written", "Short", "Broad"];

export default function CreateSuggestionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISuggestionForm>();

  const onSubmit = async (data: ISuggestionForm) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_V1}/suggestion`, data);
      toast.success("Suggestion created successfully!");
      reset();
    } catch (error: any) {
      console.error("Error creating suggestion:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create suggestion. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Form Header */}
        <div className="bg-indigo-600 px-6 py-4 flex items-center">
          <ClipboardList className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-semibold text-white">
            Create New Suggestion
          </h2>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Subject and Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                Subject
              </label>
              <input
                {...register("subject", { required: "Subject is required" })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter subject"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <School className="h-4 w-4 mr-1" />
                Class
              </label>
              <input
                {...register("class", { required: "Class is required" })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.class ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter class"
              />
              {errors.class && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.class.message}
                </p>
              )}
            </div>
          </div>

          {/* Chapter and Topic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Chapter
              </label>
              <input
                {...register("chapter", { required: "Chapter is required" })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.chapter ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter chapter"
              />
              {errors.chapter && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.chapter.message}
                </p>
              )}
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Type className="h-4 w-4 mr-1" />
                Topic
              </label>
              <input
                {...register("topic", { required: "Topic is required" })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.topic ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter topic"
              />
              {errors.topic && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.topic.message}
                </p>
              )}
            </div>
          </div>

          {/* Question Type and Marks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <ClipboardList className="h-4 w-4 mr-1" />
                Question Type
              </label>
              <select
                {...register("questionType", {
                  required: "Question type is required",
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.questionType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select question type</option>
                {questionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.questionType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.questionType.message}
                </p>
              )}
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Hash className="h-4 w-4 mr-1" />
                Marks
              </label>
              <input
                type="number"
                {...register("marks", {
                  required: "Marks is required",
                  min: { value: 1, message: "Marks must be at least 1" },
                  valueAsNumber: true,
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.marks ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter marks"
              />
              {errors.marks && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.marks.message}
                </p>
              )}
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Exam Year (Optional)
              </label>
              <input
                {...register("examYear")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter exam year"
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <School className="h-4 w-4 mr-1" />
                Institution (Optional)
              </label>
              <input
                {...register("institution")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter institution"
              />
            </div>
          </div>

          {/* Suggestion Text */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Suggestion Text
            </label>
            <textarea
              {...register("suggestionText", {
                required: "Suggestion text is required",
              })}
              rows={5}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.suggestionText ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your suggestion"
            />
            {errors.suggestionText && (
              <p className="mt-1 text-sm text-red-600">
                {errors.suggestionText.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Suggestion
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
