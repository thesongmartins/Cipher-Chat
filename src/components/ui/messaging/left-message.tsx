import React from "react";
import { Message } from "./message";

export const Left_Message = () => {
  return (
    <>
      <div className="flex items-end justify-end gap-6  ">
        <img
          src="/images/frame1.png"
          alt="profile images"
          className="size-12 object-contain"
        />
        <Message
          text="Hey Dan De, read me a story in your free time. I would love to hear about your adventures and experiences. 😊
"
        />
      </div>
    </>
  );
};
