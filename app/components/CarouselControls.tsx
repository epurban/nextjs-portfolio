import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  totalImages: number;
  currentIndex: number;
  showControls: boolean;
  onNavigate: (direction: "left" | "right") => void;
  onGoToIndex: (index: number) => void;
  size?: "small" | "large";
}

export const CarouselControls = ({ totalImages, currentIndex, showControls, onNavigate, onGoToIndex, size = "small" }: CarouselControlsProps) => {
  if (totalImages <= 1) return null;

  const arrowSize = size === "small" ? "w-8 h-8" : "w-10 h-10";
  const iconSize = size === "small" ? "w-4 h-4" : "w-5 h-5";
  const indicatorSize = size === "small" ? "w-2 h-2" : "w-3 h-3";
  const spacing = size === "small" ? "space-x-1" : "space-x-2";
  const positioning = size === "small" ? "left-2 right-2" : "left-4 right-4";

  return (
    <>
      {/* Navigation Arrows */}
      <AnimatePresence>
        {showControls && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute ${
                positioning.split(" ")[0]
              } top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full ${arrowSize} flex items-center justify-center transition-colors z-20 cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("left");
              }}
            >
              <ChevronLeft className={`${iconSize} cursor-pointer`} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute ${
                positioning.split(" ")[1]
              } top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full ${arrowSize} flex items-center justify-center transition-colors z-20 cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("right");
              }}
            >
              <ChevronRight className={`${iconSize} cursor-pointer`} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Image Indicators */}
      <div className={`absolute ${size === "small" ? "bottom-2" : "bottom-4"} left-1/2 transform -translate-x-1/2 flex ${spacing} z-20`}>
        {Array.from({ length: totalImages }, (_, index) => (
          <button
            key={index}
            className={`${indicatorSize} rounded-full transition-colors cursor-pointer ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            onClick={(e) => {
              e.stopPropagation();
              onGoToIndex(index);
            }}
          />
        ))}
      </div>
    </>
  );
};
