/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Exam {
  _id: string;
  name: string;
}

interface Institution {
  _id: string;
  name: string;
  branch: {
    name: string;
  };
}

interface Subject {
  name: string;
  totalNumber: number;
  getNumber: number;
}

interface Result {
  _id: string;
  resultType: string;
  total: number;
  subjects: Subject[];
  exam: {
    _id: string;
    name: string;
    examType: string;
  };
  student: {
    _id: string;
    registerNo: string;
    roll: string;
    institution: {
      name: string;
    };
  };
}

const AllResults = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filters, setFilters] = useState({
    type: "pass",
    examId: "",
    institutionId: "",
    searchTerm: "",
    page: 1,
    limit: 50,
  });
  const [totalResults, setTotalResults] = useState(0);
  const [institutionSearch, setInstitutionSearch] = useState("");
  console.log(totalResults);

  // Fetch exams on component mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/all/exam`
        );
        setExams(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExams();
  }, []);

  // Fetch institutions when search term changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (institutionSearch.trim()) {
        fetchInstitutions(institutionSearch);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [institutionSearch]);

  const fetchInstitutions = async (search: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/institution?search=${search}`
      );
      setInstitutions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch results when filters change
  useEffect(() => {
    fetchResults();
  }, [
    filters.type,
    filters.examId,
    filters.institutionId,
    filters.page,
    filters.searchTerm,
  ]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/result/type/${filters.type}`,
        {
          params: {
            page: filters.page,
            limit: filters.limit,
            examId: filters.examId,
            institutionId: filters.institutionId,
            searchTerm: filters.searchTerm,
          },
        }
      );

      setResults(response.data.data);
      setTotalResults(response.data.meta?.total || response.data.data.length);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: "pass",
      examId: "",
      institutionId: "",
      searchTerm: "",
      page: 1,
      limit: 10,
    });
    setInstitutionSearch("");
  };

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case "pass":
        return "badge-success";
      case "fail":
        return "badge-error";
      case "rewarded":
        return "badge-warning";
      case "talentful":
        return "badge-primary";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="p-6">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-6">
            <h2 className="card-title text-2xl">Results Management</h2>
            <button onClick={resetFilters} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="form-control">
              <select
                className="select select-bordered w-full"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
                <option value="rewarded">Rewarded</option>
                <option value="talentful">Talentful</option>
                <option value="general">General</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div className="form-control">
              <select
                className="select select-bordered w-full"
                value={filters.examId}
                onChange={(e) => handleFilterChange("examId", e.target.value)}
              >
                <option value="">All Exams</option>
                {exams.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <div className="dropdown w-full">
                <input
                  type="text"
                  placeholder="Search institution..."
                  className="input input-bordered w-full"
                  value={institutionSearch}
                  onChange={(e) => setInstitutionSearch(e.target.value)}
                />
                {institutions.length > 0 && (
                  <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full mt-1">
                    {institutions.map((inst) => (
                      <li key={inst._id}>
                        <a
                          onClick={() => {
                            handleFilterChange("institutionId", inst._id);
                            setInstitutionSearch(inst.name);
                          }}
                        >
                          {inst.name} ({inst.branch.name})
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="form-control">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by register/roll no"
                  className="input input-bordered w-full pl-10"
                  value={filters.searchTerm}
                  onChange={(e) =>
                    handleFilterChange("searchTerm", e.target.value)
                  }
                />
                <span className="absolute left-3 top-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {loading ? (
            <div className="flex justify-center my-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Institution</th>
                    <th>Exam</th>
                    {/* <th>Subjects</th> */}
                    <th className="text-center">Total</th>
                    <th>Result Type</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result._id}>
                      <td>
                        <div className="font-bold">
                          {result.student.registerNo}
                        </div>
                        <div className="text-sm opacity-50">
                          Roll: {result.student.roll}
                        </div>
                      </td>
                      <td>{result.student.institution.name}</td>
                      <td>
                        <div className="font-bold">{result.exam.name}</div>
                        <div className="text-sm opacity-50">
                          {result.exam.examType}
                        </div>
                      </td>
                      {/* <td>
                        <div className="max-w-xs">
                          {result.subjects.map((subject) => (
                            <div key={subject.name} className="mb-1">
                              <span>{subject.name}: </span>
                              <span className="font-bold">
                                {subject.getNumber}/{subject.totalNumber}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td> */}
                      <td className="text-center font-bold">{result.total}</td>
                      <td>
                        <span
                          className={`badge ${getResultTypeColor(
                            result.resultType
                          )}`}
                        >
                          {result.resultType.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center mt-6">
                <div className="join">
                  <button
                    className="join-item btn"
                    disabled={filters.page === 1}
                    onClick={() => handleFilterChange("page", filters.page - 1)}
                  >
                    «
                  </button>
                  <button className="join-item btn">Page {filters.page}</button>
                  <button
                    className="join-item btn"
                    disabled={results.length < filters.limit}
                    onClick={() => handleFilterChange("page", filters.page + 1)}
                  >
                    »
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllResults;
