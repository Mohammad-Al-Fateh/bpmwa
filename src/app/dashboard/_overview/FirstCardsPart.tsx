/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { BsSkipStartCircle } from "react-icons/bs";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ResultData {
  allResult?: number;
  activeResult?: number;
  AllQuizResult?: number;
  activeQuizResult?: number;
}

interface UserData {
  user?: number;
  inProgressUser?: number;
  allStudent?: number;
  AllmenageMent?: number;
}

interface AcademicData {
  allBranch?: number;
  activeBranch?: number;
  allInstitution?: number;
  activeInstitution?: number;
  allClass?: number;
  activeClass?: number;
  allExam?: number;
  activeExam?: number;
  allGroup?: number;
  activeGroup?: number;
}

const FirstCardsPart = () => {
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [academicData, setAcademicData] = useState<AcademicData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [resultsRes, usersRes, academicRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/dashboard/results`),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/dashboard/users`),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/dashboard/academic`),
        ]);

        const results = await resultsRes.json();
        const users = await usersRes.json();
        const academic = await academicRes.json();

        console.log(results, users, academic);

        // Filter out zero values
        setResultData(filterZeroValues(results.data));
        setUserData(filterZeroValues(users.data));
        setAcademicData(filterZeroValues(academic.data));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to filter out zero values
  const filterZeroValues = (data: any) => {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== 0)
    );
  };

  // Results Chart Data
  const resultsChartData = {
    labels: Object.keys(resultData || {}),
    datasets: [
      {
        label: "Results",
        data: Object.values(resultData || {}),
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Users Chart Data
  const usersChartData = {
    labels: Object.keys(userData || {}),
    datasets: [
      {
        label: "Users",
        data: Object.values(userData || {}),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Academic Chart Data
  const academicChartData = {
    labels: Object.keys(academicData || {}),
    datasets: [
      {
        label: "Academic",
        data: Object.values(academicData || {}),
        backgroundColor: [
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card bg-base-100 shadow-lg animate-pulse">
            <div className="card-body">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex items-center justify-center h-64">
                <BsSkipStartCircle className="animate-spin text-4xl text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3 px-3">
      {/* Results Card */}
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
        <div className="card-body">
          <h2 className="card-title text-primary">Results Overview</h2>
          {resultData && Object.keys(resultData).length > 0 ? (
            <div className="h-64">
              <Pie
                data={resultsChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                    tooltip: {
                      callbacks: {
                        label: (context: any) => {
                          return `${context.label}: ${context.raw}`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No result data available
            </div>
          )}
        </div>
      </div>

      {/* Users Card */}
      <div className="card bg-base-100 w-full col-span-1 lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow">
        <div className="card-body">
          <h2 className="card-title text-secondary">Users Overview</h2>
          {userData && Object.keys(userData).length > 0 ? (
            <div className="h-64 flex justify-center items-center">
              <Bar
                data={usersChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                    tooltip: {
                      callbacks: {
                        label: (context: any) => {
                          return `${context.label}: ${context.raw}`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No user data available
            </div>
          )}
        </div>
      </div>

      {/* Academic Card */}
      <div className="card bg-base-100 w-full shadow-lg col-span-1 md:col-span-2 lg:col-span-3 hover:shadow-xl transition-shadow">
        <div className="card-body">
          <h2 className="card-title text-accent">Academic Overview</h2>
          {academicData && Object.keys(academicData).length > 0 ? (
            <div className="h-auto w-full">
              <Bar
                data={academicChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                    tooltip: {
                      callbacks: {
                        label: (context: any) => {
                          return `${context.label}: ${context.raw}`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No academic data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstCardsPart;
