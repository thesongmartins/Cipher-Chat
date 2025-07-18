import { AiOutlinePlusCircle } from "react-icons/ai";
import { Input } from "../ui/input";
import { BsSearch } from "react-icons/bs";
import { Chat_Single } from "../ui/chat-single";
import { Active_Chat } from "../ui/active-chat";

export const Chat_Side_Bar = () => {
  return (
    <>
      <section className="flex flex-col pt-6  items-start overflow-x-hidden gap-7 w-[344px] h-screen [&_img]:size-12 *:w-full  text-white bg-side-background ">
        <div className="flex flex-col px-3.5 items-start gap-6 justify-center *:w-full *:flex *:items-center">
          <div className="flex  items-center justify-between font-semibold text-2xl font-dm-sans">
            <h1>Chats</h1> <AiOutlinePlusCircle />
          </div>
          <div className="flex items-center gap-4 pl-3.5 justify-start  overflow-x-scroll no-scrollbar w-full">
            <Active_Chat name="Michael" />
            <Active_Chat name="Dan De Lion" />
            <Active_Chat />
          </div>

          <div className="*:text-search-placeholder">
            <BsSearch className="absolute ml-3 z-10 text-xl" />
            <Input
              type="search"
              className="relative pl-11 placeholder:text-base placeholder:text-search-placeholder  outline-0 border-0 bg-input-background"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-6 justify-start text-chats-texts overflow-y-scroll no-scrollbar h-full px-3.5  ">
          <Chat_Single />
          <Chat_Single />
          <Chat_Single />
          <Chat_Single />
          <Chat_Single />
          <Chat_Single />
          <Chat_Single />
          <Chat_Single />
          <Chat_Single />
        </div>
      </section>
    </>
  );
};
