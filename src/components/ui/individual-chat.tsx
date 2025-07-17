import clsx from "clsx";
import React from "react";
import { FaCircle } from "react-icons/fa";

interface individualChatProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isActive?: boolean;
  text?: string;
}
export const Individual_Chat = ({
  className,
  isActive,
  text = "Hey, how are you doing?",
  ...rest
}: individualChatProps) => {
  return (
    <div
      {...rest}
      className="flex text-white items-center justify-center gap-3"
    >
      <fieldset className="relative flex items-center justify-center">
        <img
          src="/images/frame1.png"
          alt="profile images"
          className="size-12 object-contain"
        />
        {isActive && (
          <FaCircle className="text-active-green top-0 right-0  size-3 absolute" />
        )}
      </fieldset>
      <div className="flex flex-col items-start justify-start gap-1  ">
        <h3 className="text-base ont-medium">That_guy_dhave</h3>
        <small className={clsx("text-xs text-time-texts", className)}>
          {isActive ? "online" : text}
        </small>
      </div>
    </div>
  );
};
