"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Building,
  Home,
  Trash2,
  Edit,
  Plus,
  AlertCircle,
  X,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Institution {
  _id: string;
  branch: string;
  id: string;
  name: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Center {
  _id: string;
  center: string;
  institutions: Institution[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AllMenageCenter({ data }: { data: Center[] }) {
  const [centers, setCenters] = useState<Center[]>(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [centerToDelete, setCenterToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [expandedCenter, setExpandedCenter] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!centerToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/manage-center/${centerToDelete}`
      );
      setCenters(centers.filter((center) => center._id !== centerToDelete));
      toast.success("Center deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete center");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setCenterToDelete(null);
    }
  };

  const openDeleteModal = (centerId: string) => {
    setCenterToDelete(centerId);
    setIsDeleteModalOpen(true);
  };

  const openDetailsModal = (institution: Institution) => {
    setSelectedInstitution(institution);
    setIsDetailsModalOpen(true);
  };

  const toggleCenterExpansion = (centerId: string) => {
    setExpandedCenter(expandedCenter === centerId ? null : centerId);
  };

  const formatDate = (dateString: string) => {
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Centers</h1>
          <p className="text-gray-600">
            Manage your organization`s centers and institutions
          </p>
        </div>
        <Link
          href="/dashboard/create/menage-center"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Center
        </Link>
      </div>

      {/* Center Cards */}
      <div className="space-y-4">
        {centers.map((center) => (
          <div
            key={center._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Home className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {center.center}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>
                        {center.institutions.length} institution
                        {center.institutions.length !== 1 ? "s" : ""}
                      </span>
                      <span className="mx-2">•</span>
                      <span>Created: {formatDate(center.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleCenterExpansion(center._id)}
                    className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-50 transition"
                    title={
                      expandedCenter === center._id ? "Collapse" : "Expand"
                    }
                  >
                    {expandedCenter === center._id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  <Link
                    href={`/dashboard/created-data/menage-center/${center._id}`}
                    className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(center._id)}
                    className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {expandedCenter === center._id && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Building className="h-5 w-5 text-blue-500 mr-2" />
                    Institutions
                  </h3>
                  <div className="space-y-4">
                    {center.institutions.map((institution) => (
                      <div
                        key={institution._id}
                        className="bg-gray-50 p-4 rounded-md border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {institution.name}
                            </h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-3">ID: {institution.id}</span>
                              <span
                                className={`px-2 py-0.5 text-xs rounded-full ${
                                  institution.isDeleted
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {institution.isDeleted ? "Inactive" : "Active"}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openDetailsModal(institution)}
                              className="p-1.5 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition"
                              title="Details"
                            >
                              <Info className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {centers.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Home className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No centers found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new center.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/create/center"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Center
            </Link>
          </div>
        </div>
      )}

      {/* Institution Details Modal */}
      {isDetailsModalOpen && selectedInstitution && (
        <div className="fixed inset-0 bg-[#000000bd] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <Building className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Institution Details
                  </h3>
                </div>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Name</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {selectedInstitution.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">ID</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedInstitution.id}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Status
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedInstitution.isDeleted
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedInstitution.isDeleted ? "Inactive" : "Active"}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {selectedInstitution.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Created
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {formatDate(selectedInstitution.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Updated
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {formatDate(selectedInstitution.updatedAt)}
                    </p>
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
                Are you sure you want to delete this center? This will also
                remove all associated institutions. This action cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setCenterToDelete(null);
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
