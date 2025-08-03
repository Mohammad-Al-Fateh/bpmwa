import React from "react";
import AllGroup from "./AllGroup";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/group`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch groups");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <AllGroup data={result.data.groups} />
    </div>
  );
}
