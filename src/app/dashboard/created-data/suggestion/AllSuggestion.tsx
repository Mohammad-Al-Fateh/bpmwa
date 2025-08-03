"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FileText,
  BookOpen,
  Trash2,
  Edit,
  Plus,
  AlertCircle,
  X,
} from "lucide-react";

interface Suggestion {
  _id: string;
  subject: string;
  class: string;
  chapter: string;
  topic: string;
  questionType: string;
  marks: number;
  suggestionText: string;
  examYear: string;
  institution: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function AllSuggestion({ data }: { data: Suggestion[] }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [suggestionToDelete, setSuggestionToDelete] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);

  const handleDelete = async () => {
    if (!suggestionToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/suggestion/hard/${suggestionToDelete}`
      );
      setSuggestions(
        suggestions.filter((sug) => sug._id !== suggestionToDelete)
      );
      toast.success("Suggestion deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete suggestion");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setSuggestionToDelete(null);
    }
  };

  const openDeleteModal = (suggestionId: string) => {
    setSuggestionToDelete(suggestionId);
    setIsDeleteModalOpen(true);
  };

  const openDetailModal = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
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
          <h1 className="text-3xl font-bold text-gray-800">All Suggestions</h1>
          <p className="text-gray-600">
            Manage your organization`s academic suggestions
          </p>
        </div>
        <Link
          href="/dashboard/create/suggestion"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Suggestion
        </Link>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion._id}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      {suggestion.subject}
                    </h2>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Topic: {suggestion.topic}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/created-data/suggestion/${suggestion._id}`}
                    className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(suggestion._id)}
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
                    Class
                  </h3>
                  <div className="text-sm text-gray-700">
                    {suggestion.class}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Chapter
                  </h3>
                  <div className="text-sm text-gray-700">
                    {suggestion.chapter}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    <BookOpen className="h-4 w-4 inline mr-1" />
                    Question Type
                  </h3>
                  <div className="text-sm text-gray-700">
                    {suggestion.questionType}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Marks
                  </h3>
                  <div className="text-sm text-gray-700">
                    {suggestion.marks}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Suggestion
                  </h3>
                  <div className="text-sm text-gray-700 line-clamp-2">
                    {suggestion.suggestionText}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Active
                </span>
                <button
                  onClick={() => openDetailModal(suggestion)}
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
      {suggestions.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No suggestions found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new suggestion.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/create/suggestion"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Suggestion
            </Link>
          </div>
        </div>
      )}

      {/* Suggestion Details Modal */}
      {detailModalOpen && selectedSuggestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FileText className="h-6 w-6 text-blue-500 mr-2" />
                    {selectedSuggestion.subject}
                  </h2>
                  <div className="text-sm text-gray-500 mt-1">
                    Topic: {selectedSuggestion.topic} | Created:{" "}
                    {formatDate(selectedSuggestion.createdAt)}
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
                    Class
                  </h3>
                  <p className="text-gray-700">{selectedSuggestion.class}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Chapter
                  </h3>
                  <p className="text-gray-700">{selectedSuggestion.chapter}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Question Type
                  </h3>
                  <p className="text-gray-700">
                    {selectedSuggestion.questionType}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Marks
                  </h3>
                  <p className="text-gray-700">{selectedSuggestion.marks}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Suggestion Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800">
                      Suggestion Text
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedSuggestion.suggestionText}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800">Exam Year</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedSuggestion.examYear}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800">Institution</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedSuggestion.institution}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800">Created</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(selectedSuggestion.createdAt)}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800">Updated</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(selectedSuggestion.updatedAt)}
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
                Are you sure you want to delete this suggestion? This action
                cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSuggestionToDelete(null);
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
