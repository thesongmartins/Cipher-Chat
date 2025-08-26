import React from "react";

export const Message = ({
  children,
  createdAt,
  onClick,
}: {
  children: React.ReactNode;
  createdAt: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-end not-last-of-type:gap-1"
    >
      <article className="bg-side-background text-left rounded-lg p-4  flex items-start font-medium text-white text-sm">
        {children}
      </article>
      <small className="text-xs text-gray-400">{createdAt}</small>
    </div>
  );
};
