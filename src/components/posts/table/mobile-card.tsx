import { Tables } from "@/lib/database/database.types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import Image from "next/image";

dayjs.extend(relativeTime);

interface MobilePostCardProps {
  post: Tables<"posts">;
  onClick: () => void;
}

export function MobilePostCard({ post, onClick }: MobilePostCardProps) {
  const formatNumber = (num: number | null) => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div
      onClick={onClick}
      className="flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
    >
      <div className="flex-shrink-0">
        {post.thumbnail_url ? (
          <Image
            src={post.thumbnail_url}
            alt={post.caption || "Post thumbnail"}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-sm font-medium text-gray-900 line-clamp-2">
            {post.caption || "No caption"}
          </p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-gray-900 text-white capitalize`}
          >
            {post.platform}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-xs text-gray-600">
              {formatNumber(post.likes)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-600">
              {formatNumber(post.comments)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-600">
              {formatNumber(post.shares)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-600">
              {formatNumber(post.saves)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{dayjs(post.posted_at).fromNow()}</span>
          <span>{post.engagement_rate?.toFixed(1)}% engagement</span>
        </div>
      </div>
    </div>
  );
}
