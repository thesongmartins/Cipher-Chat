import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Message = {
  id: string;
  createdAt: number;
  createdTime: string;
  inputText: string;
};

type MessageState = {
  message: Message[];
  addMessage: (inputText: Message["inputText"]) => void;
  deleteMessage: (id: Message["id"]) => void;
};

export const useMessageStore = create<MessageState>()(
  devtools(
    persist(
      (set) => ({
        message: [],
        addMessage: (inputText) =>
          set((state) => {
            return {
              message: [
                ...state.message,
                {
                  id: crypto.randomUUID(),
                  createdAt: Date.now(),
                  inputText,
                } as Message,
              ],
            };
          }),
        deleteMessage: (id) =>
          set((state) => ({
            message: state.message.filter((msg) => msg.id !== id),
          })),
      }),
      { name: "chat-message-storage" }
    )
  )
);
