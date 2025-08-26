import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useUserStore } from "../../store/user-store";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddUserModal = ({ isOpen, onClose }: AddUserModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { addPendingRequest } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setMessage("");

    try {
      // Simulate API call to check if user exists
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, we'll assume the user exists and add them to pending requests
      const newRequest = {
        id: crypto.randomUUID(),
        name: email.split("@")[0], // Use email prefix as name for demo
        avatarUrl: undefined,
        status: "pending" as const,
      };

      addPendingRequest(newRequest);
      setMessage("Friend request sent successfully!");
      setEmail("");

      // Close modal after a delay
      setTimeout(() => {
        onClose();
        setMessage("");
      }, 2000);
    } catch {
      setMessage("Failed to send friend request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add Friend
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Friend's Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter friend's email address"
              required
              className="w-full"
            />
          </div>

          {message && (
            <div
              className={`text-sm p-3 rounded-md ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="flex-1"
            >
              {isLoading ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
