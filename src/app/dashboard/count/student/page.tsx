import React from "react";
import DownloadPdfWrapper from "../../components/DownloadPdfWraper";
import CountStudent from "./CountStudnet";

export default function page() {
  return (
    <div className="overflow-auto">
      <DownloadPdfWrapper>
        <CountStudent />
      </DownloadPdfWrapper>
    </div>
  );
}
