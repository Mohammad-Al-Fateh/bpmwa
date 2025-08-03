import React from "react";
import CreateMenagement from "./CreateMenagement";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/branch`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch branch data");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <CreateMenagement branch={result.data} />
    </div>
  );
}
