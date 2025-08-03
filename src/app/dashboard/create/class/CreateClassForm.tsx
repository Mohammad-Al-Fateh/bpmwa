/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { BookOpen, Save, Loader2, X, School, Building } from "lucide-react";
import { useState, useEffect } from "react";

interface IBranch {
  _id: string;
  name: string;
}

interface IClassForm {
  name: string;
  branch: string;
}

export default function CreateClassForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IClassForm>();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/branch`
        );
        setBranches(response.data.data);
      } catch (error) {
        toast.error("Failed to load branches");
        console.error("Error fetching branches:", error);
      } finally {
        setIsLoadingBranches(false);
      }
    };

    fetchBranches();
  }, []);

  const onSubmit = async (data: IClassForm) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_V1}/class`, data);
      toast.success("Class created successfully!");
      reset();
    } catch (error: any) {
      console.error("Error creating class:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create class. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full mx-auto  rounded-lg shadow-md overflow-hidden">
        {/* Form Header */}
        <div className="bg-indigo-600 px-6 py-4 flex items-center">
          <School className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-semibold text-white">Create New Class</h2>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Class Name Field */}
          <div>
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Class Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Class name is required",
                minLength: {
                  value: 3,
                  message: "Class name must be at least 3 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter class name (e.g., Class 1, Grade 5)"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Branch Selection Field */}
          <div>
            <label
              htmlFor="branch"
              className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <Building className="h-4 w-4 mr-1" />
              Select Branch
            </label>
            {isLoadingBranches ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
              </div>
            ) : (
              <select
                id="branch"
                {...register("branch", {
                  required: "Please select a branch",
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.branch ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isLoadingBranches}
              >
                <option value="">Select a branch</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            )}
            {errors.branch && (
              <p className="mt-1 text-sm text-red-600">
                {errors.branch.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
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
              disabled={isSubmitting || isLoadingBranches}
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
                  Create Class
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
