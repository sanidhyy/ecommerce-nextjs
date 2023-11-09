"use client";

import { useEffect, useState } from "react";

// components
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

// alert modal props
type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
};

// alert modal
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  // states
  const [isMounted, setIsMounted] = useState(false);

  // update mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // prevent hydration error
  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        {/* cancel */}
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
          title="Cancel"
        >
          Cancel
        </Button>

        {/* continue */}
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
          title="Continue"
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
