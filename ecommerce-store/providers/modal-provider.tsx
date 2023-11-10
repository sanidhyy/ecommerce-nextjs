"use client";

import { useEffect, useState } from "react";

// components
import PreviewModal from "@/components/preview-modal";

// modal provider
const ModalProvider = () => {
  // states
  const [isMounted, setIsMounted] = useState(false);

  // set mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // prevent hydration errors
  if (!isMounted) return null;

  return (
    <>
      {/* show preview modal */}
      <PreviewModal />
    </>
  );
};

export default ModalProvider;
