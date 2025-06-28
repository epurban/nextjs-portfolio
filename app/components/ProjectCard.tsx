"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Img } from "./types";
import { useState } from "react";
import { X } from "lucide-react";

export interface ProjectCardProps {
  title: string;
  description: string;
  logo: Img;
  images: Img[];
  linkText?: string;
  linkUrl?: string;
  cutoffAtTop?: boolean;
}

export const ProjectCard = ({ description, title, logo, images, linkText, linkUrl, cutoffAtTop = false }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <motion.div whileHover="hovered" whileFocus="hovered" initial="rest" animate="rest" tabIndex={0}>
        <Card className="break-inside-avoid mb-6">
          <CardHeader>
            <span>
              <Image
                className="float-left mr-3"
                src={logo.url}
                width={50}
                height={50}
                alt={logo.alt}
                style={{ objectFit: "contain", ...logo.style }}
                priority
                quality={100}
              />
              <div className={`flex flex-row items-center justify-between mb-2`}>
                <CardTitle>{title}</CardTitle>
                {linkText && linkUrl && (
                  <Button asChild variant="link">
                    <Link href={linkUrl} target="_blank" className="h-[16px]">
                      {linkText}
                    </Link>
                  </Button>
                )}
              </div>
              <CardDescription>{description}</CardDescription>
            </span>
          </CardHeader>
          {images.length > 0 && (
            <CardContent className="relative" style={{ width: "100%", height: "auto" }}>
              <div style={{ aspectRatio: "16/9" }} className={`w-[100%] h-auto bg-gray-900 rounded-lg relative`}>
                <motion.div
                  layoutId={`image-${title}-${images[0].url}`}
                  className="cursor-pointer w-full h-full relative"
                  onClick={toggleFullscreen}
                  style={{ zIndex: isFullscreen || (!isFullscreen && isAnimating) ? 60 : 1 }}
                  onLayoutAnimationStart={() => setIsAnimating(true)}
                  onLayoutAnimationComplete={() => setIsAnimating(false)}
                >
                  <Image
                    className={`rounded-lg object-cover w-full h-full transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"} ${
                      cutoffAtTop ? "object-bottom" : "object-top"
                    }`}
                    src={images[0].url}
                    alt={images[0].alt}
                    priority
                    quality={100}
                    fill
                    placeholder="empty"
                    onLoad={() => {
                      setImageLoaded(true);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </motion.div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <motion.div
              layoutId={`image-${title}-${images[0].url}`}
              className="relative rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(95vw, 95vh * 16/9)",
                height: "min(95vh, 95vw * 9/16)",
                aspectRatio: "16/9",
              }}
            >
              <Image
                className={`object-cover w-full h-full ${cutoffAtTop ? "object-bottom" : "object-top"}`}
                src={images[0].url}
                alt={images[0].alt}
                priority
                quality={100}
                fill
              />
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/75 transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
