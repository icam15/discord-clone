"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

// import "@uploadthing/react/styles.css";

interface FileUplaodProps {
  onChange: (url?: string) => void;
  value: string;
  endPoint: "messageFile" | "serverImage";
}

const FileUpload = ({ endPoint, onChange, value }: FileUplaodProps) => {
  console.log(value);
  const fileType = value?.split("").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />
        <button
          className="
                absolute
                top-0
                right-0
                p-1
                bg-rose-500
                rounded-full
                text-white
                shadow-sm
                
            "
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res: { url: string | undefined }[]) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
