/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Bell, ChevronDown, X } from "lucide-react";
import useAxiousSource from "@/app/_default/_custom-component/useAxiousSource";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  registerNo?: string;
  image?: string;
  role: string;
  type?: string;
}

export default function DashboardHeader() {
  const { axiosSource } = useAxiousSource();
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  // Search function
  const performSearch = useCallback(
    async (query: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axiosSource.get(
          `/dashboard/search?search=${query}`
        );
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [axiosSource]
  );

  // Debounced search handler
  const handleSearch = useCallback(
    (query: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        performSearch(query);
      }, 500);
    },
    [performSearch]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-100 mb-2 border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left section - Logo/Branding */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {user?.name || "BPMA"}
          </h1>
        </div>

        {/* Right section - Controls */}
        <div className="flex items-center space-x-4">
          {/* Search bar - Mobile */}
          <button
            className="md:hidden rounded-full p-2 text-gray-500 hover:bg-gray-100"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Search bar - Desktop */}
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-64 rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search students, teachers..."
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}

            {/* Search results dropdown */}
            {searchQuery.length >= 2 && (
              <div className="absolute left-0 mt-1 w-full rounded-md bg-white shadow-lg z-50 max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-3 text-center text-gray-500">
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Link
                      key={result._id}
                      href={`/dashboard/user/user/${result._id}`}
                      className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100"
                      onClick={clearSearch}
                    >
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                        {result.image && (
                          <Image
                            width={32}
                            height={32}
                            src={result.image}
                            alt={result.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {result.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {result.email} • {result.role}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile search overlay */}
          {isSearchOpen && (
            <div className="fixed inset-0 bg-white z-50 p-4 md:hidden">
              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="block w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Search students, teachers..."
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Mobile search results */}
              {searchQuery.length >= 2 && (
                <div className="bg-white rounded-md shadow-sm">
                  {isLoading ? (
                    <div className="p-3 text-center text-gray-500">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <Link
                        key={result._id}
                        href={`/dashboard/user/user/${result._id}`}
                        className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100"
                        onClick={() => {
                          clearSearch();
                          setIsSearchOpen(false);
                        }}
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                          {result.image && (
                            <Image
                              width={40}
                              height={40}
                              src={result.image}
                              alt={result.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {result.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {result.email} • {result.role}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Notifications */}
          <button className="relative hidden rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User profile */}
          {user && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 overflow-hidden">
                {user?.image && (
                  <Image
                    width={32}
                    height={32}
                    src={user?.image}
                    alt={user?.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="hidden items-center ">
                <span className="text-sm font-medium text-gray-700">
                  {user.user?.name || "User"}
                </span>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
