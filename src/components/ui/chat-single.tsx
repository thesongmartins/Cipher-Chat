export const Chat_Single = () => {
  return (
    <>
      <div className="flex items-center justify-between [&_h4]:text-xs [&_h4]:font-medium w-full [&_h4]:text-time-texts">
        <div className="flex text-white items-center justify-center gap-3">
          <img
            src="/images/frame1.png"
            alt="profile images"
            className="size-12 object-contain"
          />
          <div className="flex flex-col items-start justify-start gap-1  ">
            <h3 className="text-base ont-medium">That_guy_dhave</h3>
            <small className="text-xs text-time-texts">
              what’s for breakfast?
            </small>
          </div>
        </div>
        <h4>04:20</h4>
      </div>
    </>
  );
};
