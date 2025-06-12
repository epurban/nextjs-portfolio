"use client";

import { motion } from "framer-motion";
import { Document, pdfjs, Page as PDFPage } from "react-pdf";
import { cn } from "@/lib/utils";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useViewportMode, ViewportMode } from "@/hooks/useViewportMode";
import { useMemo } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const LoadingSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin")}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export const Resume = () => {
  const viewport = useViewportMode();

  const pdfSize: number = useMemo(() => {
    if (viewport === ViewportMode.Mobile) {
      return 400;
    } else if (viewport === ViewportMode.Tablet) {
      return 600;
    } else {
      return 800;
    }
  }, [viewport]);

  return (
    <motion.section
      style={{ position: "relative", cursor: `url('download.png'), pointer` }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="mt-10 rounded-md overflow-hidden flex justify-center items-center w-fit mx-auto"
      onClick={() => {
        const link = document.createElement("a");
        link.href = "/ed-urban-resume.pdf";
        link.download = "ed-urban-resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    >
      <Document file="/ed-urban-resume.pdf" loading={<LoadingSpinner />}>
        <PDFPage pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} width={pdfSize} height={pdfSize} />
      </Document>
    </motion.section>
  );
};
