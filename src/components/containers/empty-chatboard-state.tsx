export const Empty_Chatboard_State = () => {
  return (
    <div className="flex flex-col items-center justify-center size-full ">
      <img
        src="/public/images/hot-trending.png"
        alt="Hot trending"
        className="flex size-[168.64px] items-center justify-center w-full object-contain"
      />
      <h1 className="text-[32px] font-semi-bold text-center text-white">
        Select a Message and chat
      </h1>
    </div>
  );
};
