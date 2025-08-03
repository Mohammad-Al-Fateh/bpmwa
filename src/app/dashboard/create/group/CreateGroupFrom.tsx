/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  Plus,
  Trash2,
  Save,
  Loader2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ISyllabusItem {
  name: string;
  description: string;
}

interface IGroupForm {
  name: string;
  fromClass: string;
  toClass: string;
  syllabus: ISyllabusItem[];
  exam: string[];
}

export default function CreateGroupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exams, setExams] = useState<any[]>([]);
  const [isLoadingExams, setIsLoadingExams] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IGroupForm>({
    defaultValues: {
      syllabus: [{ name: "", description: "" }],
      exam: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "syllabus",
  });

  // Fetch exams on component mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/exam`
        );
        setExams(response.data.data.exams);
      } catch (error) {
        toast.error("Failed to load exams");
        console.error("Error fetching exams:", error);
      } finally {
        setIsLoadingExams(false);
      }
    };

    fetchExams();
  }, []);

  const onSubmit = async (data: IGroupForm) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_V1}/group`, data);
      toast.success("Group created successfully!");
      reset();
    } catch (error: any) {
      console.error("Error creating group:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create group. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Form Header */}
        <div className="bg-purple-600 px-6 py-4 flex items-center">
          <Users className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-semibold text-white">Create New Group</h2>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Group Name Field */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <Users className="h-4 w-4 mr-1" />
              Group Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Group name is required",
                minLength: {
                  value: 3,
                  message: "Group name must be at least 3 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter group name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Class Range Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fromClass"
                className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <GraduationCap className="h-4 w-4 mr-1" />
                From Class
              </label>
              <input
                id="fromClass"
                type="text"
                {...register("fromClass", {
                  required: "Starting class is required",
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                  errors.fromClass ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter starting class"
              />
              {errors.fromClass && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fromClass.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="toClass"
                className="text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <GraduationCap className="h-4 w-4 mr-1" />
                To Class
              </label>
              <input
                id="toClass"
                type="text"
                {...register("toClass", {
                  required: "Ending class is required",
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                  errors.toClass ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter ending class"
              />
              {errors.toClass && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.toClass.message}
                </p>
              )}
            </div>
          </div>

          {/* Syllabus Items */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Syllabus Items
            </label>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Item Name
                    </label>
                    <input
                      {...register(`syllabus.${index}.name` as const, {
                        required: "Item name is required",
                      })}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                        errors.syllabus?.[index]?.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter syllabus item name"
                    />
                    {errors.syllabus?.[index]?.name && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.syllabus[index]?.name?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register(`syllabus.${index}.description` as const, {
                      required: "Description is required",
                    })}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                      errors.syllabus?.[index]?.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter syllabus item description"
                  />
                  {errors.syllabus?.[index]?.description && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.syllabus[index]?.description?.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 flex items-center text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ name: "", description: "" })}
              className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Syllabus Item
            </button>
          </div>

          {/* Exams Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Select Exams
            </label>

            {isLoadingExams ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {exams.map((exam) => (
                  <div key={exam._id} className="flex items-center">
                    <input
                      id={`exam-${exam._id}`}
                      type="checkbox"
                      value={exam._id}
                      {...register("exam")}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`exam-${exam._id}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {exam.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoadingExams}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Group
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
