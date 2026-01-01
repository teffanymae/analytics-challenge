"use client";

import { useState } from "react";
import { TrendingUpIcon } from "lucide-react";
import Image from "next/image";
import { formatShortDate } from "@/lib/utils/date";
import { PostDetailModal } from "@/components/posts/modal";
import type { TopPerformingPost } from "@/lib/services/summary.service";

interface TopPostCardProps {
  post: TopPerformingPost | null;
}

export function TopPostCard({ post }: TopPostCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!post) {
    return (
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-600">Top Performing Post</p>
        <p className="text-gray-400 mt-4">No posts available</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-gray-600">
            Top Performing Post
          </p>
          <TrendingUpIcon className="w-5 h-5 text-blue-500" />
        </div>

        <div className="flex gap-3">
          {post.thumbnail_url && (
            <Image
              src={post.thumbnail_url}
              alt="Top post"
              className="object-cover rounded"
              width={64}
              height={64}
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                {post.platform}
              </span>
              <span className="text-xs text-gray-500">
                {formatShortDate(post.posted_at)}
              </span>
            </div>
            {post.caption && (
              <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                {post.caption}
              </p>
            )}
            <div className="flex flex-wrap gap-3 text-xs text-gray-600">
              <span>❤️ {post.likes?.toLocaleString()}</span>
              <span>💬 {post.comments?.toLocaleString()}</span>
              <span>🔄 {post.shares?.toLocaleString()}</span>
              <span>🔖 {post.saves?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Engagement</span>
            <span className="text-lg font-bold text-gray-900">
              {post.engagement.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-600">Engagement Rate</span>
            <span className="text-lg font-bold text-blue-600">
              {post.engagement_rate?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <PostDetailModal
        postId={post.id}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
