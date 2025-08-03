import React from "react";
import CreateMenageCenter from "./CreateMenageCenter";

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/institution/filter`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <div className="overflow-auto">
      <CreateMenageCenter institutions={data.data} />
    </div>
  );
}
