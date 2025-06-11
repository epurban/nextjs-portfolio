import { createBreakpoint } from "react-use";

export enum ViewportMode {
  Mobile = "mobile",
  Tablet = "tablet",
  Laptop = "laptop",
  Desktop = "desktop",
}

export const breakpoints = {
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
};

export const useViewportMode = createBreakpoint(breakpoints) as () => ViewportMode;
