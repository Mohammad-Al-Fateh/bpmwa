import React from "react";
import AllResults from "./AllResults";
import DownloadPdfWrapper from "../../components/DownloadPdfWraper";

export default function page() {
  return (
    <div className="overflow-auto">
      <DownloadPdfWrapper>
        <AllResults />
      </DownloadPdfWrapper>
    </div>
  );
}
