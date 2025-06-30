import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const START_DATE = new Date("2019-07-01");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Always returns my updated years of experience since I graduated University in 2019. 
// This doesn't even include the 2 internships and 2 co-ops I did during undergrad. */
export const getYearsOfExperience = () => {
  const now = new Date();
  const diffInYears = (now.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffInYears);
};

// Helper to detect if device is mobile/touch (not SSR safe)
export function isMobileDevice() {
  return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
}
