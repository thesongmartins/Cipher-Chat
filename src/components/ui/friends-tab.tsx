import { useState } from "react";
import { Button } from "./button";
import { useUserStore } from "../../store/user-store";

type TabType = "friends" | "pending";

export const FriendsTab = () => {
  const [activeTab, setActiveTab] = useState<TabType>("friends");
  const {
    friends,
    pendingRequests,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
  } = useUserStore();

  const handleAcceptRequest = (requestId: string) => {
    acceptFriendRequest(requestId);
  };

  const handleDeclineRequest = (requestId: string) => {
    declineFriendRequest(requestId);
  };

  const handleRemoveFriend = (friendId: string) => {
    removeFriend(friendId);
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("friends")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "friends"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          Friends ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "pending"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          Pending Requests ({pendingRequests.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "friends" && (
          <div>
            {friends.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <svg
                  className="mx-auto h-12 w-12 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                <p>No friends yet. Add some friends to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        {friend.avatarUrl ? (
                          <img
                            src={friend.avatarUrl}
                            alt={friend.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <span className="text-gray-600 dark:text-gray-300 font-medium">
                            {friend.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {friend.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Friend
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveFriend(friend.id)}
                      className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "pending" && (
          <div>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <svg
                  className="mx-auto h-12 w-12 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>No pending friend requests</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        {request.avatarUrl ? (
                          <img
                            src={request.avatarUrl}
                            alt={request.name}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <span className="text-gray-600 dark:text-gray-300 font-medium">
                            {request.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {request.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Pending Request
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeclineRequest(request.id)}
                        className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
