import React from "react";
import AllExam from "./AllExam";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/exam`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch exams");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <AllExam data={result.data.exams} />
    </div>
  );
}
