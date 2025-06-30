import { PanInfo } from "framer-motion";
import { useState, useRef } from "react";

type CarouselState = {
  index: number;
  hasNavigated: boolean;
  slideDirection: "left" | "right";
};

export const useCarousel = (totalImages: number) => {
  const [carouselState, setCarouselState] = useState<CarouselState>({
    index: 0,
    hasNavigated: false,
    slideDirection: "right",
  });
  const [showControls, setShowControls] = useState(false);
  const isAnimating = useRef(false);

  const navigate = (direction: "left" | "right") => {
    if (totalImages <= 1 || isAnimating.current) return;

    isAnimating.current = true;
    setTimeout(() => {
      isAnimating.current = false;
    }, 350);

    setCarouselState((prevState) => {
      const newIndex = direction === "right" ? (prevState.index + 1) % totalImages : (prevState.index - 1 + totalImages) % totalImages;

      return {
        index: newIndex,
        hasNavigated: true,
        slideDirection: direction,
      };
    });
  };

  const goToIndex = (index: number) => {
    if (index !== carouselState.index && totalImages > 1 && !isAnimating.current) {
      isAnimating.current = true;
      setTimeout(() => {
        isAnimating.current = false;
      }, 350);

      setCarouselState((prevState) => {
        let direction: "left" | "right";

        // Handle wrapping cases
        if (index === 0 && prevState.index > 1) {
          // Wrapped forward to beginning
          direction = "right";
        } else if (index === totalImages - 1 && prevState.index === 0) {
          // Wrapped backward to end
          direction = "left";
        } else {
          // Normal case
          direction = index > prevState.index ? "right" : "left";
        }

        return {
          index,
          hasNavigated: true,
          slideDirection: direction,
        };
      });
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isAnimating.current) return;

    const threshold = 50;
    if (info.offset.x > threshold) {
      navigate("left");
    } else if (info.offset.x < -threshold) {
      navigate("right");
    }
  };

  const reset = () => {
    setCarouselState((prevState) => ({
      ...prevState,
      hasNavigated: false,
    }));
  };

  return {
    currentIndex: carouselState.index,
    hasNavigated: carouselState.hasNavigated,
    slideDirection: carouselState.slideDirection,
    showControls,
    setShowControls,
    navigate,
    goToIndex,
    handleDragEnd,
    reset,
  };
};
