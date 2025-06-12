"use client";

import { motion } from "framer-motion";
import { Document, pdfjs, Page as PDFPage } from "react-pdf";
import { cn } from "@/lib/utils";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useViewportMode, ViewportMode } from "@/hooks/useViewportMode";
import { useMemo, useRef, useState } from "react";
import useMouse from "@react-hook/mouse-position";

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
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const ref = useRef(null);
  const lastMouseXPosition = useRef(0);
  const lastMouseYPosition = useRef(0);

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
    if (viewport === ViewportMode.Mobile) {
      return 400;
    } else if (viewport === ViewportMode.Tablet) {
      return 600;
    } else {
      return 800;
    }
  }, [viewport]);

  const resumeEnter = () => {
    setCursorText("💾");
    setCursorVariant("pdf");
  };
  const resumeLeave = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  return (
    <div className="flex" ref={ref}>
      <motion.div variants={variants} className="absolute rounded-full pointer-events-none" animate={cursorVariant} transition={spring}>
        {cursorText}
      </motion.div>
      <motion.section
        style={{ position: "relative" }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="mt-10 rounded-md overflow-hidden flex justify-center items-center w-fit mx-auto cursor-none"
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/ed-urban-resume.pdf";
          link.download = "ed-urban-resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        onMouseEnter={resumeEnter}
        onMouseLeave={resumeLeave}
      >
        <Document file="/ed-urban-resume.pdf" loading={<LoadingSpinner />}>
          <PDFPage pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} width={pdfSize} height={pdfSize} />
        </Document>
      </motion.section>
    </div>
  );
};
