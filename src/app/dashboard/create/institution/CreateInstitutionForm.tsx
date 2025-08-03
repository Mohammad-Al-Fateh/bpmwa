/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Building, MapPin, Home, Save, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";

interface IBranch {
  _id: string;
  name: string;
}

interface IInstitutionForm {
  name: string;
  address?: string;
  pin?: string;
  password?: string;
  branch?: string;
  phone?: string;
}

export default function CreateInstitutionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IInstitutionForm>();

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

  const onSubmit = async (data: IInstitutionForm) => {
    setIsSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/institution`,
        data
      );
      toast.success("Institution created successfully!");
      reset();
    } catch (error: any) {
      console.error("Error creating institution:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create institution. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Form Header */}
        <div className="bg-green-600 px-6 py-4 flex items-center">
          <Building className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-semibold text-white">
            Create New Institution
          </h2>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Institution Name Field */}
          <div>
            <label
              htmlFor="name"
              className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <Building className="h-4 w-4 mr-1" />
              Institution Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Institution name is required",
                minLength: {
                  value: 3,
                  message: "Institution name must be at least 3 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter institution name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <Building className="h-4 w-4 mr-1" />
              Institution phone
            </label>
            <input
              id="phone"
              type="text"
              {...register("phone", {
                required: "Institution phone is required",
                minLength: {
                  value: 3,
                  message: "Institution phone must be at least 3 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter institution phone"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="pin"
                className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <Building className="h-4 w-4 mr-1" />
                Institution Pin
              </label>
              <input
                id="pin"
                type="text"
                {...register("pin", {
                  required: "Institution pin is required",
                  minLength: {
                    value: 3,
                    message: "Institution pin must be at least 3 characters",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                  errors.pin ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter institution pin"
              />
              {errors.pin && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pin.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <Building className="h-4 w-4 mr-1" />
                Institution password
              </label>
              <input
                id="password"
                type="text"
                {...register("password", {
                  required: "Institution password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Institution password must be at least 3 characters",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter institution password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Institution Address Field */}
          <div>
            <label
              htmlFor="address"
              className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Institution Address
            </label>
            <textarea
              id="address"
              {...register("address")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter institution address"
            />
          </div>

          {/* Branch Selection Field */}
          <div>
            <label
              htmlFor="branch"
              className=" text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <Home className="h-4 w-4 mr-1" />
              Select Branch (Optional)
            </label>
            {isLoadingBranches ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-green-600" />
              </div>
            ) : (
              <select
                id="branch"
                {...register("branch")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                disabled={isLoadingBranches}
              >
                <option value="">Select a branch (optional)</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoadingBranches}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Institution
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
