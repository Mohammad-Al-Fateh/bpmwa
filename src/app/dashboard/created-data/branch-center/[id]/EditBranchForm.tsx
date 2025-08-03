/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Building, MapPin, Save, Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface IBranchForm {
  name: string;
  address: string;
}

interface IBranchData {
  _id: string;
  id: string;
  name: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function EditBranchForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [branchData, setBranchData] = useState<IBranchData | null>(null);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IBranchForm>();

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/branch/${id}`
        );
        if (response.data.success) {
          setBranchData(response.data.data);
          // Set form values with fetched data
          setValue("name", response.data.data.name);
          setValue("address", response.data.data.address);
        }
      } catch (error: any) {
        console.error("Error fetching branch data:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch branch data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranchData();
  }, [id, setValue]);

  const onSubmit = async (data: IBranchForm) => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/branch/${id}`,
        data
      );
      console.log(response);
      toast.success("Branch updated successfully!");
      // Update local state with new data
      if (branchData) {
        setBranchData({
          ...branchData,
          name: data.name,
          address: data.address,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error: any) {
      console.error("Error updating branch:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update branch. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!branchData) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Branch not found</h2>
          <p className="text-gray-600">
            The branch you`re trying to edit doesn`t exist or couldn`t be
            loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="w-full mx-auto rounded-lg shadow-md overflow-hidden">
        {/* Form Header */}
        <div className="bg-gray-300 px-6 py-4 flex items-center">
          <Building className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold">Edit Branch</h2>
          <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            ID: {branchData.id}
          </span>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Branch Name Field */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <Building className="h-4 w-4 mr-1" />
              Branch Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Branch name is required",
                minLength: {
                  value: 3,
                  message: "Branch name must be at least 3 characters",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter branch name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Branch Address Field */}
          <div>
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <MapPin className="h-4 w-4 mr-1" />
              Branch Address
            </label>
            <textarea
              id="address"
              {...register("address", {
                required: "Branch address is required",
                minLength: {
                  value: 5,
                  message: "Address must be at least 5 characters",
                },
              })}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter full branch address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(branchData.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date(branchData.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                reset({
                  name: branchData.name,
                  address: branchData.address,
                });
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-4 w-4 mr-2" />
              Reset Changes
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Branch
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
