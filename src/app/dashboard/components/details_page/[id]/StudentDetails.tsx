"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  BookOpen,
  Hash,
  MapPin,
  Users,
  Home,
  Cake,
  Phone,
  Mail,
  VenetianMask,
  Bookmark,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";

interface Address {
  present: string;
  permanent: string;
}

interface UserData {
  registerNo: string;
  roll: string;
  name: string;
  number: string;
  image: string;
  gender: string;
  dateOfBirth: string;
  address: Address;
  email: string;
  role: string;
  type: string;
}

interface Institution {
  name: string;
  address?: string;
}

interface StudentClass {
  name: string;
}

interface Exam {
  _id: string;
  name: string;
  date: string;
}

interface StudentData {
  registerNo: string;
  fatherName?: string;
  motherName?: string;
  roll: string;
  center: string;
  institution: Institution;
  studentClass: StudentClass;
  attendedExams: Exam[];
  createdAt: string;
}

interface ApiResponse {
  result: StudentData;
  user: UserData;
}

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    academic: true,
    exams: false,
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/student/${id}`
        );
        setStudent(response.data.data);
      } catch (err) {
        setError("Failed to fetch student data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentData();
    }
  }, [id]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-12 text-gray-500">
        No student data found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Student Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Image
                width={100}
                height={100}
                src={student.user.image}
                alt={student.user.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <span className="absolute bottom-0 right-0 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {student.user.role}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{student.user.name}</h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-1" />
                  <span>Roll: {student.result.roll}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Reg: {student.result.registerNo}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Class: {student.result.studentClass.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Personal Information Section */}
          <div className="mb-8 border-b pb-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("personal")}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <VenetianMask className="h-5 w-5 mr-2 text-blue-500" />
                Personal Information
              </h2>
              {expandedSections.personal ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>

            {expandedSections.personal && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Basic Details
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Gender:</span>{" "}
                      <span className="capitalize">{student.user.gender}</span>
                    </p>
                    <p className="flex items-center">
                      <Cake className="h-4 w-4 mr-2" />
                      <span className="text-gray-600">DOB:</span>{" "}
                      <span>{formatDate(student.user.dateOfBirth)}</span>
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-gray-600">Email:</span>{" "}
                      <span>{student.user.email}</span>
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-gray-600">Phone:</span>{" "}
                      <span>{student.user.number}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Address
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm text-gray-600">
                        Present Address:
                      </p>
                      <p>{student.user.address.present}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-600">
                        Permanent Address:
                      </p>
                      <p>{student.user.address.permanent}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Parent Information
                  </h3>
                  <div className="space-y-2">
                    {student.result.fatherName && (
                      <p>
                        <span className="text-gray-600">Father:</span>{" "}
                        <span>{student.result.fatherName}</span>
                      </p>
                    )}
                    {student.result.motherName && (
                      <p>
                        <span className="text-gray-600">Mother:</span>{" "}
                        <span>{student.result.motherName}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Academic Information Section */}
          <div className="mb-8 border-b pb-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("academic")}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <Bookmark className="h-5 w-5 mr-2 text-blue-500" />
                Academic Information
              </h2>
              {expandedSections.academic ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>

            {expandedSections.academic && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Current Details
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Class:</span>{" "}
                      <span>{student.result.studentClass.name}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Roll No:</span>{" "}
                      <span>{student.result.roll}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Center:</span>{" "}
                      <span>{student.result.center}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Registration Date:</span>{" "}
                      <span>{formatDate(student.result.createdAt)}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Institution
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Name:</span>{" "}
                      <span>{student.result.institution.name}</span>
                    </p>
                    {student.result.institution.address && (
                      <p>
                        <span className="text-gray-600">Address:</span>{" "}
                        <span>{student.result.institution.address}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Exam History Section */}
          <div className="mb-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("exams")}
            >
              <h2 className="text-xl font-semibold flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-500" />
                Exam History
              </h2>
              {expandedSections.exams ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>

            {expandedSections.exams && (
              <div className="mt-4">
                {student.result.attendedExams.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Exam Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {student.result.attendedExams.map((exam) => (
                          <tr key={exam._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {exam.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {formatDate(exam.date)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                    No exam history available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
