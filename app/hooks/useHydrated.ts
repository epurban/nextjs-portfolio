import { useEffect, useState } from "react";

let hydrating = true;

// Use this bad boy to prevent hydration errors by ensuring certain DOM elements are only updated once the client has hydrated
export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(() => !hydrating);

  useEffect(() => {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated;
};
