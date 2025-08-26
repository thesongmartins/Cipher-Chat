export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
  status: "accepted" | "pending";
}
