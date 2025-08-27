import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
type Message = {
  id: string;
  createdAt: number;
  createdTime: string;
  inputText: string | null;
  file?: File | null;
  voiceNote?: string | null;
};

// Message state types that holds the message array, emoji update(addEmoji), and update messages(add and delete)
type MessageState = {
  message: Message[];
  emoji?: string;
  addMessage: (
    inputText: Message["inputText"],
    file: Message["file"],
    voiceNote: Message["voiceNote"]
  ) => void;
  deleteMessage: (id: Message["id"]) => void;
  addEmoji: (emoji: string) => void;
};

export const useMessageStore = create<MessageState>()(
  devtools(
    persist(
      (set) => ({
        message: [],
        emoji: "",
        // state to update sending message
        addMessage: (inputText, file, voiceNote) =>
          set((state) => {
            return {
              message: [
                ...state.message,
                {
                  id: crypto.randomUUID(),
                  createdAt: Date.now(),
                  inputText,
                  file,
                  voiceNote,
                } as Message,
              ],
            };
          }),

        // state to delete message
        deleteMessage: (id) =>
          set((state) => ({
            message: state.message.filter((msg) => msg.id !== id),
          })),

        // state to add emoji to input text
        addEmoji: (emoji) => set({ emoji: emoji }),
      }),
      { name: "chat-message-storage" }
    )
  )
);
