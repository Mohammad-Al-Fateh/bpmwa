"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

interface Institution {
  _id: string;
  id: string;
  name: string;
  address: string;
}

interface ManageCenterInstitution {
  _id: string;
  id: string;
  name: string;
  address: string;
}

interface ManageCenterData {
  _id: string;
  center: string;
  institutions: ManageCenterInstitution[];
}

interface FormData {
  center: string;
  institutions: string[];
}

export default function EditMEnageCenter({
  institutions,
}: {
  institutions: Institution[];
}) {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<ManageCenterData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>();

  // Fetch manage center data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/manage-center/${id}`
        );
        setInitialData(response.data.data);

        // Set form values
        if (response.data.data) {
          const data = response.data.data;
          setValue("center", data.center);
          setValue(
            "institutions",
            data.institutions.map((inst: ManageCenterInstitution) => inst._id)
          );
        }
      } catch (error) {
        toast.error("Failed to load manage center data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        center: data.center,
        institutions: data.institutions,
      };

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/manage-center/${id}`,
        payload
      );

      console.log(response);

      toast.success("Manage Center updated successfully!");
      router.push("/dashboard/manage-centers");
    } catch (error) {
      console.error("Error updating manage center:", error);
      toast.error("Failed to update manage center. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full mx-auto p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="w-full mx-auto p-6">
        <p className="text-red-500">Manage Center not found</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Manage Center
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
            {institutions.map((institution: Institution) => (
              <div key={institution._id} className="flex items-center">
                <input
                  id={`institution-${institution._id}`}
                  type="checkbox"
                  value={institution._id}
                  {...register("institutions", {
                    required: "At least one institution must be selected",
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked={initialData.institutions.some(
                    (inst: ManageCenterInstitution) =>
                      inst._id === institution._id
                  )}
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

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              if (initialData) {
                setValue("center", initialData.center);
                setValue(
                  "institutions",
                  initialData.institutions.map(
                    (inst: ManageCenterInstitution) => inst._id
                  )
                );
              }
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Reset Changes
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isSubmitting ? "Updating..." : "Update Manage Center"}
          </button>
        </div>
      </form>
    </div>
  );
}
