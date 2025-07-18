import { Individual_Chat } from "./individual-chat";

export const Chat_Single = () => {
  return (
    <>
      <div className="flex items-center justify-between [&_h4]:text-xs [&_h4]:font-medium w-full [&_h4]:text-time-texts">
        <Individual_Chat />
        <h4>04:20</h4>
      </div>
    </>
  );
};
