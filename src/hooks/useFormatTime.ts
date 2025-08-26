export const useFormatTime = () => {
  const formatTime = (createdAt: number) => {
    const now = Date.now();
    const diffSec = Math.floor((now - createdAt) / 1000);

    if (diffSec < 60) return "Just now";

    return new Date(createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return { formatTime };
};
