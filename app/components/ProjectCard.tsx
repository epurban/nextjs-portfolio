"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Img } from "./types";
import { useState } from "react";
import { X } from "lucide-react";
import { CarouselControls } from "./CarouselControls";
import { useCarousel } from "@/hooks/useCarousel";

export interface ProjectCardProps {
  title: string;
  description: string;
  logo: Img;
  images: Img[];
  linkText?: string;
  linkUrl?: string;
  cutoffAtTop?: boolean;
}

const slideAnimations = {
  getInitial: (hasNavigated: boolean, direction: "left" | "right") => (hasNavigated ? { x: direction === "right" ? 300 : -300, opacity: 0 } : { opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  getExit: (hasNavigated: boolean, direction: "left" | "right") => (hasNavigated ? { x: direction === "right" ? -300 : 300, opacity: 0 } : { opacity: 0 }),
  transition: { duration: 0.35, type: "spring", bounce: 0.15 },
};

export const ProjectCard = ({ description, title, logo, images, linkText, linkUrl, cutoffAtTop = false }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const cardCarousel = useCarousel(images.length);
  const fullscreenCarousel = useCarousel(images.length);

  const toggleFullscreen = () => {
    fullscreenCarousel.goToIndex(cardCarousel.currentIndex);
    fullscreenCarousel.reset();
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
              <div
                style={{ aspectRatio: "16/9" }}
                className={`w-[100%] h-auto bg-gray-900 rounded-lg relative overflow-hidden`}
                onMouseEnter={() => cardCarousel.setShowControls(true)}
                onMouseLeave={() => cardCarousel.setShowControls(false)}
              >
                <motion.div
                  className="cursor-pointer w-full h-full relative"
                  onClick={toggleFullscreen}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleFullscreen();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${title} image ${cardCarousel.currentIndex + 1} of ${images.length} in fullscreen`}
                  style={{ zIndex: 1 }}
                  onLayoutAnimationStart={() => setIsAnimating(true)}
                  onLayoutAnimationComplete={() => setIsAnimating(false)}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={cardCarousel.handleDragEnd}
                >
                  <AnimatePresence>
                    <motion.div
                      key={cardCarousel.currentIndex}
                      initial={slideAnimations.getInitial(cardCarousel.hasNavigated, cardCarousel.slideDirection)}
                      animate={slideAnimations.animate}
                      exit={slideAnimations.getExit(cardCarousel.hasNavigated, cardCarousel.slideDirection)}
                      transition={slideAnimations.transition}
                      className="w-full h-full absolute inset-0"
                    >
                      <Image
                        className={`rounded-lg object-cover w-full h-full transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"} ${
                          cutoffAtTop ? "object-bottom" : "object-top"
                        }`}
                        src={images[cardCarousel.currentIndex].url}
                        alt={images[cardCarousel.currentIndex].alt}
                        priority
                        quality={100}
                        fill
                        placeholder="empty"
                        onLoad={() => setImageLoaded(true)}
                        style={{ cursor: "pointer" }}
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <CarouselControls
                  totalImages={images.length}
                  currentIndex={cardCarousel.currentIndex}
                  showControls={cardCarousel.showControls}
                  onNavigate={cardCarousel.navigate}
                  onGoToIndex={cardCarousel.goToIndex}
                  size="small"
                />
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
            onMouseEnter={() => fullscreenCarousel.setShowControls(true)}
            onMouseLeave={() => fullscreenCarousel.setShowControls(false)}
          >
            <motion.div
              className="relative rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(95vw, 95vh * 16/9)",
                height: "min(95vh, 95vw * 9/16)",
                aspectRatio: "16/9",
                zIndex: 60,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={fullscreenCarousel.handleDragEnd}
            >
              <AnimatePresence>
                <motion.div
                  key={fullscreenCarousel.currentIndex}
                  initial={slideAnimations.getInitial(fullscreenCarousel.hasNavigated, fullscreenCarousel.slideDirection)}
                  animate={slideAnimations.animate}
                  exit={slideAnimations.getExit(fullscreenCarousel.hasNavigated, fullscreenCarousel.slideDirection)}
                  transition={slideAnimations.transition}
                  className="w-full h-full absolute inset-0"
                >
                  <Image
                    className={`object-cover w-full h-full transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"} ${
                      cutoffAtTop ? "object-bottom" : "object-top"
                    }`}
                    src={images[fullscreenCarousel.currentIndex].url}
                    alt={images[fullscreenCarousel.currentIndex].alt}
                    priority
                    quality={100}
                    fill
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              <CarouselControls
                totalImages={images.length}
                currentIndex={fullscreenCarousel.currentIndex}
                showControls={fullscreenCarousel.showControls}
                onNavigate={fullscreenCarousel.navigate}
                onGoToIndex={fullscreenCarousel.goToIndex}
                size="large"
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
