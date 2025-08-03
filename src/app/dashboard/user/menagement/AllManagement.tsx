"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  User,
  Trash2,
  Edit,
  Plus,
  AlertCircle,
  X,
  Info,
  Building,
  IdCard,
  Phone,
  Mail,
  CalendarDays,
  MapPin,
  UserCog,
  BadgeInfo,
} from "lucide-react";
import Image from "next/image";

interface Address {
  present: string;
  permanent: string;
}

interface UserData {
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
  temporaryPassword: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: Address;
}

interface Branch {
  _id: string;
  id: string;
  name: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Management {
  _id: string;
  user: UserData;
  branch: Branch;
  position: string;
  registerNo: string;
  nidOrBirthNo: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AllManagement({ data }: { data: Management[] }) {
  const [management, setManagement] = useState<Management[]>(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [managementToDelete, setManagementToDelete] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Management | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!managementToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/management/soft/${managementToDelete}`
      );
      setManagement(
        management.filter((member) => member._id !== managementToDelete)
      );
      toast.success("Management member deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete management member");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setManagementToDelete(null);
    }
  };

  const openDeleteModal = (memberId: string) => {
    setManagementToDelete(memberId);
    setIsDeleteModalOpen(true);
  };

  const openDetailsModal = (member: Management) => {
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            All Management Members
          </h1>
          <p className="text-gray-600">
            Manage your organization`s management team members
          </p>
        </div>
        <Link
          href="/dashboard/create/management"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Member
        </Link>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {management.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <Image
                    width={50}
                    height={50}
                    src={member.user.image}
                    alt={member.user.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {member.user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{member.position}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{member.branch.name}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <IdCard className="h-4 w-4 inline mr-1" />
                    Register No
                  </h3>
                  <p className="text-sm text-gray-700">{member.registerNo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <UserCog className="h-4 w-4 inline mr-1" />
                    Role
                  </h3>
                  <p className="text-sm text-gray-700 capitalize">
                    {member.user.role.replace("-", " ")}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    member.isDeleted
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {member.isDeleted ? "Inactive" : "Active"}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openDetailsModal(member)}
                    className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-50 transition"
                    title="Details"
                  >
                    <Info className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/dashboard/created-data/management/${member._id}`}
                    className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(member._id)}
                    className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {management.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No management members found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new management member.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/create/management"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Member
            </Link>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {isDetailsModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-[#000000bd] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <User className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedMember.user.name} - Details
                  </h3>
                </div>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    width={100}
                    height={100}
                    src={selectedMember.user.image}
                    alt={selectedMember.user.name}
                    className="h-32 w-32 rounded-full object-cover mx-auto"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 flex items-center">
                        <BadgeInfo className="h-4 w-4 mr-1" />
                        Position
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedMember.position}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 flex items-center">
                        <UserCog className="h-4 w-4 mr-1" />
                        Role
                      </h4>
                      <p className="text-sm text-gray-700 mt-1 capitalize">
                        {selectedMember.user.role.replace("-", " ")}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 flex items-center">
                        <IdCard className="h-4 w-4 mr-1" />
                        Register No
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedMember.registerNo}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 flex items-center">
                        <IdCard className="h-4 w-4 mr-1" />
                        NID/Birth No
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedMember.nidOrBirthNo}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        Branch
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {selectedMember.branch.name} ({selectedMember.branch.id}
                        )
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        Date of Birth
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {formatDate(selectedMember.user.dateOfBirth)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      Contact
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedMember.user.number}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedMember.user.email}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Present Address
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedMember.user.address.present}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Permanent Address
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedMember.user.address.permanent}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Created At
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {formatDateTime(selectedMember.createdAt)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Updated At
                      </h4>
                      <p className="text-sm text-gray-700 mt-1">
                        {formatDateTime(selectedMember.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Status
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedMember.isDeleted
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedMember.isDeleted ? "Inactive" : "Active"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-[#000000bd] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Confirm Deletion
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this management member? This
                action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setManagementToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  disabled={loading}
                >
                  <X className="h-5 w-5 mr-1 inline" />
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className={`px-4 py-2 rounded-md text-white ${
                    loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                  } transition flex items-center`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-5 w-5 mr-1 inline" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
