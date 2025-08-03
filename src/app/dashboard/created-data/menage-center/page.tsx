import React from "react";
import AllMenageCenter from "./AllMenageCenter";

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/manage-center`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch manage center data");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <AllMenageCenter data={result.data} />
    </div>
  );
}
