"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Edit2,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

interface ClassData {
  _id: string;
  id: string;
  name: string;
  isDeleted: boolean;
  branch: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AllClassProps {
  data: ClassData[];
}

export default function AllClass({ data: initialData }: AllClassProps) {
  const [data, setData] = useState<ClassData[]>(initialData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ClassData>>({});
  const [newClass, setNewClass] = useState({ id: "", name: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ClassData;
    direction: "ascending" | "descending";
  } | null>(null);

  const requestSort = (key: keyof ClassData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      // Handle null values
      if (a[sortConfig.key] === null) return 1;
      if (b[sortConfig.key] === null) return -1;
      if (a[sortConfig.key] === null && b[sortConfig.key] === null) return 0;

      // Type-safe comparison
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      }

      // Compare date strings by converting to Date objects
      if (
        (sortConfig.key === "createdAt" || sortConfig.key === "updatedAt") &&
        typeof aValue === "string" &&
        typeof bValue === "string"
      ) {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortConfig.direction === "ascending"
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }

      // Fallback for other types
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortConfig.direction === "ascending" ? 1 : -1;
      if (bValue == null) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleDeleteClick = (id: string) => {
    setClassToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!classToDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/class/${classToDelete}/force`
      );
      setData(data.filter((item) => item._id !== classToDelete));
      toast.success("Class deleted successfully");
    } catch (error) {
      toast.error("Failed to delete class");
      console.error("Delete error:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setClassToDelete(null);
    }
  };

  const startEdit = (item: ClassData) => {
    setEditingId(item._id);
    setEditForm({ id: item.id, name: item.name });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/class/${id}`,
        editForm
      );
      setData(
        data.map((item) =>
          item._id === id ? { ...item, ...response.data } : item
        )
      );
      setEditingId(null);
      toast.success("Class updated successfully");
    } catch (error) {
      toast.error("Failed to update class");
      console.error("Update error:", error);
    }
  };

  const handleAddClass = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/class`,
        newClass
      );
      setData([response.data, ...data]);
      setNewClass({ id: "", name: "" });
      setIsAdding(false);
      toast.success("Class added successfully");
    } catch (error) {
      toast.error("Failed to add class");
      console.error("Add error:", error);
    }
  };

  const getSortIcon = (key: keyof ClassData) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="inline ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="inline ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertTriangle className="text-yellow-500 mr-2" size={24} />
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            </div>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this class? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center"
              >
                <Trash2 className="mr-2" size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Class Management
            </h2>
            <Link
              href={"/dashboard/create/class"}
              // onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <Plus className="mr-2" size={16} />
              Add Class
            </Link>
          </div>
        </div>

        {/* Add Class Form */}
        {isAdding && (
          <div className="p-6 border-b border-gray-200 bg-blue-50">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Add New Class
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="new-class-id"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Class ID
                </label>
                <input
                  id="new-class-id"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newClass.id}
                  onChange={(e) =>
                    setNewClass({ ...newClass, id: e.target.value })
                  }
                  placeholder="Enter class ID"
                />
              </div>
              <div>
                <label
                  htmlFor="new-class-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Class Name
                </label>
                <input
                  id="new-class-name"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newClass.name}
                  onChange={(e) =>
                    setNewClass({ ...newClass, name: e.target.value })
                  }
                  placeholder="Enter class name"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClass}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                disabled={!newClass.id || !newClass.name}
              >
                <CheckCircle className="mr-2" size={16} />
                Save
              </button>
            </div>
          </div>
        )}

        {/* Class Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  <div className="flex items-center">
                    Class ID
                    {getSortIcon("id")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center">
                    Class Name
                    {getSortIcon("name")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("createdAt")}
                >
                  <div className="flex items-center">
                    Created At
                    {getSortIcon("createdAt")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("updatedAt")}
                >
                  <div className="flex items-center">
                    Updated At
                    {getSortIcon("updatedAt")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  {editingId === item._id ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editForm.id || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, id: e.target.value })
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editForm.name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => saveEdit(item._id)}
                            className="text-green-600 hover:text-green-900"
                            disabled={!editForm.id || !editForm.name}
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => startEdit(item)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No classes found. Add a new class to get started.
          </div>
        )}
      </div>
    </div>
  );
}
