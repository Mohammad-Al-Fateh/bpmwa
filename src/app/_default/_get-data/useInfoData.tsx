"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface ImportantLink {
  name: string;
  link: string;
  _id: string;
}

interface InfoData {
  address: string;
  house: string;
  number: string;
  whatsApp: string;
  telegram: string;
  bikash: string;
  email: string;
  nagad: string;
  upay: string;
  rocket: string;
  facebook: string;
  youtube: string;
  instagram: string;
  linkedIn: string;
  footerText: string;
  marqueeText: string;
  importantLink: ImportantLink[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: InfoData;
}

export default function useInfoData() {
  const [data, setData] = useState<InfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/info`
        );
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
