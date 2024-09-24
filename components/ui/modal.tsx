"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void; // Corrected the typo here
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
                                                title,
                                                description,
                                                isOpen,
                                                onClose, // Corrected the typo here
                                                children,
                                            }) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose(); // Use corrected onClose here
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};
