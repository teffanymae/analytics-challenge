import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

export type MetricType = "likes" | "comments" | "shares" | "saves";

export const METRIC_CONFIG = {
  likes: {
    title: "Likes",
    icon: Heart,
    iconColor: "text-red-500",
  },
  comments: {
    title: "Comments",
    icon: MessageCircle,
    iconColor: "text-blue-500",
  },
  shares: {
    title: "Shares",
    icon: Share2,
    iconColor: "text-green-500",
  },
  saves: {
    title: "Saves",
    icon: Bookmark,
    iconColor: "text-purple-500",
  },
} as const;
