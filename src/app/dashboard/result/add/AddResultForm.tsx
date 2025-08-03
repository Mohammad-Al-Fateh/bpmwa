"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Exam {
  _id: string;
  name: string;
  subjects: string[];
}

interface Student {
  _id: string;
  registerNo: string;
  roll: string;
  studentClass?: {
    _id: string;
    name: string;
  };
}

interface Class {
  _id: string;
  name: string;
}

export default function AddResultForm() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedExamSubjects, setSelectedExamSubjects] = useState<string[]>(
    []
  );
  const [studentTotals, setStudentTotals] = useState<Record<string, number>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchExams();
    fetchClasses();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/select/exam`
      );
      if (response.data.success) {
        setExams(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch exams");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/class`
      );
      if (response.data.success) {
        setClasses(response.data.data.classes);
      }
    } catch (error) {
      toast.error("Failed to fetch classes");
      console.error(error);
    }
  };

  const fetchStudents = async (examId: string, classId?: string) => {
    try {
      setLoading(true);
      const url = `${
        process.env.NEXT_PUBLIC_SERVER_V1
      }/student/result/filter?examId=${examId}${
        classId ? `&classId=${classId}` : ""
      }`;
      const response = await axios.get(url);

      if (response.data.success) {
        setStudents(response.data.data);
        // Initialize student totals
        const initialTotals: Record<string, number> = {};
        response.data.data.forEach((student: Student) => {
          initialTotals[student._id] = 0;
        });
        setStudentTotals(initialTotals);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExamChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const examId = e.target.value;
    setSelectedExam(examId);
    setSelectedClass(""); // Reset class filter when exam changes
    await fetchStudents(examId);

    const selectedExam = exams.find((exam) => exam._id === examId);
    if (selectedExam) {
      setSelectedExamSubjects(selectedExam.subjects);
    }
  };

  const handleClassChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    if (selectedExam) {
      await fetchStudents(selectedExam, classId);
    }
  };

  const handleTotalChange = (studentId: string, value: string) => {
    const numericValue = parseInt(value) || 0;
    setStudentTotals((prev) => ({
      ...prev,
      [studentId]: numericValue,
    }));
  };

  const determineResultType = (total: number, subjectCount: number): string => {
    const percentage = (total / (subjectCount * 100)) * 100;
    return percentage < 33 ? "fail" : "pass";
  };

  const handleSubmit = async () => {
    if (!selectedExam) {
      toast.error("Please select an exam");
      return;
    }

    const addedBy = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
    if (!addedBy) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting results...");

    try {
      let submittedCount = 0;
      let skippedCount = 0;

      for (const student of students) {
        const total = studentTotals[student._id];

        // Skip if total is 0 or not provided
        if (!total || total <= 0) {
          skippedCount++;
          continue;
        }

        // Create subjects array with 0 marks for all subjects
        const subjects = selectedExamSubjects.map((subject) => ({
          name: subject,
          totalNumber: 100,
          getNumber: 0,
        }));

        const resultData = {
          exam: selectedExam,
          student: student._id,
          addedBy,
          subjects,
          total,
          resultType: determineResultType(total, subjects.length),
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/result`,
          resultData
        );
        submittedCount++;
      }

      if (submittedCount === 0) {
        toast.error(
          "No results submitted - please add total marks for at least one student",
          { id: toastId }
        );
      } else {
        toast.success(
          `Results submitted successfully! ${submittedCount} students processed, ${skippedCount} skipped`,
          { id: toastId }
        );
        // Reset form after successful submission
        setSelectedExam("");
        setSelectedClass("");
        setSelectedExamSubjects([]);
        setStudentTotals({});
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit some results", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add Results</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Exam
            </label>
            <select
              value={selectedExam}
              onChange={handleExamChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Select an exam</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Class (optional)
            </label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting || !selectedExam}
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedExam && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Student Results</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Register No.
                  </th>
                  <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Marks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.roll}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.registerNo}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.studentClass?.name || "-"}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={studentTotals[student._id] || ""}
                        onChange={(e) =>
                          handleTotalChange(student._id, e.target.value)
                        }
                        className="w-20 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedExam}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Results"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
