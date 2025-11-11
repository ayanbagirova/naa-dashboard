export interface Post {
  id: number;
  title: string;
  type: "News" | "Announcement";
  status: "Active" | "Inactive";
  sharingTime: string;
  publishStatus: "Publish" | "Draft";
  author: string;
  image: string;
}