import { useState } from "react";

export const useCarousel = (totalImages: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [showControls, setShowControls] = useState(false);

  const navigate = (direction: "left" | "right") => {
    if (totalImages <= 1) return;

    setSlideDirection(direction);
    setHasNavigated(true);

    if (direction === "right") {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const goToIndex = (index: number) => {
    if (index !== currentIndex && totalImages > 1) {
      setSlideDirection(index > currentIndex ? "right" : "left");
      setHasNavigated(true);
      setCurrentIndex(index);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigate("left");
    } else if (info.offset.x < -threshold) {
      navigate("right");
    }
  };

  const reset = () => {
    setHasNavigated(false);
  };

  return {
    currentIndex,
    hasNavigated,
    slideDirection,
    showControls,
    setShowControls,
    navigate,
    goToIndex,
    handleDragEnd,
    reset,
  };
};
