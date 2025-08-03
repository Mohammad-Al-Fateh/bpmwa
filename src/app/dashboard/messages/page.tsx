import React from "react";
import Messages from "./Messages";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/contact`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  const result = await res.json();

  return (
    <div className="overflow-auto">
      <Messages data={result.data} />
    </div>
  );
}
