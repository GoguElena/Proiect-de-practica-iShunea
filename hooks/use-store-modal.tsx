import { create } from "zustand";

interface UseStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useStoreModal = create<UseStoreModalStore>((set) => ({
    isOpen: false, // Initialize to false so the modal is closed by default
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
