import React from "react";
import AllUser from "./AllUser";
import DownloadPdfWrapper from "../../components/DownloadPdfWraper";

export default function page() {
  return (
    <div className="overflow-auto">
      <DownloadPdfWrapper filename="user-data">
        <AllUser />
      </DownloadPdfWrapper>
    </div>
  );
}
