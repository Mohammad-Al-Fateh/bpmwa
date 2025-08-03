"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Building,
  MapPin,
  Trash2,
  Edit,
  Plus,
  AlertCircle,
  X,
} from "lucide-react";

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

interface Institution {
  _id: string;
  id: string;
  name: string;
  address: string;
  pin: string;
  phone: string;
  password: string;
  branch: Branch;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AllInstitution({ data }: { data: Institution[] }) {
  const [institutions, setInstitutions] = useState<Institution[]>(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [institutionToDelete, setInstitutionToDelete] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  const handleDelete = async () => {
    if (!institutionToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/institution/${institutionToDelete}/force`
      );
      setInstitutions(
        institutions.filter((inst) => inst._id !== institutionToDelete)
      );
      toast.success("Institution deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete institution");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setInstitutionToDelete(null);
    }
  };

  const openDeleteModal = (institutionId: string) => {
    setInstitutionToDelete(institutionId);
    setIsDeleteModalOpen(true);
  };

  const openDetailModal = (institution: Institution) => {
    setSelectedInstitution(institution);
    setDetailModalOpen(true);
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
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Institutions</h1>
          <p className="text-gray-600">
            Manage your organization`s institutions
          </p>
        </div>
        <Link
          href="/dashboard/create/institution"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Institution
        </Link>
      </div>

      {/* Institution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutions.map((institution) => (
          <div
            key={institution._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Building className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      {institution.name}
                    </h2>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>ID: {institution.id}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/created-data/institution/${institution._id}`}
                    className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(institution._id)}
                    className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Address
                  </h3>
                  <div className="text-sm text-gray-700">
                    {institution.address}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Created
                  </h3>
                  <div className="text-sm text-gray-700">
                    {formatDate(institution.createdAt)}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Branch
                  </h3>
                  <div className="text-sm text-gray-700">
                    {institution.branch.name} ({institution.branch.address})
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    phone
                  </h3>
                  <div className="text-sm text-gray-700">
                    {institution?.phone} ({institution?.phone})
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    institution.isDeleted
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {institution.isDeleted ? "Inactive" : "Active"}
                </span>
                <button
                  onClick={() => openDetailModal(institution)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {institutions.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Building className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No institutions found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new institution.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/create/institution"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Institution
            </Link>
          </div>
        </div>
      )}

      {/* Institution Details Modal */}
      {detailModalOpen && selectedInstitution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Building className="h-6 w-6 text-blue-500 mr-2" />
                    {selectedInstitution.name}
                  </h2>
                  <div className="text-sm text-gray-500 mt-1">
                    ID: {selectedInstitution.id} | Created:{" "}
                    {formatDate(selectedInstitution.createdAt)}
                  </div>
                </div>
                <button
                  onClick={() => setDetailModalOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 grid grid-cols-2 gap-3 p-4 rounded-lg">
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Pin
                    </h3>
                    <p className="text-gray-700">{selectedInstitution?.pin}</p>
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Password
                    </h3>
                    <p className="text-gray-700">
                      {selectedInstitution?.password}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Address
                  </h3>
                  <p className="text-gray-700">{selectedInstitution.address}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Status
                  </h3>
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

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Branch Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800">
                      {selectedInstitution.branch.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Address: {selectedInstitution.branch.address}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Created:{" "}
                      {formatDate(selectedInstitution.branch.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Updated:{" "}
                      {formatDate(selectedInstitution.branch.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setDetailModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
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
                Are you sure you want to delete this institution? This action
                cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setInstitutionToDelete(null);
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
