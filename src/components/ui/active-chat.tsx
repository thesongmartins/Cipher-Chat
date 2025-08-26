import { useState, useEffect } from "react";

export const Active_Chat = ({ name = "Swag" }: { name?: string }) => {
  const [data, setData] = useState([]);

  const fetchActiveChat = async () => {
    try {
      const res = await fetch("/src/api/api.active_chat.json");
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch data");
      setData(data);
    } catch (err: unknown) {
      console.error("Erro:", err.message);
    }
  };
  useEffect(() => {
    fetchActiveChat();
  }, []);

  return (
    <div className="flex items-center gap-2 flex-col whitespace-nowrap">
      <img
        src="/images/frame1.png"
        alt="profile images"
        className="object-cover size-12 shrink-0"
      />
      <p>
        {" "}
        {data.map((da) => (
          <p key={da.id}>{da.user}</p>
        ))}
      </p>
    </div>
  );
};
