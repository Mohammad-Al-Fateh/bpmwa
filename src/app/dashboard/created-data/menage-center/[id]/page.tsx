import React from "react";
import EditMEnageCenter from "./EditMEnageCenter";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/institution`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="overflow-auto">
      <EditMEnageCenter institutions={data.data} />
    </div>
  );
}
