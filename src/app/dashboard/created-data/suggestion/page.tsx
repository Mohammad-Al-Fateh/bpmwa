import React from "react";
import AllSuggestion from "./AllSuggestion";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/suggestion`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch suggestions");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <AllSuggestion data={result.data.data} />
    </div>
  );
}
