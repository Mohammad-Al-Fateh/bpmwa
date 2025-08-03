import React from "react";
import AllBranch from "./AllBranch";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/branch`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch branches");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <AllBranch data={result.data} />
    </div>
  );
}
