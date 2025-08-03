import React from "react";
import AllInstitution from "./AllInstitution";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/institution`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch institutions");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <AllInstitution data={result.data} />
    </div>
  );
}
