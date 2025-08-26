import emojis from "../../data/emojis.json";
import { useMessageStore } from "../../store/message-store";
import { EmojiData } from "../../types/emojis";
const EmojiCard = ({
  handleEmoji,
}: {
  handleEmoji: (emoji: string) => void;
}) => {
  const emoji = emojis as EmojiData;
  const addEmoji = useMessageStore((s) => s.addEmoji);

  // Function to handle adding emoji, takes in a parameter that is used to update the functions inside
  const handleAddEmoji = (emoji: string) => {
    addEmoji(emoji);
    handleEmoji(emoji);
  };
  return (
    <>
      <div className="gap-2 no-scrollbar size-[300px] overflow-y-scroll flex flex-col rounded-xl p-2 bg-black/20 backdrop-blur-xs ">
        
        {/* converts the JSON object into an array of Key value pairs */}
        {Object.entries(emoji).map(([category, items]) => (
          <section
            key={category}
            className="rounded-2xl  flex flex-col  shadow-sm"
          >
            <header className="flex items-center justify-between  p-3">
              <h3 className="text-sm font-medium text-gray-700">{category}</h3>
            </header>

            <div className="grid grid-cols-5 gap-2 p-3 ">
              {/* Mapping over the value array */}
              {items.map((item) => (
                <div
                  onClick={() => handleAddEmoji(item.emoji)}
                  key={item.name + item.emoji}
                  className="flex  items-center justify-center"
                  title={item.name}
                  aria-label={item.name}
                  role="img"
                >
                  <span className="text-2xl cursor-pointer select-none">
                    {item.emoji}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default EmojiCard;
