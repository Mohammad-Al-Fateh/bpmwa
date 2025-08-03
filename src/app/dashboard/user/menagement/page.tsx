import React from "react";
import AllManagement from "./AllManagement";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/management`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch management data");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <AllManagement data={result.data} />
    </div>
  );
}
