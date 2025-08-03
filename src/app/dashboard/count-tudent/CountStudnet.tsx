/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  ChevronDown,
  ChevronUp,
  User,
  BookOpen,
  Hash,
  MapPin,
  Eye,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Student {
  _id: string;
  registerNo: string;
  roll: number;
  center: string;
  studentClass: string;
}

interface Exam {
  _id: string;
  name: string;
}

export default function CountStudent() {
  const institutionId = localStorage.getItem("ins");
  const [students, setStudents] = useState<Student[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student;
    direction: "ascending" | "descending";
  } | null>(null);
  const [fetchingStudents, setFetchingStudents] = useState(false);

  useEffect(() => {
    if (!institutionId) {
      setError("Institution ID not found");
      setLoading(false);
      return;
    }

    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/all/exam`
        );
        setExams(response.data.data);
      } catch (err) {
        setError("Failed to fetch exams");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [institutionId]);

  useEffect(() => {
    if (selectedExam && institutionId) {
      fetchStudentsForExam(selectedExam);
    } else {
      setStudents([]);
    }
  }, [selectedExam, institutionId]);

  const fetchStudentsForExam = async (examId: string) => {
    try {
      setFetchingStudents(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/all/student/${examId}`,
        {
          params: {
            institutionId: institutionId,
          },
        }
      );
      setStudents(response.data.data);
    } catch (err) {
      setError("Failed to fetch students");
      console.error(err);
    } finally {
      setFetchingStudents(false);
    }
  };

  const handleSort = (key: keyof Student) => {
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

  const sortedStudents = [...students];
  if (sortConfig !== null) {
    sortedStudents.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const filteredStudents = sortedStudents.filter((student) => {
    // Safe property access with fallbacks
    const registerNo = student?.registerNo?.toString()?.toLowerCase() ?? "";
    const roll = student?.roll?.toString() ?? "";
    const center = student?.center?.toString()?.toLowerCase() ?? "";
    const studentClass = student?.studentClass?.toString()?.toLowerCase() ?? "";
    const searchTermLower = searchTerm.toLowerCase();

    const matchesSearch =
      registerNo.includes(searchTermLower) ||
      roll.includes(searchTerm) ||
      center.includes(searchTermLower) ||
      studentClass.includes(searchTermLower);

    const matchesClass = selectedClass
      ? student?.studentClass === selectedClass
      : true;

    return matchesSearch && matchesClass;
  });

  const classOptions = [
    ...new Set(students.map((student) => student.studentClass)),
  ];

  const getSortIcon = (key: keyof Student) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Student Examination Report
          </h1>
          <div className="flex items-center space-x-2">
            {students.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                Total Students: {filteredStudents.length}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="col-span-1">
            <label
              htmlFor="exam-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Exam
            </label>
            <select
              id="exam-select"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              <option value="">-- Select Exam --</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="class-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Class
            </label>
            <select
              id="class-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={!selectedExam}
            >
              <option value="">All Classes</option>
              {classOptions.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 relative">
            <label
              htmlFor="exam-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <div className="absolute top-5 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={!selectedExam}
            />
          </div>
        </div>

        {fetchingStudents ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : selectedExam && students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("registerNo")}
                  >
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      Register No
                      {getSortIcon("registerNo")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("roll")}
                  >
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-1" />
                      Roll No
                      {getSortIcon("roll")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("studentClass")}
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Class
                      {getSortIcon("studentClass")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("center")}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Center
                      {getSortIcon("center")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={`${student.registerNo}-${index}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.registerNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.roll}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.studentClass}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.center}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/dashboard/components/details_page/${student._id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : selectedExam ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No students found for this exam</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Please select an exam to view students
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
