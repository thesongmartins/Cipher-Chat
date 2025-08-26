import { useState } from "react";
import { useFormatTime } from "../../hooks/useFormatTime";
import { useMessageStore } from "../../store/message-store";
import { Message } from "./message";
import { AiFillDelete } from "react-icons/ai";

export const Right_Message = () => {
  const { message, deleteMessage } = useMessageStore();
  console.log("Message Cues:", message);
  const { formatTime } = useFormatTime();
  const [open, setOpen] = useState<string | null>(null);

  const handleToggle = (id: null) => {
    setOpen((prev) => (prev === id ? null : id));
  };

  const handleDelete = () => {};
  return (
    <div className="flex flex-col items-end justify-end gap-2.5 ">
      {message.map((message, id) => {
        const isOpen = open === message.id;
        return (
          <div key={id} className="gap-1 flex flex-col items-end">
            <Message
              createdAt={formatTime(message.createdAt)}
              onClick={() => handleToggle(message.id)}
            >
              {message.inputText}
            </Message>
            <>
              {isOpen && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessage(message.id);
                    setOpen(null);
                  }}
                  aria-label="Delete message"
                  title="Delete"
                >
                  <AiFillDelete cursor={"pointer"} />
                </button>
              )}
            </>
          </div>
        );
      })}
    </div>
  );
};
