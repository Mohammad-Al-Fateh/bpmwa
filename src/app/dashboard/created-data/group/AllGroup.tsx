"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Users,
  BookOpen,
  Calendar,
  ArrowRight,
  Trash2,
  Edit,
  Plus,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Syllabus {
  _id: string;
  name: string;
  description: string;
}

interface Exam {
  _id: string;
  name: string;
  date: string;
  fees: number;
  isDeleted: boolean;
  registrationStart: string;
  registrationEnd: string;
}

interface Group {
  _id: string;
  id: string;
  name: string;
  fromClass: string;
  toClass: string;
  syllabus: Syllabus[];
  exam: Exam[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AllGroup({ data }: { data: Group[] }) {
  const [groups, setGroups] = useState<Group[]>(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    syllabus: false,
    exams: false,
  });

  const handleDelete = async () => {
    if (!groupToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/group/${groupToDelete}/force`
      );
      setGroups(groups.filter((group) => group._id !== groupToDelete));
      toast.success("Group deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete group");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setGroupToDelete(null);
    }
  };

  const openDeleteModal = (groupId: string) => {
    setGroupToDelete(groupId);
    setIsDeleteModalOpen(true);
  };

  const openDetailModal = (group: Group) => {
    setSelectedGroup(group);
    setDetailModalOpen(true);
    setExpandedSections({ syllabus: false, exams: false });
  };

  const toggleSection = (section: "syllabus" | "exams") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
          <h1 className="text-3xl font-bold text-gray-800">All Groups</h1>
          <p className="text-gray-600">
            Manage your organization`s student groups
          </p>
        </div>
        <Link
          href="/dashboard/create/group"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Group
        </Link>
      </div>

      {/* Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      {group.name}
                    </h2>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>ID: {group.id}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/created-data/group/${group._id}`}
                    className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(group._id)}
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
                    Class Range
                  </h3>
                  <div className="flex items-center text-sm text-gray-700">
                    {group.fromClass} <ArrowRight className="h-4 w-4 mx-1" />{" "}
                    {group.toClass}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Created
                  </h3>
                  <div className="text-sm text-gray-700">
                    {formatDate(group.createdAt)}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    Syllabus ({group.syllabus.length})
                  </h3>
                  <div className="text-sm text-gray-700 line-clamp-2">
                    {group.syllabus.map((s) => s.name).join(", ")}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Exams ({group.exam.length})
                  </h3>
                  <div className="text-sm text-gray-700 line-clamp-2">
                    {group.exam.map((e) => e.name).join(", ")}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    group.isDeleted
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {group.isDeleted ? "Inactive" : "Active"}
                </span>
                <button
                  onClick={() => openDetailModal(group)}
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
      {groups.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No groups found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new group.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/create/group"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Group
            </Link>
          </div>
        </div>
      )}

      {/* Group Details Modal */}
      {detailModalOpen && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Users className="h-6 w-6 text-blue-500 mr-2" />
                    {selectedGroup.name}
                  </h2>
                  <div className="text-sm text-gray-500 mt-1">
                    ID: {selectedGroup.id} | Created:{" "}
                    {formatDate(selectedGroup.createdAt)}
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Class Range
                  </h3>
                  <p className="flex items-center text-gray-700">
                    {selectedGroup.fromClass}{" "}
                    <ArrowRight className="h-4 w-4 mx-2" />{" "}
                    {selectedGroup.toClass}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Status
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      selectedGroup.isDeleted
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedGroup.isDeleted ? "Inactive" : "Active"}
                  </span>
                </div>
              </div>

              {/* Syllabus Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection("syllabus")}
                  className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 mb-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <span>Syllabus ({selectedGroup.syllabus.length})</span>
                  {expandedSections.syllabus ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSections.syllabus && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedGroup.syllabus.length > 0 ? (
                      selectedGroup.syllabus.map((item) => (
                        <div key={item._id} className="mb-4 last:mb-0">
                          <h4 className="font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No syllabus items available
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Exams Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection("exams")}
                  className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 mb-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <span>Exams ({selectedGroup.exam.length})</span>
                  {expandedSections.exams ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSections.exams && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedGroup.exam.length > 0 ? (
                      selectedGroup.exam.map((exam) => (
                        <div
                          key={exam._id}
                          className="mb-4 last:mb-0 border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800">
                              {exam.name}
                            </h4>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {formatDate(exam.date)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <div>
                              <span className="text-gray-500">
                                Registration:{" "}
                              </span>
                              <span className="text-gray-700">
                                {formatDate(exam.registrationStart)} to{" "}
                                {formatDate(exam.registrationEnd)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Fees: </span>
                              <span className="text-gray-700">
                                ${exam.fees}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No exams available</p>
                    )}
                  </div>
                )}
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
                Are you sure you want to delete this group? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setGroupToDelete(null);
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
