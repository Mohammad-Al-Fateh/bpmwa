import React from "react";
import AllClass from "./AllClass";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/class`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch classes");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <AllClass data={result.data.classes} />
    </div>
  );
}
