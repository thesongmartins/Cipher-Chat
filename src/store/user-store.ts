import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserProfile, Friend } from "../types/userProfile";

type UserState = {
  currentUser: UserProfile | null;
  friends: Friend[];
  pendingRequests: Friend[];
  setCurrentUser: (user: UserProfile) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;
  addPendingRequest: (request: Friend) => void;
  removePendingRequest: (requestId: string) => void;
  acceptFriendRequest: (requestId: string) => void;
  declineFriendRequest: (requestId: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        friends: [
          {
            id: "1",
            name: "Song Martins",
            avatarUrl: undefined,
            status: "accepted",
          },
          {
            id: "2",
            name: "Joy Marcus",
            avatarUrl: undefined,
            status: "accepted",
          },
        ],
        pendingRequests: [
          {
            id: "3",
            name: "Frances Ejiro",
            avatarUrl: undefined,
            status: "pending",
          },
        ],

        setCurrentUser: (user) => set({ currentUser: user }),

        addFriend: (friend) =>
          set((state) => ({
            friends: [...state.friends, friend],
          })),

        removeFriend: (friendId) =>
          set((state) => ({
            friends: state.friends.filter((f) => f.id !== friendId),
          })),

        addPendingRequest: (request) =>
          set((state) => ({
            pendingRequests: [...state.pendingRequests, request],
          })),

        removePendingRequest: (requestId) =>
          set((state) => ({
            pendingRequests: state.pendingRequests.filter(
              (r) => r.id !== requestId
            ),
          })),

        acceptFriendRequest: (requestId) =>
          set((state) => {
            const request = state.pendingRequests.find(
              (r) => r.id === requestId
            );
            if (!request) return state;

            const newFriend: Friend = {
              ...request,
              status: "accepted",
            };

            return {
              friends: [...state.friends, newFriend],
              pendingRequests: state.pendingRequests.filter(
                (r) => r.id !== requestId
              ),
            };
          }),

        declineFriendRequest: (requestId) =>
          set((state) => ({
            pendingRequests: state.pendingRequests.filter(
              (r) => r.id !== requestId
            ),
          })),

        updateProfile: (updates) =>
          set((state) => ({
            currentUser: state.currentUser
              ? { ...state.currentUser, ...updates }
              : null,
          })),
      }),
      { name: "user-profile-storage" }
    )
  )
);
