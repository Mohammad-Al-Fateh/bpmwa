"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  BookOpen,
  Calendar,
  Clock,
  Layers,
  Users,
  Trash2,
  Edit,
  Plus,
  AlertCircle,
  X,
  Info,
} from "lucide-react";

interface Group {
  _id: string;
  groupName: string;
  description: string;
}

interface Exam {
  _id: string;
  name: string;
  date: string;
  releaseDate: string;
  registrationStart: string;
  registrationEnd: string;
  fees: number;
  subjects: string[];
  groups: Group[];
  class: string[];
  isDeleted: boolean;
  totalStudents: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AllExam({ data }: { data: Exam[] }) {
  const [exams, setExams] = useState<Exam[]>(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!examToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/${examToDelete}/force`
      );
      setExams(exams.filter((exam) => exam._id !== examToDelete));
      toast.success("Exam deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete exam");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setExamToDelete(null);
    }
  };

  const openDeleteModal = (examId: string) => {
    setExamToDelete(examId);
    setIsDeleteModalOpen(true);
  };

  const openDetailsModal = (exam: Exam) => {
    setSelectedExam(exam);
    setIsDetailsModalOpen(true);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Exams</h1>
          <p className="text-gray-600">
            Manage your organization`s exams and schedules
          </p>
        </div>
        <Link
          href="/dashboard/create/exam"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Exam
        </Link>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      {exam.name}
                    </h2>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Date: {formatDate(exam.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Created: {formatDate(exam.createdAt)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openDetailsModal(exam)}
                    className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-50 transition"
                    title="Details"
                  >
                    <Info className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/dashboard/created-data/exam/${exam._id}`}
                    className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(exam._id)}
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
                    Registration Period
                  </h3>
                  <div className="text-sm text-gray-700">
                    <div>Start: {formatDate(exam.registrationStart)}</div>
                    <div>End: {formatDate(exam.registrationEnd)}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Fees
                  </h3>
                  <div className="text-sm text-gray-700">
                    {formatCurrency(exam.fees)}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <Layers className="h-4 w-4 inline mr-1" />
                    Subjects ({exam.subjects.length})
                  </h3>
                  <div className="text-sm text-gray-700 line-clamp-2">
                    {exam.subjects.join(", ")}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <Users className="h-4 w-4 inline mr-1" />
                    Groups ({exam.groups.length})
                  </h3>
                  <div className="text-sm text-gray-700 line-clamp-2">
                    {exam.groups.map((g) => g.groupName).join(", ")}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    exam.isDeleted
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {exam.isDeleted ? "Inactive" : "Active"}
                </span>
                <div className="text-sm text-gray-500">
                  {exam.class.length} classes
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {exams.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No exams found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new exam.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/create/exam"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Exam
            </Link>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && selectedExam && (
        <div className="fixed inset-0 bg-[#000000bd] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedExam.name} - Exam Details
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Exam Date
                    </h4>
                    <p className="text-sm text-gray-700">
                      {formatDate(selectedExam.date)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Release Date
                    </h4>
                    <p className="text-sm text-gray-700">
                      {formatDate(selectedExam.releaseDate)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Registration Start
                    </h4>
                    <p className="text-sm text-gray-700">
                      {formatDate(selectedExam.registrationStart)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Registration End
                    </h4>
                    <p className="text-sm text-gray-700">
                      {formatDate(selectedExam.registrationEnd)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fees</h4>
                  <p className="text-sm text-gray-700">
                    {formatCurrency(selectedExam.fees)}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Subjects
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedExam.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Groups</h4>
                  <div className="mt-2 space-y-2">
                    {selectedExam.groups.map((group, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <h5 className="text-sm font-medium text-gray-700">
                          {group.groupName}
                        </h5>
                        <p className="text-xs text-gray-500 mt-1">
                          {group.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Classes</h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedExam.class.map((cls, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Attended Student : {selectedExam?.totalStudents || 0}
                    </h4>
                    <h4 className="text-sm font-medium text-gray-500">
                      Status
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedExam.isDeleted
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {selectedExam.isDeleted ? "Inactive" : "Active"}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Last Updated
                    </h4>
                    <p className="text-sm text-gray-700">
                      {formatDate(selectedExam.updatedAt)}
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
                Are you sure you want to delete this exam? This action cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setExamToDelete(null);
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
