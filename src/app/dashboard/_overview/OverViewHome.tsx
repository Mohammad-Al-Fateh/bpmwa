import React from "react";
import DownloadPdfWrapper from "../components/DownloadPdfWraper";
import FirstCardsPart from "./FirstCardsPart";
import AllPathRouts from "./AllPathRouts";

export default async function OverViewHome() {
  return (
    <DownloadPdfWrapper>
      <FirstCardsPart />
      <AllPathRouts />
    </DownloadPdfWrapper>
  );
}
