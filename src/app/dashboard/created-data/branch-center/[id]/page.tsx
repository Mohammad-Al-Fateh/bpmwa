import React from "react";
import EditBranchForm from "./EditBranchForm";

export default async function page() {
  return (
    <div className="overflow-auto">
      <EditBranchForm />
    </div>
  );
}
