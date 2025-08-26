import { Individual_Chat } from "../ui/individual-chat";
import { PiVideoCameraLight } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { Input } from "../ui/input";
import { FaMicrophone } from "react-icons/fa";
import { GrImage } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { ChatBoard_Message_Body } from "./chatBoard-message-body";
import { FormEvent, useState } from "react";
import { useMessageStore } from "../../store/message-store";
import EmojiCard from "../ui/emojiCard";

export const Filled_Chatboard_State = () => {
  const [inputText, setUpdateMessage] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const addMessage = useMessageStore((s) => s.addMessage);
  const handleUpdater = (e: FormEvent) => {
    e.preventDefault();

    if (inputText.trim()) {
      addMessage(inputText);
      setUpdateMessage("");
    }
  };

  const handleEnterKey = (e: KeyboardEvent | FormEvent) => {
    if (e.key === "Enter") {
      handleUpdater(e);
    }
  };

  return (
    <div className="flex flex-col  text-white items-start justify-between size-full px-6 ">
      <div className="flex items-center justify-between   w-full py-4">
        <Individual_Chat isActive={true} className2="!text-active-green" />
        <ul className="flex items-center justify-between gap-4 *:text-[21px] ">
          <PiVideoCameraLight />
          <IoCallOutline />
          <BsThreeDots />
        </ul>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 w-full overflow-y-scroll no-scrollbar ">
        <ChatBoard_Message_Body />
      </div>
      <div className="flex items-center my-4 rounded-lg justify-between w-full px-6 py-4 bg-input-background  text-chats-texts relative">
        {openEmoji && (
          <div className="absolute right-10 bottom-20 ">
            <EmojiCard />
          </div>
        )}
        <FaMicrophone className="text-[21px]" />
        <Input
          type="text"
          name="message"
          value={inputText}
          onKeyDown={handleEnterKey}
          onChange={(e) => setUpdateMessage(e.target.value)}
          className="bg-input-background placeholder:text-xs placeholder:text-search-placeholder w-full px-3.5 py-2 
            focus:border-0 border-0 focus-visible:ring-0"
          placeholder="Send a message..."
        />
        <div className="flex *:cursor-pointer items-center justify-between gap-4 *:text-[21px]">
          <GrImage />
          <BsEmojiSmile onClick={() => setOpenEmoji(!openEmoji)} />
          <button
            type="submit"
            onClick={handleUpdater}
            className="bg-chats-texts rounded-lg py-2 px-3 text-background  *:text-sm"
          >
            <LuSend />
          </button>
        </div>
      </div>
    </div>
  );
};
