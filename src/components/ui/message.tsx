import React from "react";
import { FileInput } from "./fileInput";

export const Message = ({
  children,
  createdAt,
  file,
  voiceNote,
  onClick,
}: {
  children: React.ReactNode;
  createdAt: React.ReactNode;
  file: File | null;
  voiceNote: string | null;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-end gap-2 overflow-x-hidden"
    >
      {children && (
        <article className="bg-side-background text-left rounded-lg p-4  flex items-start font-medium text-white text-sm">
          {children}
        </article>
      )}
      {file && <FileInput fileInput={file} />}
      {voiceNote && <audio controls src={voiceNote} />}
      <small className="text-xs text-gray-400">{createdAt}</small>
    </div>
  );
};
