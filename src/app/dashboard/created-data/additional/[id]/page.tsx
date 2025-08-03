import React from "react";
import EditInfoData from "./EditInfoData";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/info`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <EditInfoData data={result.data} />
    </div>
  );
}
