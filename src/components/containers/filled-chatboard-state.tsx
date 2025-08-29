import { Individual_Chat } from "../ui/individual-chat";
import { PiVideoCameraLight } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { Input } from "../ui/input";
import { GrImage } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { ChatBoard_Message_Body } from "./chatBoard-message-body";
import { FormEvent, useRef, useState } from "react";
import { useMessageStore } from "../../store/message-store";
import EmojiCard from "../ui/messaging/emojiCard";
import { FileInput } from "../ui/messaging/fileInput";
import { VoiceNoteRecorder } from "../ui/messaging/voice-note-recorder";
import clsx from "clsx";

export const Filled_Chatboard_State = () => {
  const [inputText, setInputText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const addMessage = useMessageStore((s) => s.addMessage);
  const emoji = useMessageStore((s) => s.emoji);
  // ref for fileInput
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // state for fileInput management
  const [fileInput, setFileInput] = useState<File | null>(null);

  // --- store the preview audio URL
  const [audioURL, setAudioURL] = useState<string | null>(null);

  // to disable recording button when previewing audio
  const [disable, setDisable] = useState<boolean>(false);

  // Fn handles sending message by button click
  const handleUpdater = (
    e: FormEvent | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    if (inputText.trim() || fileInput || audioURL) {
      addMessage(inputText, fileInput, audioURL);
      setInputText("");
      setAudioURL(null);
    }
  };

  // Fn handles sending message by Enter keypress
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdater(e);
    }
  };
  // This Fn updates the input field by the previous data when an emoji is added by the setter fn
  const handleEmoji = () => {
    setInputText((prev) => prev + emoji);
  };

  // Open file selector when icon clicked
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  // Handles file selection
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) setFileInput(file);
  };

  return (
    <div className="flex flex-col  text-white items-start justify-between size-full px-6 ">
      <div className="flex items-center justify-between w-full py-4">
        <Individual_Chat isActive={true} className2="!text-active-green" />
        <ul className="flex items-center justify-between gap-4 *:text-[21px] ">
          <PiVideoCameraLight />
          <IoCallOutline />
          <BsThreeDots />
        </ul>
      </div>

      <div className="w-full flex flex-col overflow-hidden">
        <div
          onClick={() => setOpenEmoji(false)}
          className="flex flex-col items-start justify-between gap-4 w-full overflow-y-scroll no-scrollbar"
        >
          <ChatBoard_Message_Body />
          {/* File preview */}
        </div>
        <div className="flex items-center my-4 rounded-lg justify-between w-full px-6 py-4 bg-input-background  text-chats-texts relative">
          {/* FIle Preview */}
          <span className="absolute bottom-20  left-0">
            <FileInput fileInput={fileInput} />
          </span>

          {/* Emoji Card List */}
          {openEmoji && (
            <div className="absolute right-10 bottom-20 ">
              <EmojiCard handleEmoji={handleEmoji} />
            </div>
          )}

          {/* Voice Recorder Preview */}
          <VoiceNoteRecorder audioURL={audioURL} setAudioURL={setAudioURL} />
          <Input
            type="text"
            name="message"
            value={inputText}
            disabled={disable}
            onKeyDown={handleEnterKey}
            onChange={(e) => setInputText(e.target.value)}
            className={clsx(
              "bg-input-background placeholder:text-xs placeholder:text-search-placeholder w-full px-3.5 py-2 focus:border-0 border-0 focus-visible:ring-0"
            )}
            placeholder="Send a message..."
          />
          <div className="flex items-center justify-between gap-4 *:cursor-pointer *:text-[21px]">
            <span className="flex items-center">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileInput}
              />
              <button onClick={handleFileClick} className={clsx()}>
                <GrImage />
              </button>
            </span>
            <button
              onClick={() => setOpenEmoji(!openEmoji)}
              className={clsx(
                openEmoji
                  ? "bg-chats-texts text-background font-bold rounded-lg p-2 "
                  : ""
              )}
            >
              <BsEmojiSmile />
            </button>
            <button
              type="submit"
              onClick={handleUpdater}
              className="bg-chats-texts rounded-lg py-2 px-3 text-background "
            >
              <LuSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
