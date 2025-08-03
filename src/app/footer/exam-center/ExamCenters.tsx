"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, ChevronDown, ChevronUp, Building, MapPin } from "lucide-react";

interface Institution {
  _id: string;
  id: string;
  name: string;
  address: string;
  createdAt: string;
}

interface ManageCenter {
  _id: string;
  center: string;
  institutions: Institution[];
  createdAt: string;
}

export default function ExamCenters() {
  const [centers, setCenters] = useState<ManageCenter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedCenter, setExpandedCenter] = useState<string | null>(null);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/manage-center`,
          {
            params: {
              search: searchTerm,
            },
          }
        );

        if (response.data.success) {
          setCenters(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching exam centers:", error);
      } finally {
        setLoading(false);
      }
    };

    // Add a small debounce to prevent rapid API calls
    const timer = setTimeout(() => {
      fetchCenters();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const toggleCenter = (centerId: string) => {
    if (expandedCenter === centerId) {
      setExpandedCenter(null);
    } else {
      setExpandedCenter(centerId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-800 mb-6">Exam Centers</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by center name..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        )}

        {/* Centers List */}
        {!loading && (
          <div className="space-y-4">
            {centers.length > 0 ? (
              centers.map((center) => (
                <div
                  key={center._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div
                    className="px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-teal-50"
                    onClick={() => toggleCenter(center._id)}
                  >
                    <div>
                      <h3 className="text-lg font-medium text-teal-700">
                        {center.center}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {center.institutions.length} institutions
                      </p>
                    </div>
                    {expandedCenter === center._id ? (
                      <ChevronUp className="h-5 w-5 text-teal-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-teal-600" />
                    )}
                  </div>

                  {expandedCenter === center._id && (
                    <div className="border-t border-gray-200 px-6 py-4">
                      <h4 className="text-md font-medium text-gray-700 mb-3">
                        Associated Institutions
                      </h4>
                      <div className="space-y-3">
                        {center.institutions.map((institution) => (
                          <div
                            key={institution._id}
                            className="bg-gray-50 rounded p-3"
                          >
                            <div className="flex items-start">
                              <Building className="h-5 w-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-gray-800">
                                  {institution.name}
                                </p>
                                <div className="flex items-start mt-1">
                                  <MapPin className="h-4 w-4 text-teal-600 mr-1 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-gray-600">
                                    {institution.address}
                                  </p>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                  ID: {institution.id} • Joined{" "}
                                  {formatDate(institution.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500">
                  No exam centers found
                  {searchTerm ? ` for "${searchTerm}"` : ""}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
