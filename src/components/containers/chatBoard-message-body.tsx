import { Left_Message } from "../ui/left-message";
import { Right_Message } from "../ui/right-message";

export const ChatBoard_Message_Body = () => {
  return (
    <>
      <div className="flex items-start justify-between w-full gap-20">
        <div className=" flex flex-col items-start gap-2 w-full">
          <Left_Message />
        </div>

        <div className=" flex items-end flex-col gap-2 mt-40 w-full">
          {/* <Right_Message /> */}
          <Right_Message />
        </div>
      </div>
    </>
  );
};
