"use client";

import { useEffect, useState } from "react";

// components
import { StoreModal } from "@/components/modals/store-modal";

// modal provider
export const ModalProvider = () => {
  // states
  const [isMounted, setIsMounted] = useState(false);

  // update mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // prevent hydration error
  if (!isMounted) return null;

  return (
    <>
      {/* store modal */}
      <StoreModal />
    </>
  );
};
