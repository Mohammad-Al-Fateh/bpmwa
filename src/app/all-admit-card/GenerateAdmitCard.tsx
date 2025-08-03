/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import { Loader2, Download } from "lucide-react";
import Image from "next/image";

interface GenerateAdmitCardProps {
  students: Array<{
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
  }>;
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalStudents: number;
    studentsPerPage: number;
  };
}

const GenerateAdmitCard: React.FC<GenerateAdmitCardProps> = ({
  students,
  loading,
  pagination,
}: any) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const admitCardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const downloadAllAsPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [850, 500],
      });

      // Generate each student's admit card as an image and add to PDF
      for (const student of students) {
        const ref = admitCardRefs.current[student.registerNo];
        if (ref) {
          const dataUrl = await toPng(ref, {
            cacheBust: true,
            pixelRatio: 2,
            width: 850,
            height: 500,
          });

          doc.addImage(dataUrl, "PNG", 0, 0, 850, 500);
          if (students.indexOf(student) < students.length - 1) {
            doc.addPage([850, 500], "landscape");
          }
        }
      }

      doc.save("admit-cards.pdf");
      toast.success("All admit cards downloaded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate PDF. Please try again!");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const downloadSingleAsPDF = async (registerNo: string) => {
    try {
      setIsGeneratingPdf(true);
      const ref = admitCardRefs.current[registerNo];
      if (ref) {
        const dataUrl = await toPng(ref, {
          cacheBust: true,
          pixelRatio: 2,
          width: 850,
          height: 500,
        });

        const doc = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [850, 500],
        });
        doc.addImage(dataUrl, "PNG", 0, 0, 850, 500);
        doc.save(`admit-card-${registerNo}.pdf`);
        toast.success("Admit card downloaded successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to generate PDF. Please try again!");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Proper ref callback function that doesn't return anything
  const setAdmitCardRef =
    (registerNo: string) => (el: HTMLDivElement | null) => {
      admitCardRefs.current[registerNo] = el;
    };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {loading ? (
        <div className="p-8 text-center">Loading students...</div>
      ) : (
        <>
          <div className="flex justify-end p-4">
            <button
              onClick={downloadAllAsPDF}
              disabled={isGeneratingPdf || students.length === 0}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download All as PDF
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Register No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Center
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student: any, index: number) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.registerNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                        <p className="text-xs text-gray-500">
                          {student.fatherName} & {student.motherName}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.className}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.roll}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.center}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            downloadSingleAsPDF(student.registerNo)
                          }
                          disabled={isGeneratingPdf}
                          className="text-green-600 hover:text-green-900"
                        >
                          Download
                        </button>
                      </td>
                    </tr>

                    {/* Hidden Admit Card Design for PDF Generation */}
                    <div className="fixed -left-[9999px]">
                      <div
                        ref={setAdmitCardRef(student.registerNo)}
                        className="relative w-[850px] h-[500px] bg-gradient-to-r from-emerald-50 to-teal-100 border border-gray-200 rounded-lg overflow-hidden p-6"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Image
                              src="/logo.jpg"
                              alt="Institution Logo"
                              width={80}
                              height={80}
                              className="rounded-full border-2 border-white"
                            />
                            <div className="ml-4">
                              <h1 className="text-2xl font-bold text-green-800">
                                বাংলাদেশ প্রাইভেট মাদ্রাসা ওয়েলফেয়ার এসোসিয়েশন
                              </h1>
                              <p className="text-sm text-gray-700">
                                An educational community dedicated to excellence
                                in private madrasa education
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Admit Card</p>
                            <p className="text-lg font-bold text-blue-800">
                              {student.examName}
                            </p>
                          </div>
                        </div>

                        <div className="border-t-2 border-b-2 border-gray-300 py-2 my-4">
                          <h2 className="text-xl font-bold text-center text-blue-800">
                            {student.center}
                          </h2>
                        </div>

                        {/* Student Information */}
                        <div className="flex justify-between mt-6">
                          <div className="w-2/3 pr-6">
                            <table className="w-full">
                              <tbody>
                                <tr>
                                  <td className="py-1 text-gray-800 font-medium">
                                    Name:
                                  </td>
                                  <td className="py-1 text-gray-800">
                                    {student.name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-gray-800 font-medium">
                                    Father`s Name:
                                  </td>
                                  <td className="py-1 text-gray-800">
                                    {student.fatherName}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-gray-800 font-medium">
                                    Mother`s Name:
                                  </td>
                                  <td className="py-1 text-gray-800">
                                    {student.motherName}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-gray-800 font-medium">
                                    Class:
                                  </td>
                                  <td className="py-1 text-gray-800">
                                    {student.className}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-gray-800 font-medium">
                                    Roll No:
                                  </td>
                                  <td className="py-1 text-gray-800">
                                    {student.roll}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-gray-800 font-medium">
                                    Register No:
                                  </td>
                                  <td className="py-1 text-gray-800">
                                    {student.registerNo}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-1 text-gray-800 font-medium">
                                    Gender:
                                  </td>
                                  <td className="py-1 text-gray-800">
                                    {student.gender}
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            {/* Exam Information */}
                            <div className="mt-6">
                              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">
                                Exam Information
                              </h3>
                              <table className="w-full">
                                <tbody>
                                  <tr>
                                    <td className="py-1 text-gray-800 font-medium">
                                      Exam Date:
                                    </td>
                                    <td className="py-1 text-gray-800">
                                      {formatDate(student.examDate)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-1 text-gray-800 font-medium">
                                      Center:
                                    </td>
                                    <td className="py-1 text-gray-800">
                                      {student.center}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Student Photo Placeholder */}
                          <div className="w-1/3 flex flex-col items-center">
                            <div className="h-48"></div>
                            <div className="text-center">
                              <div className="h-20 border-t-2 border-b-2 border-gray-300 flex items-center justify-center my-4">
                                <p className="text-sm text-gray-600">
                                  Authorized Signature
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-600">
                          <p className="text-sm">
                            This admit card must be presented at the exam center
                            along with valid ID proof
                          </p>
                          <p className="mt-1">
                            © {new Date().getFullYear()} Bangladesh Private
                            Madrasa Welfare Association
                          </p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(pagination.currentPage - 1) *
                        pagination.studentsPerPage +
                        1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        pagination.currentPage * pagination.studentsPerPage,
                        pagination.totalStudents
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {pagination.totalStudents}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => window.location.reload()}
                      disabled={pagination.currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => window.location.reload()}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === pagination.currentPage
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => window.location.reload()}
                      disabled={
                        pagination.currentPage === pagination.totalPages
                      }
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GenerateAdmitCard;
