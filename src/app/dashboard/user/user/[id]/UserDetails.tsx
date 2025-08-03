"use client";

import useAxiousSource from "@/app/_default/_custom-component/useAxiousSource";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  MapPin,
  Smartphone,
  Mail,
  User as UserIcon,
  Calendar,
  Clock,
  GraduationCap,
  Info,
  Shield,
  CreditCard,
  Cake,
} from "lucide-react";
import Image from "next/image";

interface UserAddress {
  present: string;
  permanent: string;
}

interface UserData {
  address: UserAddress;
  _id: string;
  registerNo: string;
  roll: string;
  name: string;
  number: string;
  role: string;
  image: string;
  type: string;
  expirIn: boolean;
  gender: string;
  dateOfBirth: string;
  isNew: boolean;
  email: string;
  isDelated: boolean;
  temporaryPassword?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function UserDetails() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const { axiosSource } = useAxiousSource();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosSource.get(`/user/${id}`);
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("Error fetching user details");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, axiosSource]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Loading skeleton for profile image */}
          <div className="w-full md:w-1/3">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
          {/* Loading skeleton for user info */}
          <div className="w-full md:w-2/3 space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2"></div>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="p-4 bg-red-100 rounded-lg text-red-700 flex items-center justify-center">
          <Info className="inline mr-2" size={20} />
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="p-4 bg-yellow-100 rounded-lg text-yellow-700 flex items-center justify-center">
          <Info className="inline mr-2" size={20} />
          User not found
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Custom badge component
  const Badge = ({
    variant = "default",
    children,
  }: {
    variant?: "default" | "destructive" | "secondary";
    children: React.ReactNode;
  }) => {
    const baseClasses =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ml-2";

    const variantClasses = {
      default: "bg-blue-100 text-blue-800",
      destructive: "bg-red-100 text-red-800",
      secondary: "bg-gray-100 text-gray-800",
    };

    return (
      <span className={`${baseClasses} ${variantClasses[variant]}`}>
        {children}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Profile Image and Basic Info */}
        <div className="w-full md:w-1/3">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <UserIcon className="text-gray-500" size={18} />
              <span className="font-medium">ID: {user.registerNo}</span>
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap className="text-gray-500" size={18} />
              <span className="font-medium">Roll: {user.roll}</span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="text-gray-500" size={18} />
              <span className="font-medium capitalize">Role: {user.role}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-gray-500" size={18} />
              <span className="font-medium">
                Status:
                <Badge
                  variant={
                    user.type === "in-progress" ? "default" : "destructive"
                  }
                >
                  {user.type}
                </Badge>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <Badge variant={user.isNew ? "default" : "secondary"}>
            {user.isNew ? "New User" : "Existing User"}
          </Badge>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Smartphone className="text-blue-500" size={18} />
                Contact Information
              </h2>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="text-gray-500" size={16} />
                  <span>{user.number}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="text-gray-500" size={16} />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <UserIcon className="text-blue-500" size={18} />
                Personal Information
              </h2>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cake className="text-gray-500" size={16} />
                  <span>DOB: {formatDate(user.dateOfBirth)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <UserIcon className="text-gray-500" size={16} />
                  <span className="capitalize">Gender: {user.gender}</span>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="text-blue-500" size={18} />
                Address
              </h2>

              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Present Address
                  </p>
                  <p>{user.address.present}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Permanent Address
                  </p>
                  <p>{user.address.permanent}</p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="text-blue-500" size={18} />
                Account Details
              </h2>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="text-gray-500" size={16} />
                  <span>Joined: {formatDate(user.createdAt)}</span>
                </div>

                {user.temporaryPassword && (
                  <div className="flex items-center gap-2">
                    <Shield className="text-gray-500" size={16} />
                    <span>Temp Password: {user.temporaryPassword}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
