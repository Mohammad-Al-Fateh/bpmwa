"use client";
import React from "react";
import { User, School, Bookmark, BookOpen, Calendar } from "lucide-react";
import ExamResultDownloadCard from "./ExamResultDownloadCard";

interface Subject {
  name: string;
  totalNumber: number;
  getNumber: number;
}

interface ResultData {
  exam: {
    name: string;
    date: string;
  };
  student: {
    registerNo: string;
    roll: string;
    center?: string;
  };
  subjects: Subject[];
  resultType: string;
  total: number;
}

interface ExamResultDisplayProps {
  resultData: ResultData;
  filename: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ExamResultDisplay({
  resultData,
  filename,
}: ExamResultDisplayProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate__animated animate__fadeInUp">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Exam Result</h2>
        <ExamResultDownloadCard resultData={resultData} filename={filename} />
      </div>

      <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-emerald-50 to-teal-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-blue-800">
              {resultData.exam.name}
            </h3>
            <p className="text-gray-700">
              <Calendar className="inline w-4 h-4 mr-1" />
              Exam Date: {formatDate(resultData.exam.date)}
            </p>
          </div>
          <div className="bg-blue-100 px-3 py-1 rounded-full">
            <span className="text-blue-800 font-medium capitalize">
              {resultData.resultType}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Student Info
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Reg No:</span>{" "}
                {resultData.student.registerNo}
              </li>
              <li>
                <span className="font-medium">Roll No:</span>{" "}
                {resultData.student.roll}
              </li>
              <li>
                <span className="font-medium">Center:</span>{" "}
                {resultData.student.center || "N/A"}
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <School className="w-5 h-5 mr-2 text-green-600" />
              Institution
            </h4>
            <p className="text-gray-700">[Institution Name]</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <Bookmark className="w-5 h-5 mr-2 text-purple-600" />
              Summary
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Total Marks:</span>{" "}
                {resultData.total}
              </li>
              <li>
                <span className="font-medium">Subjects:</span>{" "}
                {resultData.subjects.length}
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
            Subject Details
          </h4>
          <div className="overflow-x-auto ">
            {/* hidden table  */}
            <table className="min-w-full divide-y hidden divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Obtained
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resultData.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                      {subject.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                      {subject.totalNumber}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                      {subject.getNumber}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800">
                      {(
                        (subject.getNumber / subject.totalNumber) *
                        100
                      ).toFixed(2)}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            This result was generated on {formatDate(new Date().toISOString())}
          </p>
        </div>
      </div>
    </div>
  );
}
