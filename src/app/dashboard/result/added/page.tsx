import React from "react";
import AllResult from "./AllResult";
import DownloadPdfWrapper from "../../components/DownloadPdfWraper";

export default function page() {
  return (
    <div className="overflow-auto">
      <DownloadPdfWrapper filename="Results">
        <AllResult />
      </DownloadPdfWrapper>
    </div>
  );
}
