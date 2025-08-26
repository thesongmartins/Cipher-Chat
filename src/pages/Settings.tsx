import { useState } from "react";
import { Button } from "../components/ui/button";
import { useUserStore } from "../store/user-store";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { currentUser } = useUserStore();

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Here we would implement actual dark mode logic
    document.documentElement.classList.toggle("dark");
  };

  const handleDeleteAccount = () => {
    // Here we would implement actual account deletion logic
    console.log("Account deletion requested");
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className=" rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Account Settings */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Account Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentUser?.email}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="bg-active-green">
                  Change
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last changed 30 days ago
                  </p>
                </div>
                <Button variant="outline" size="sm" className="bg-active-green">
                  Change
                </Button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Preferences
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Light | Dark Mode
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle between light and dark themes
                </p>
              </div>
              <button
                onClick={handleDarkModeToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDarkMode ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">
              Danger Zone
            </h2>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="ml-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-side-background flex items-center justify-center z-50">
            <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                  <svg
                    className="h-6 w-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-active-green"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
