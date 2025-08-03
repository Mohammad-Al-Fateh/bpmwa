/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaEdit,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

interface Exam {
  _id: string;
  name: string;
}

interface Subject {
  name: string;
  totalNumber: number;
  getNumber: number;
  _id: string;
}

interface Result {
  _id: string;
  subjects: Subject[];
  total: number;
  resultType: string;
  institution: string;
  registerNo: string;
  roll: string;
  center: string;
}

const PAGE_SIZE = 100;

const AllResult = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingResultType, setEditingResultType] = useState<string | null>(
    null
  );
  const [newResultType, setNewResultType] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [institutionFilter, setInstitutionFilter] = useState("");
  const [centerFilter, setCenterFilter] = useState("");
  const [uniqueInstitutions, setUniqueInstitutions] = useState<string[]>([]);
  const [uniqueCenters, setUniqueCenters] = useState<string[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const resultTypeOptions = [
    "fail",
    "pass",
    "rewarded",
    "talentful",
    "general",
    "normal",
  ];

  console.log(page);
  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      setResults([]);
      setPage(1);
      setHasMore(true);
      fetchResults(selectedExam, 1, true);
    }
  }, [selectedExam, sortOrder, institutionFilter, centerFilter]);

  useEffect(() => {
    if (loadingMore || !hasMore) return;

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadingMore, hasMore, results]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loadingMore && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loadingMore, hasMore]
  );

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/all/exam`
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

  const fetchResults = async (
    examId: string,
    pageNum: number,
    initialLoad = false
  ) => {
    try {
      if (initialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = {
        page: pageNum,
        limit: PAGE_SIZE,
        sort: sortOrder,
        institution: institutionFilter,
        center: centerFilter,
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/result/table/${examId}`,
        { params }
      );

      if (response.data.success) {
        if (initialLoad) {
          setResults(response.data.data);
          // Extract unique institutions and centers for filters
          const institutions = [
            ...new Set(response.data.data.map((r: Result) => r.institution)),
          ];
          const centers = [
            ...new Set(response.data.data.map((r: Result) => r.center)),
          ];
          setUniqueInstitutions(institutions as string[]);
          setUniqueCenters(centers as string[]);
        } else {
          setResults((prev) => [...prev, ...response.data.data]);
        }
        setHasMore(response.data.data.length === PAGE_SIZE);
      }
    } catch (error) {
      toast.error("Failed to fetch results");
      console.error(error);
    } finally {
      if (initialLoad) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const toggleExpandResult = (resultId: string) => {
    setExpandedResult(expandedResult === resultId ? null : resultId);
  };

  const handleDeleteResult = async (resultId: string) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/result/soft/${resultId}`
        );
        toast.success("Result deleted successfully");
        setResults((prev) => prev.filter((result) => result._id !== resultId));
      } catch (error) {
        toast.error("Failed to delete result");
        console.error(error);
      }
    }
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setPage(1);
    setHasMore(true);
  };

  const startEditingResultType = (resultId: string, currentType: string) => {
    setEditingResultType(resultId);
    setNewResultType(currentType);
  };

  const cancelEditing = () => {
    setEditingResultType(null);
    setNewResultType("");
  };

  const updateResultType = async (resultId: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/result/${resultId}`,
        {
          resultType: newResultType,
        }
      );
      toast.success("Result type updated successfully");
      setResults((prev) =>
        prev.map((result) =>
          result._id === resultId
            ? { ...result, resultType: newResultType }
            : result
        )
      );
      setEditingResultType(null);
    } catch (error) {
      toast.error("Failed to update result type");
      console.error(error);
    }
  };

  const clearFilters = () => {
    setInstitutionFilter("");
    setCenterFilter("");
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Results</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Exam
          </label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">Select an exam</option>
            {exams.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedExam && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Results</h2>
            <div className="flex gap-2">
              <button
                onClick={toggleSortOrder}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center gap-2"
                disabled={loading}
              >
                {sortOrder === "asc" ? (
                  <FaSortAmountDown />
                ) : (
                  <FaSortAmountUp />
                )}
                Sort by Total
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-blue-100 rounded-md hover:bg-blue-200 flex items-center gap-2 text-blue-700"
              >
                <FaFilter /> Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution
                  </label>
                  <select
                    value={institutionFilter}
                    onChange={(e) => setInstitutionFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Institutions</option>
                    {uniqueInstitutions.map((inst) => (
                      <option key={inst} value={inst}>
                        {inst}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Center
                  </label>
                  <select
                    value={centerFilter}
                    onChange={(e) => setCenterFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Centers</option>
                    {uniqueCenters.map((center) => (
                      <option key={center} value={center}>
                        {center}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {(institutionFilter || centerFilter) && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                  >
                    <FaTimes /> Clear filters
                  </button>
                </div>
              )}
            </div>
          )}

          {loading && results.length === 0 ? (
            <div className="text-center py-8">Loading initial results...</div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              No results found for this exam
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Register No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Center
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Result Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result) => (
                    <React.Fragment key={result._id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {result.roll}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.registerNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.institution}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.center}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {result.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editingResultType === result._id ? (
                            <div className="flex items-center gap-2">
                              <select
                                value={newResultType}
                                onChange={(e) =>
                                  setNewResultType(e.target.value)
                                }
                                className="p-1 border border-gray-300 rounded-md text-sm"
                              >
                                {resultTypeOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => updateResultType(result._id)}
                                className="text-green-600 hover:text-green-800"
                                title="Save"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="text-red-600 hover:text-red-800"
                                title="Cancel"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="capitalize">
                                {result.resultType}
                              </span>
                              <button
                                onClick={() =>
                                  startEditingResultType(
                                    result._id,
                                    result.resultType
                                  )
                                }
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit result type"
                              >
                                <FaEdit size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className=" items-center hidden gap-3">
                            <button
                              onClick={() => toggleExpandResult(result._id)}
                              className="text-blue-600 hover:text-blue-800"
                              title={
                                expandedResult === result._id
                                  ? "Collapse"
                                  : "Expand"
                              }
                            >
                              {expandedResult === result._id ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteResult(result._id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedResult === result._id && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                              <h3 className="font-medium mb-2">
                                Subject Details
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {result.subjects.map((subject) => (
                                  <div
                                    key={subject._id}
                                    className="bg-white p-3 rounded-md shadow-sm border border-gray-200"
                                  >
                                    <h4 className="font-medium text-sm">
                                      {subject.name}
                                    </h4>
                                    <div className="flex justify-between mt-1 text-sm">
                                      <span>Obtained: {subject.getNumber}</span>
                                      <span>Total: {subject.totalNumber}</span>
                                    </div>
                                    <div className="mt-1">
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                          className="bg-blue-600 h-2 rounded-full"
                                          style={{
                                            width: `${
                                              (subject.getNumber /
                                                subject.totalNumber) *
                                              100
                                            }%`,
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <div ref={loadingRef} className="py-4 text-center">
                {loadingMore && (
                  <div className="text-gray-500">Loading more results...</div>
                )}
                {!hasMore && results.length > 0 && (
                  <div className="text-gray-500">No more results to load</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllResult;
