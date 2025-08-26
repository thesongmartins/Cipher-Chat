import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { AddUserModal } from "../components/ui/add-user-modal";
import { FriendsTab } from "../components/ui/friends-tab";
import { ProfileEdit } from "../components/ui/profile-edit";
import { useUserStore } from "../store/user-store";
import { UserProfile } from "../types/userProfile";

const Profile = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser, setCurrentUser } = useUserStore();

  // Initialize with demo user data if none exists
  useEffect(() => {
    if (!currentUser) {
      const demoUser: UserProfile = {
        id: "1",
        name: "Song Martins",
        email: "song.martins@example.com",
        bio: "Software developer and tech enthusiast. Love building amazing applications!",
        avatarUrl: undefined,
      };
      setCurrentUser(demoUser);
    }
  }, [currentUser, setCurrentUser]);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your profile and connect with friends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl text-gray-600 dark:text-gray-300 font-medium">
                      {currentUser.name.charAt(0).toUpperCase()} 
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentUser.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {currentUser.email}
                </p>
              </div>

              {currentUser.bio && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {currentUser.bio}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-active-green"
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={() => setIsAddUserModalOpen(true)}
                  variant="outline"
                  className="w-full bg-active-green"
                >
                  Add Friend
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Friends Management */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Friends
                </h2>
                <Button
                  onClick={() => setIsAddUserModalOpen(true)}
                  size="sm"
                  className="bg-active-green"
                >
                  Add Friend
                </Button>
              </div>

              <FriendsTab />
            </div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-side-background rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Profile
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
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

              <ProfileEdit
                onSave={() => setIsEditing(false)}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}

        {/* Add User Modal */}
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Profile;
