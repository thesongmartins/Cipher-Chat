import emojis from "../../data/emojis.json";
import { EmojiData } from "../../types/emojis";
const EmojiCard = () => {
  const emoji = emojis as EmojiData;

  return (
    <>
      <div className="gap-2 no-scrollbar size-[300px] overflow-y-scroll flex flex-col rounded-xl p-2 bg-black/20 backdrop-blur-xs ">
        {Object.entries(emoji).map(([category, items]) => (
          <section
            key={category}
            className="rounded-2xl  flex flex-col  shadow-sm"
          >
            <header className="flex items-center justify-between  p-3">
              <h3 className="text-sm font-medium text-gray-700">{category}</h3>
            </header>

            <div className="grid grid-cols-5 gap-2 p-3 ">
              {items.map((item) => (
                <div
                  key={item.name + item.emoji}
                  className="flex items-center justify-center"
                  title={item.name}
                  aria-label={item.name}
                  role="img"
                >
                  <span className="text-2xl select-none">{item.emoji}</span>
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
