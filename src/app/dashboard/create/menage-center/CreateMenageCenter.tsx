/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface CreateMenageCenterProps {
  institutions: {
    _id: string;
    id: string;
    name: string;
    address: string;
  }[];
}

interface FormData {
  center: string;
  institutions: string[];
}

export default function CreateMenageCenter({
  institutions,
}: CreateMenageCenterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const payload: any = {
        center: data.center,
        institutions: data.institutions,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/manage-center`,
        payload
      );
      console.log(response);

      toast.success("Manage Center created successfully!");
      reset();
      window.location.reload();
    } catch (error) {
      console.error("Error creating manage center:", error);
      toast.error("Failed to create manage center. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto p-6  ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Manage Center
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="center"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Center Name *
          </label>
          <input
            id="center"
            type="text"
            {...register("center", { required: "Center name is required" })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.center
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Enter center name"
          />
          {errors.center && (
            <p className="mt-1 text-sm text-red-600">{errors.center.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Institutions *
          </label>
          <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-300 rounded-md">
            {institutions.map((institution) => (
              <div key={institution._id} className="flex items-center">
                <input
                  id={`institution-${institution._id}`}
                  type="checkbox"
                  value={institution._id}
                  {...register("institutions", {
                    required: "At least one institution must be selected",
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`institution-${institution._id}`}
                  className="ml-3 text-sm text-gray-700"
                >
                  <span className="font-medium">{institution.name}</span>
                  <p className="text-xs text-gray-500">
                    {institution.address} (ID: {institution.id})
                  </p>
                </label>
              </div>
            ))}
          </div>
          {errors.institutions && (
            <p className="mt-1 text-sm text-red-600">
              {errors.institutions.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isSubmitting ? "Creating..." : "Create Manage Center"}
          </button>
        </div>
      </form>
    </div>
  );
}
