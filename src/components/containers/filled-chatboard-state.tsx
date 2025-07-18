import { Individual_Chat } from "../ui/individual-chat";
import { PiVideoCameraLight } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { Input } from "../ui/input";
import { FaMicrophone } from "react-icons/fa";
import { GrImage } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import { LuSend } from "react-icons/lu";

export const Filled_Chatboard_State = () => {
  return (
    <div className="flex flex-col py-4 text-white items-start justify-between size-full px-6 ">
      <div className="flex items-center justify-between   w-full">
        <Individual_Chat isActive={true} className="!text-active-green" />
        <ul className="flex items-center justify-between gap-4 *:text-[21px] ">
          <PiVideoCameraLight />
          <IoCallOutline />
          <BsThreeDots />
        </ul>
      </div>
      <div>Body</div>
      <div className="flex items-center rounded-lg justify-between w-full px-6 py-4 bg-input-background  text-chats-texts">
        <FaMicrophone className="text-[21px]" />
        <Input
          type="search"
          className="bg-input-background placeholder:text-xs placeholder:text-search-placeholder w-full px-3.5 py-2 
            focus:border-0 border-0 focus-visible:ring-0"
          placeholder="Send a message..."
        />
        <div className="flex items-center justify-between gap-4 *:text-[21px]">
          <GrImage />
          <BsEmojiSmile />
          <LuSend />
        </div>
      </div>
    </div>
  );
};
