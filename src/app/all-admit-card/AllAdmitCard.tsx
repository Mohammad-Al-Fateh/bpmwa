/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import GenerateAdmitCard from "./GenerateAdmitCard";

interface Exam {
  _id: string;
  name: string;
}

interface Class {
  _id: string;
  name: string;
}

interface Student {
  examName: string;
  examDate: Date;
  center: string;
  name: string;
  fatherName: string;
  motherName: string;
  className: string;
  roll: string;
  registerNo: string;
  gender: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface StudentResponse {
  students: Student[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    studentsPerPage: number;
  };
}

export default function AllAdmitCard() {
  const [institution, setInstitution] = useState<string>("");
  const [exams, setExams] = useState<Exam[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState({
    exams: false,
    classes: false,
    students: false,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalStudents: 0,
    studentsPerPage: 50,
  });

  const { register, watch, setValue } = useForm({
    defaultValues: {
      examId: "",
      classId: "",
    },
  });

  const formValues = watch();
  const router = useRouter();

  // Load institution from localStorage
  useEffect(() => {
    const inst = localStorage.getItem("ins");
    if (inst) {
      setInstitution(inst);
    } else {
      router.push("/login");
    }
  }, [router]);

  // Fetch exams when institution is set
  useEffect(() => {
    if (institution) {
      fetchExams();
    }
  }, [institution]);

  // Fetch classes when institution is set
  useEffect(() => {
    if (institution) {
      fetchClasses();
    }
  }, [institution]);

  // Fetch students when exam or class changes
  useEffect(() => {
    if (formValues.examId && formValues.classId && institution) {
      fetchStudents();
    }
  }, [formValues.examId, formValues.classId, pagination.currentPage]);

  const fetchExams = async () => {
    setLoading((prev) => ({ ...prev, exams: true }));
    try {
      const response = await axios.get<ApiResponse<Exam[]>>(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/all/exam`
      );
      setExams(response.data.data);
      if (response.data.data.length > 0) {
        setValue("examId", response.data.data[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    } finally {
      setLoading((prev) => ({ ...prev, exams: false }));
    }
  };

  const fetchClasses = async () => {
    setLoading((prev) => ({ ...prev, classes: true }));
    try {
      const response = await axios.get<ApiResponse<{ classes: Class[] }>>(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/class`
      );
      setClasses(response.data.data.classes);
      if (response.data.data.classes.length > 0) {
        setValue("classId", response.data.data.classes[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setLoading((prev) => ({ ...prev, classes: false }));
    }
  };

  const fetchStudents = async () => {
    setLoading((prev) => ({ ...prev, students: true }));
    try {
      const response = await axios.get<ApiResponse<StudentResponse>>(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/all/card/${formValues.examId}`,
        {
          params: {
            institution: institution,
            class: formValues.classId,
            page: pagination.currentPage,
            limit: pagination.studentsPerPage,
          },
        }
      );
      setStudents(response.data.data.students);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading((prev) => ({ ...prev, students: false }));
    }
  };

  // const handlePageChange = (newPage: number) => {
  //   setPagination((prev) => ({ ...prev, currentPage: newPage }));
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Admit Cards</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam
            </label>
            <select
              {...register("examId")}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={loading.exams}
              onChange={(e) => {
                setValue("examId", e.target.value);
                setPagination((prev) => ({ ...prev, currentPage: 1 }));
              }}
            >
              {loading.exams ? (
                <option>Loading exams...</option>
              ) : (
                exams.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <select
              {...register("classId")}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={loading.classes}
              onChange={(e) => {
                setValue("classId", e.target.value);
                setPagination((prev) => ({ ...prev, currentPage: 1 }));
              }}
            >
              {loading.classes ? (
                <option>Loading classes...</option>
              ) : (
                classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => {
                if (formValues.examId && formValues.classId) {
                  fetchStudents();
                }
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <GenerateAdmitCard
        students={students}
        loading={loading.students}
        pagination={pagination}
        // onPageChange={handlePageChange}
      />

      {!loading.students &&
        students.length === 0 &&
        formValues.examId &&
        formValues.classId && (
          <div className="text-center py-8 text-gray-500">
            No students found for the selected exam and class
          </div>
        )}
    </div>
  );
}
