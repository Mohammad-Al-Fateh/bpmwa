/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValue } from "react-hook-form";

export const LoginHandle = async (payload: FieldValue<any>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const result = await res.json();
  if (result.success) {
    (await cookies()).set("token", result.data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    (await cookies()).set("refresh_token", result.data.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }
  return result;
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("token")!.value;
  let docodedData;
  if (token) {
    docodedData = await jwtDecode(token);
    return docodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  try {
    (await cookies()).delete("token");
    (await cookies()).delete("refresh_token");
    localStorage.removeItem("userData");

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Failed to logout" };
  }
};
