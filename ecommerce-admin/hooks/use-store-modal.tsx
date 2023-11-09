import { create } from "zustand";

// use store modal interface
type useStoreModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// use store modal
export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
