"use client";


import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        if (!isOpen) {
            // Make sure you actually call the onOpen function
            onOpen();
        }
    }, [isOpen, onOpen]);

    return null;
};

export default SetupPage;
