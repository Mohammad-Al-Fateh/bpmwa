/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function useUserData() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    setUser(JSON.parse(storedUser as any));
  }, []);

  return { user };
}
