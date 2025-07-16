export const Active_Chat = ({ name = "Swag" }: { name?: string }) => {
  return (
    <div className="flex items-center gap-2 flex-col whitespace-nowrap">
      <img
        src="/images/frame1.png"
        alt="profile images"
        className="object-cover size-12 shrink-0"
      />
      <p>{name}</p>
    </div>
  );
};
