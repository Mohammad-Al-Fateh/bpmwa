/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiSearch,
  FiTrash2,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";
import Link from "next/link";

interface Student {
  _id: string;
  registerNo: string;
  roll: string;
  attendedExamsCount: number;
  center?: string;
}

interface Exam {
  _id: string;
  name: string;
  subjects: string[];
}

interface ApiResponse {
  data: Student[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface ExamsResponse {
  success: boolean;
  data: Exam[];
}

export default function MakeExamNee() {
  const institutionId = localStorage.getItem("ins");
  const [students, setStudents] = useState<Student[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    students: true,
    exams: true,
    submitting: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // Fetch students
  const fetchStudents = async () => {
    if (!institutionId) return;

    setLoading((prev) => ({ ...prev, students: true }));
    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/student/institution/make-examanee/${institutionId}`,
        {
          params: {
            examId: selectedExam,
            page: pagination.page,
            limit: pagination.limit,
            search: searchTerm,
          },
        }
      );

      setStudents(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.meta.total,
        totalPages: response.data.meta.totalPages,
      });
    } catch (error) {
      toast.error("Failed to fetch students");
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, students: false }));
    }
  };

  // Fetch exams
  const fetchExams = async () => {
    setLoading((prev) => ({ ...prev, exams: true }));
    try {
      const response = await axios.get<ExamsResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/select/exam`
      );
      setExams(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch exams");
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, exams: false }));
    }
  };

  const handleDelete = async (studentId: string) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/student/soft/${studentId}`
      );
      toast.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to delete student");
      console.error(error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPagination({ ...pagination, page: newPage });
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const selectAllStudents = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student._id));
    }
  };

  const registerStudentsForExam = async () => {
    if (!selectedExam) {
      toast.error("Please select an exam first");
      return;
    }

    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    setLoading((prev) => ({ ...prev, submitting: true }));

    try {
      // Process registrations sequentially
      for (const studentId of selectedStudents) {
        try {
          await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_V1}/exam`, {
            examId: selectedExam,
            studentId,
          });
        } catch (error) {
          console.error(`Failed to register student ${studentId}:`, error);
          // Continue with next student even if one fails
        }
      }

      toast.success(
        `Successfully registered ${selectedStudents.length} student(s) for exam`
      );
      setSelectedStudents([]);
      fetchStudents(); // Refresh student data
    } catch (error) {
      toast.error("Failed to complete registration process");
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [pagination.page, searchTerm, selectedExam]); // Added selectedExam to dependencies

  useEffect(() => {
    fetchExams();
  }, []);

  if (!institutionId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          No institution selected. Please select an institution first.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Register Students for Exam</h1>

      {/* Exam Selection */}
      <div className="mb-6">
        <label
          htmlFor="exam"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Exam
        </label>
        <select
          id="exam"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          disabled={loading.exams}
        >
          <option value="">-- Select an exam --</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.name} ({exam.subjects.length} subjects)
            </option>
          ))}
        </select>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by register no, roll or center..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Register Button (shown when students are selected) */}
        {selectedStudents.length > 0 && (
          <button
            onClick={registerStudentsForExam}
            disabled={!selectedExam || loading.submitting}
            className={`flex items-center px-4 py-2 rounded-md text-white ${
              !selectedExam || loading.submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading.submitting ? (
              <>
                <span className="animate-spin mr-2">↻</span>
                Processing...
              </>
            ) : (
              <>
                <FiCheckCircle className="mr-2" />
                Register {selectedStudents.length} Student(s)
              </>
            )}
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading.students && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Students Table */}
      {!loading.students && (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={
                        selectedStudents.length === students.length &&
                        students.length > 0
                      }
                      onChange={selectAllStudents}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Register No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Center
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exams Attended
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => toggleStudentSelection(student._id)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.registerNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.roll}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.center || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.attendedExamsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                        <Link
                          href={`/dashboard/components/details_page/${student._id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(pagination.page - 1) * pagination.limit + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}
                  </span>{" "}
                  of <span className="font-medium">{pagination.total}</span>{" "}
                  students
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`px-3 py-1 rounded-md ${
                    pagination.page === 1
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FiChevronLeft size={18} />
                </button>
                <span className="px-3 py-1 bg-blue-500 text-white rounded-md">
                  {pagination.page}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className={`px-3 py-1 rounded-md ${
                    pagination.page === pagination.totalPages
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
