"use client";

import { motion } from "framer-motion";
import { Document, pdfjs, Page as PDFPage } from "react-pdf";
import { cn } from "@/lib/utils";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useViewportMode, ViewportMode } from "@/hooks/useViewportMode";
import { useMemo, useRef, useState, useEffect } from "react";
import useMouse from "@react-hook/mouse-position";
import { useHydrated } from "@/hooks/useHydrated";

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
  const hydrated = useHydrated();
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isPDFLoading, setIsPDFLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(800);
  const ref = useRef(null);
  const lastMouseXPosition = useRef(0);
  const lastMouseYPosition = useRef(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);

    lastMouseXPosition.current = window.innerWidth / 2;
    lastMouseYPosition.current = window.innerHeight / 2;

    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100,
    fps: 60,
  });

  if (mouse.clientX !== null) {
    lastMouseXPosition.current = mouse.clientX;
  }

  if (mouse.clientY !== null) {
    lastMouseYPosition.current = mouse.clientY;
  }

  const variants = {
    default: {
      opacity: 0,
      height: 10,
      width: 10,
      x: lastMouseXPosition.current,
      y: lastMouseYPosition.current,
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    pdf: {
      opacity: 1,
      backgroundColor: "#3c78d8",
      height: 64,
      width: 64,
      fontSize: "32px",
      x: lastMouseXPosition.current - 32,
      y: lastMouseYPosition.current - 64,
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  const pdfSize: number = useMemo(() => {
    const maxSize = Math.min(800, windowWidth - 32); // 32px for padding/margins

    if (viewport === ViewportMode.Mobile) {
      return Math.min(400, maxSize);
    } else if (viewport === ViewportMode.Tablet) {
      return Math.min(600, maxSize);
    } else {
      return maxSize;
    }
  }, [viewport, windowWidth]);

  const resumeEnter = () => {
    if (viewport === ViewportMode.Mobile) {
      return;
    }
    setCursorText("💾");
    setCursorVariant("pdf");
  };
  const resumeLeave = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  const onLoadSuccess = () => {
    setIsPDFLoading(false);
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/ed-urban-resume.pdf";
    link.download = "ed-urban-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row sm:items-start sm:justify-start gap-8" ref={ref}>
      <motion.div variants={variants} className="absolute rounded-full pointer-events-none" animate={cursorVariant} transition={spring}>
        {cursorText}
      </motion.div>
      <motion.section
        whileHover={{ scale: 1.05 }}
        whileFocus={{ scale: 1.05 }}
        transition={spring}
        className={`relative ${isPDFLoading ? "mt-[45vh]" : "mt-10"} rounded-md overflow-hidden flex justify-center items-center w-fit mx-auto ${
          hydrated && viewport === ViewportMode.Mobile ? "cursor-pointer" : "cursor-none"
        }`}
        onClick={viewport === ViewportMode.Mobile ? undefined : downloadResume}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            downloadResume();
          }
        }}
        onMouseEnter={resumeEnter}
        onMouseLeave={resumeLeave}
        tabIndex={0}
      >
        <Document file="/ed-urban-resume.pdf" loading={<LoadingSpinner />}>
          <PDFPage onLoadSuccess={onLoadSuccess} pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} width={pdfSize} height={pdfSize} />
        </Document>
      </motion.section>
      {hydrated && !isPDFLoading && viewport === ViewportMode.Mobile && (
        <motion.div
          tabIndex={0}
          transition={spring}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.05 }}
          onClick={downloadResume}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              downloadResume();
            }
          }}
          className="rounded-full p-2 w-[120px] h-[50px] flex justify-center items-center bg-[#3c78d8] cursor-pointer"
        >
          💾 Download
        </motion.div>
      )}
    </div>
  );
};
