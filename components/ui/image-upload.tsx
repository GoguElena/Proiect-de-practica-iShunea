"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"

// Define the type for the result returned by Cloudinary's upload widget
interface CloudinaryUploadResult {
    event: string;
    info: {
        secure_url: string;
    };
}

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
disabled,
onChange,
onRemove,
value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    // const onUpload = (result: unknown) => {
    //     onChange(result.info.secure_url);
    // }
    const onUpload = (result: CloudinaryUploadResult) => {
        // Ensure that result.info and result.info.secure_url are defined
        if (result.info && typeof result.info.secure_url === "string") {
            onChange(result.info.secure_url);
        } else {
            console.error("Upload failed: secure_url not found in result", result);
        }
    };



    if(!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url}
                         className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4"/>
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />

                    </div>
                ))}
            </div>
            <CldUploadWidget
                onSuccess={onUpload} uploadPreset="dthhcs9g"
            >
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2"/>
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;