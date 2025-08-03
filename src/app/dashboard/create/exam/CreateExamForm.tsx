/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  DollarSign,
  BookOpen,
  Users,
  Plus,
  Trash2,
  Save,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IExamGroupForm {
  groupName: string;
  description: string;
}

interface IExamForm {
  name: string;
  date: Date;
  releaseDate: Date;
  registrationStart: Date;
  registrationEnd: Date;
  fees: number;
  subjects: string[];
  groups: IExamGroupForm[];
  class: string[];
}

export default function CreateExamForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectInput, setSubjectInput] = useState("");
  const [classInput, setClassInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<IExamForm>({
    defaultValues: {
      date: new Date(),
      releaseDate: new Date(),
      registrationStart: new Date(),
      registrationEnd: new Date(),
      fees: 0,
      subjects: [],
      groups: [{ groupName: "", description: "" }],
      class: [],
    },
  });

  const {
    fields: groupFields,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    control,
    name: "groups",
  });

  const onSubmit = async (data: IExamForm) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_V1}/exam`, data);
      toast.success("Exam created successfully!");
      reset();
    } catch (error: any) {
      console.error("Error creating exam:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create exam. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSubject = () => {
    if (subjectInput.trim()) {
      const currentSubjects = watch("subjects") || [];
      setValue("subjects", [...currentSubjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const removeSubject = (index: number) => {
    const currentSubjects = watch("subjects") || [];
    setValue(
      "subjects",
      currentSubjects.filter((_, i) => i !== index)
    );
  };

  const addClass = () => {
    if (classInput.trim()) {
      const currentClasses = watch("class") || [];
      setValue("class", [...currentClasses, classInput.trim()]);
      setClassInput("");
    }
  };

  const removeClass = (index: number) => {
    const currentClasses = watch("class") || [];
    setValue(
      "class",
      currentClasses.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Form Header */}
        <div className="bg-blue-600 px-6 py-4 flex items-center">
          <BookOpen className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-semibold text-white">Create New Exam</h2>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Exam Name Field */}
          <div>
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Exam Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Exam name is required",
                minLength: {
                  value: 3,
                  message: "Exam name must be at least 3 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter exam name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Exam Date
              </label>
              <DatePicker
                selected={watch("date")}
                onChange={(date: Date | null) => {
                  if (date) setValue("date", date);
                }}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Result Release Date
              </label>
              <DatePicker
                selected={watch("releaseDate")}
                onChange={(date: Date | null) => {
                  if (date) setValue("releaseDate", date);
                }}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.releaseDate ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>
          </div>

          {/* Registration Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Registration Start
              </label>
              <DatePicker
                selected={watch("registrationStart")}
                onChange={(date: Date | null) => {
                  if (date) setValue("registrationStart", date);
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.registrationStart
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Registration End
              </label>
              <DatePicker
                selected={watch("registrationEnd")}
                onChange={(date: Date | null) => {
                  if (date) setValue("registrationEnd", date);
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.registrationEnd ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>
          </div>

          {/* Fees Field */}
          <div>
            <label
              htmlFor="fees"
              className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Exam Fees
            </label>
            <input
              id="fees"
              type="number"
              {...register("fees", {
                required: "Fees is required",
                min: {
                  value: 0,
                  message: "Fees cannot be negative",
                },
                valueAsNumber: true,
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.fees ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter exam fees"
              step="0.01"
            />
            {errors.fees && (
              <p className="mt-1 text-sm text-red-600">{errors.fees.message}</p>
            )}
          </div>

          {/* Subjects Field */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Subjects
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter subject name"
              />
              <button
                type="button"
                onClick={addSubject}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {watch("subjects")?.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 px-3 py-1 rounded-full"
                >
                  <span className="text-sm text-blue-800">{subject}</span>
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Classes Field */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Classes
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={classInput}
                onChange={(e) => setClassInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter class name"
              />
              <button
                type="button"
                onClick={addClass}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {watch("class")?.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 px-3 py-1 rounded-full"
                >
                  <span className="text-sm text-blue-800">{cls}</span>
                  <button
                    type="button"
                    onClick={() => removeClass(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Groups */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Exam Groups
            </label>

            {groupFields.map((field, index) => (
              <div
                key={field.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className=" text-xs font-medium text-gray-500 mb-1">
                      Group Name
                    </label>
                    <input
                      {...register(`groups.${index}.groupName` as const, {
                        required: "Group name is required",
                      })}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.groups?.[index]?.groupName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter group name"
                    />
                    {errors.groups?.[index]?.groupName && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.groups[index]?.groupName?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className=" text-xs font-medium text-gray-500 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register(`groups.${index}.description` as const, {
                      required: "Description is required",
                    })}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                      errors.groups?.[index]?.description
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter group description"
                  />
                  {errors.groups?.[index]?.description && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.groups[index]?.description?.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => removeGroup(index)}
                    className="text-red-500 hover:text-red-700 flex items-center text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove Group
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => appendGroup({ groupName: "", description: "" })}
              className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Exam Group
            </button>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Exam
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
