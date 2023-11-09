import { useState, useEffect } from "react";

// use origin
export const useOrigin = () => {
  // states
  const [mounted, setMounted] = useState(false);
  // get origin
  const origin =
    typeof window !== undefined && window.location.origin
      ? window.location.origin
      : "";

  // update mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // prevent hydration error
  if (!mounted) return "";

  // return origin
  return origin;
};
