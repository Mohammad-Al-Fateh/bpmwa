/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
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

export default function EditInstitutionForm() {
  const { id } = useParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IInstitutionForm>();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch branches
        const branchesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/branch`
        );
        setBranches(branchesResponse.data.data);

        // Fetch institution data
        const institutionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/institution/${id}`
        );
        setInitialData(institutionResponse.data.data);

        // Set form values if data exists
        if (institutionResponse.data.data) {
          const data = institutionResponse.data.data;
          reset({
            name: data.name || "",
            address: data.address || "",
            pin: data.pin || "",
            password: data.password || "",
            phone: data.phone || "",
            branch: data.branch?._id || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data: IInstitutionForm) => {
    setIsSubmitting(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/institution/${id}`,
        data
      );
      toast.success("Institution updated successfully!");
      router.push("/dashboard/institutions");
    } catch (error: any) {
      console.error("Error updating institution:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update institution. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Form Header */}
        <div className="bg-green-600 px-6 py-4 flex items-center">
          <Building className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-semibold text-white">Edit Institution</h2>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Institution Name Field */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
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

          {/* Phone Field (Optional) */}
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <Building className="h-4 w-4 mr-1" />
              Institution Phone (Optional)
            </label>
            <input
              id="phone"
              type="text"
              {...register("phone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter institution phone"
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pin Field */}
            <div>
              <label
                htmlFor="pin"
                className="text-sm font-medium text-gray-700 mb-1 flex items-center"
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

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 mb-1 flex items-center"
              >
                <Building className="h-4 w-4 mr-1" />
                Institution Password
              </label>
              <input
                id="password"
                type="text"
                {...register("password", {
                  required: "Institution password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
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

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
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

          {/* Branch Selection */}
          <div>
            <label
              htmlFor="branch"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <Home className="h-4 w-4 mr-1" />
              Select Branch (Optional)
            </label>
            <select
              id="branch"
              {...register("branch")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select a branch (optional)</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() =>
                initialData &&
                reset({
                  name: initialData.name || "",
                  address: initialData.address || "",
                  pin: initialData.pin || "",
                  password: initialData.password || "",
                  phone: initialData.phone || "",
                  branch: initialData.branch?._id || "",
                })
              }
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Institution
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
