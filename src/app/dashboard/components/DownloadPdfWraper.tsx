"use client";
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { toast } from "react-hot-toast";
import { FaFilePdf, FaFileImage } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

export default function DownloadPdfWrapper({
  children,
  filename = "document",
}: {
  children: React.ReactNode;
  filename?: string;
}) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const downloadAsPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      if (targetRef.current) {
        const doc = new jsPDF();
        const dataUrl = await toPng(targetRef.current, { cacheBust: true });
        const imgProps = doc.getImageProperties(dataUrl);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        doc.save("notice.pdf");
      }
    } catch (err) {
      console.log(err);
      toast.error("Try Again!! Download faield!");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsGeneratingImage(true);
      if (targetRef.current) {
        const dataUrl = await toPng(targetRef.current, { cacheBust: true });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${filename}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Download buttons with loading indicators */}
      <div className="absolute top-0 right-0 z-10 px-3 py-1 flex gap-4">
        {/* PDF Download Button */}
        <div className="group relative md:block hidden cursor-pointer">
          <button
            onClick={downloadAsPDF}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download as PDF"
          >
            {isGeneratingPdf ? (
              <ImSpinner9 className="animate-spin text-xl" />
            ) : (
              <FaFilePdf className="text-xl" />
            )}
          </button>
          <span className="absolute z-[9999] bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Download as PDF
          </span>
        </div>

        {/* Image Download Button */}
        <div className="group relative md:block hidden cursor-pointer">
          <button
            onClick={handleDownloadImage}
            disabled={isGeneratingImage}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Download as Image"
          >
            {isGeneratingImage ? (
              <ImSpinner9 className="animate-spin text-xl" />
            ) : (
              <FaFileImage className="text-xl" />
            )}
          </button>
          <span className="absolute z-[9999] bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Download as Image
          </span>
        </div>
      </div>

      {/* Hidden content for PDF/Image generation with forced safe colors */}
      <div
        ref={targetRef}
        className="w-full pt-12"
        style={{
          backgroundColor: "#F3F4F6",
          color: "#000000",
        }}
      >
        <div
          style={{
            all: "unset",
            color: "#000000",
          }}
        >
          {children}
        </div>
      </div>

      {/* Visible content for the user */}
      {/* <div className="w-full pt-12">{children}</div> */}
    </div>
  );
}
