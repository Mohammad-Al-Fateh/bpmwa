/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageUpload from "@/app/_default/ImageUpload";

interface FormData {
  name: string;
  number: string;
  branch: string;
  email: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  address: {
    present: string;
    permanent: string;
  };
  role: "menagement" | "admin" | "super-admin";
  position: "শিক্ষক" | "সহকর্মী" | "পরীক্ষক" | "সদস্য";
  nidOrBirthNo: string;
  image: string;
}

export default function CreateMenagement({ branch }: any) {
  const [image, setImage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      number: "",
      branch: "",
      email: "",
      gender: "" as "male" | "female" | "other",
      dateOfBirth: "",
      address: {
        present: "",
        permanent: "",
      },
      role: "" as "menagement" | "admin" | "super-admin",
      position: "" as "শিক্ষক" | "সহকর্মী" | "পরীক্ষক" | "সদস্য",
      nidOrBirthNo: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        image,
      };
      console.log(payload);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/management`,
        payload
      );
      toast.success("Management record created successfully!");
      setImage("");
      reset();
    } catch (error) {
      toast.error("Failed to create management record");
      console.error("Create error:", error);
    }
  };

  const handleImageUpload = (url: string) => {
    setImage(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Management
            </h1>
            <p className="text-gray-600">
              Add a new management member for {branch.name}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="h-4 w-4 inline mr-1" /> Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter name"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="h-4 w-4 inline mr-1" /> Phone Number
                </label>
                <Controller
                  name="number"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.number ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter phone number"
                    />
                  )}
                />
                {errors.number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.number.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="h-4 w-4 inline mr-1" /> Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter email"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="h-4 w-4 inline mr-1" /> Branch
                </label>
                <div className="relative">
                  <Controller
                    name="branch"
                    control={control}
                    rules={{ required: "Branch is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.gender ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Branch</option>
                        {branch.map((item: any) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="h-4 w-4 inline mr-1" /> Gender
                </label>
                <div className="relative">
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Gender is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.gender ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="h-4 w-4 inline mr-1" /> Date of Birth
                </label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.dateOfBirth
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="h-4 w-4 inline mr-1" /> Role
                </label>
                <div className="relative">
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Role is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.role ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select role</option>
                        <option value="menagement">Management</option>
                        <option value="admin">Admin</option>
                        <option value="super-admin">Super Admin</option>
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building className="h-4 w-4 inline mr-1" /> Position
                </label>

                <div className="relative">
                  <Controller
                    name="position"
                    control={control}
                    rules={{ required: "Position is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.position ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select position</option>
                        <option value="শিক্ষক">শিক্ষক</option>
                        <option value="সহকর্মী">সহকর্মী</option>
                        <option value="পরীক্ষক">পরীক্ষক</option>
                        <option value="সদস্য">সদস্য</option>
                      </select>
                    )}
                  />
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                {errors.position && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.position.message}
                  </p>
                )}
              </div>

              {/* NID or Birth Certificate Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FileText className="h-4 w-4 inline mr-1" /> NID or Birth
                  Certificate Number
                </label>
                <Controller
                  name="nidOrBirthNo"
                  control={control}
                  rules={{
                    required: "NID or Birth Certificate Number is required",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nidOrBirthNo
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter NID or Birth Certificate Number"
                    />
                  )}
                />
                {errors.nidOrBirthNo && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nidOrBirthNo.message}
                  </p>
                )}
              </div>

              {/* Present Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="h-4 w-4 inline mr-1" /> Present Address
                </label>
                <Controller
                  name="address.present"
                  control={control}
                  rules={{ required: "Present address is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address?.present
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter present address"
                    />
                  )}
                />
                {errors.address?.present && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.present.message}
                  </p>
                )}
              </div>

              {/* Permanent Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="h-4 w-4 inline mr-1" /> Permanent Address
                </label>
                <Controller
                  name="address.permanent"
                  control={control}
                  rules={{ required: "Permanent address is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address?.permanent
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter permanent address"
                    />
                  )}
                />
                {errors.address?.permanent && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.permanent.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Select Image
                </label>
                <div className="flex flex-wrap gap-3">
                  {image && (
                    <div className="h-[135px]">
                      <Image
                        width={135}
                        height={135}
                        src={image}
                        alt="mother death certificate photo"
                        className="h-[135px] rounded-xl"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <ImageUpload
                      onUpload={(url: string) => handleImageUpload(url)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md text-white flex items-center ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } transition`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create Management"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
