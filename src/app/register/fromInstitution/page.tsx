import React from "react";
import CheckInstitutionsClient from "./CheckInstitutions";

export default async function Page() {
  try {
    const [groupRes, branchRes, classRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/group`, {
        cache: "no-store",
      })
        .then((res) => (res.ok ? res.json() : { data: { groups: [] } }))
        .catch(() => ({ data: { groups: [] } })),

      fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/branch`, {
        cache: "no-store",
      })
        .then((res) => (res.ok ? res.json() : { data: [] }))
        .catch(() => ({ data: [] })),

      fetch(`${process.env.NEXT_PUBLIC_SERVER_V1}/class`, {
        cache: "no-store",
      })
        .then((res) => (res.ok ? res.json() : { data: { classes: [] } }))
        .catch(() => ({ data: { classes: [] } })),
    ]);

    return (
      <div>
        <CheckInstitutionsClient
          branch={branchRes.data}
          classes={classRes.data.classes}
          group={groupRes.data.groups}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}
