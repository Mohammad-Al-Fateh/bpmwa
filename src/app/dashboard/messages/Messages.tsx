"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Mail,
  Phone,
  Copy,
  Trash2,
  AlertCircle,
  X,
  Check,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Message {
  _id: string;
  title: string;
  isDeleted: boolean;
  description: string;
  number: string;
  type: string;
  __v: number;
}

export default function Messages({ data }: { data: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(data);
  const [filterType, setFilterType] = useState<string>("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<
    Record<string, boolean>
  >({});

  // Filter messages by type
  const filteredMessages = messages.filter((message) => {
    if (filterType === "all") return true;
    return message.type === filterType;
  });

  // Format phone number
  const formatPhoneNumber = (number: string) => {
    if (number.startsWith("+88")) return number;
    if (number.startsWith("88")) return `+${number}`;
    if (number.startsWith("0")) return `+88${number}`;
    return `+88${number}`;
  };

  // Copy phone number to clipboard
  const copyPhoneNumber = (number: string) => {
    const formattedNumber = formatPhoneNumber(number);
    navigator.clipboard.writeText(formattedNumber);
    toast.success("Phone number copied to clipboard");
  };

  // Toggle message expansion
  const toggleMessageExpansion = (id: string) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: string) => {
    setMessageToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Delete message
  const handleDelete = async () => {
    if (!messageToDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/contact/${messageToDelete}`
      );
      setMessages(
        messages.filter((message) => message._id !== messageToDelete)
      );
      toast.success("Message deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete message");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
      setMessageToDelete(null);
    }
  };

  // Get all unique message types
  const messageTypes = [
    "all",
    ...new Set(messages.map((message) => message.type)),
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-600">
            Manage and respond to all incoming messages
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Filter by:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {messageTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-sm capitalize ${
                  filterType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              {filterType === "all"
                ? "No messages available"
                : `No ${filterType} messages`}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {filterType !== "all"
                ? "Try changing your filter"
                : "All messages will appear here"}
            </p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 capitalize">
                          {message.type}: {message.title}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="h-4 w-4 mr-1" />
                          <a
                            href={`tel:${formatPhoneNumber(message.number)}`}
                            className="hover:text-blue-600 hover:underline"
                          >
                            {formatPhoneNumber(message.number)}
                          </a>
                          <button
                            onClick={() => copyPhoneNumber(message.number)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            title="Copy number"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleMessageExpansion(message._id)}
                      className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-50 transition"
                      title={
                        expandedMessages[message._id] ? "Collapse" : "Expand"
                      }
                    >
                      {expandedMessages[message._id] ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => openDeleteModal(message._id)}
                      className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {expandedMessages[message._id] && (
                  <div className="mt-4 pl-11">
                    <div className="border-t pt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Message Details
                      </h3>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {message.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Confirm Deletion
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this message? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setMessageToDelete(null);
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
                      <Check className="h-5 w-5 mr-1 inline" />
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
