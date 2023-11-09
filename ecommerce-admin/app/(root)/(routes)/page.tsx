"use client";

import { useEffect } from "react";

// modals
import { useStoreModal } from "@/hooks/use-store-modal";

// setup page
const SetupPage = () => {
  // fetch current modal states from store modal
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  // if store doesn't exists, open modal
  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
