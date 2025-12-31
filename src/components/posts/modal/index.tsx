"use client";

import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ExternalLinkIcon,
  CalendarIcon,
  EyeIcon,
  HeartIcon,
  MessageCircleIcon,
  Share2Icon,
  BookmarkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePost } from "@/lib/hooks/use-posts";
import Image from "next/image";
import { formatLongDate, formatTime } from "@/lib/utils/date";
import { calculateEngagement } from "@/lib/utils/engagement";

const MetricCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-gray-50 rounded-lg p-4"
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </motion.div>
);

const PerformanceCard = ({
  icon: Icon,
  label,
  value,
  gradient,
  textColor,
}: {
  icon?: React.ElementType;
  label: string;
  value: string | number;
  gradient: string;
  textColor: string;
}) => (
  <div className={`${gradient} rounded-lg p-4`}>
    <div className="flex items-center gap-2 mb-2">
      {Icon && <Icon className={`w-4 h-4 ${textColor}`} />}
      <span className={`text-sm ${textColor}`}>{label}</span>
    </div>
    <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
  </div>
);

const LoadingState = () => (
  <>
    <DialogHeader>
      <DialogTitle>Loading...</DialogTitle>
    </DialogHeader>
    <div className="p-8 text-center">
      <p className="text-gray-500">Loading post details...</p>
    </div>
  </>
);

const ErrorState = () => (
  <>
    <DialogHeader>
      <DialogTitle>Error</DialogTitle>
    </DialogHeader>
    <div className="p-8 text-center">
      <p className="text-red-500">Post not found</p>
    </div>
  </>
);

export function PostDetailModal({
  postId,
  open,
  onOpenChange,
}: {
  postId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: post, isLoading } = usePost(postId || "");

  if (!postId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <LoadingState />
        ) : !post ? (
          <ErrorState />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                    {post.platform}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 capitalize">
                    {post.media_type}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(post.permalink || "", "_blank")}
                  className="gap-2"
                >
                  View on{" "}
                  {post.platform === "instagram" ? "Instagram" : "TikTok"}
                  <ExternalLinkIcon className="w-4 h-4" />
                </Button>
              </div>
              <DialogTitle className="text-2xl mt-4">Post Details</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-gray-600">
                <CalendarIcon className="w-4 h-4" />
                {formatLongDate(post.posted_at)} at {formatTime(post.posted_at)}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {post.thumbnail_url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="relative w-full aspect-square max-h-96 rounded-lg overflow-hidden bg-gray-100"
                >
                  <Image
                    src={post.thumbnail_url}
                    alt={post.caption || "Post thumbnail"}
                    className="w-full h-full object-cover"
                    fill
                  />
                </motion.div>
              )}

              {post.caption && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Caption
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {post.caption}
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Engagement Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetricCard
                    icon={HeartIcon}
                    label="Likes"
                    value={post.likes?.toLocaleString() || "0"}
                    color="text-red-500"
                  />
                  <MetricCard
                    icon={MessageCircleIcon}
                    label="Comments"
                    value={post.comments?.toLocaleString() || "0"}
                    color="text-blue-500"
                  />
                  <MetricCard
                    icon={Share2Icon}
                    label="Shares"
                    value={post.shares?.toLocaleString() || "0"}
                    color="text-green-500"
                  />
                  <MetricCard
                    icon={BookmarkIcon}
                    label="Saves"
                    value={post.saves?.toLocaleString() || "0"}
                    color="text-purple-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <PerformanceCard
                    icon={EyeIcon}
                    label="Reach"
                    value={post.reach?.toLocaleString() || "0"}
                    gradient="bg-gradient-to-br from-blue-50 to-blue-100"
                    textColor="text-blue-900"
                  />
                  <PerformanceCard
                    icon={EyeIcon}
                    label="Impressions"
                    value={post.impressions?.toLocaleString() || "0"}
                    gradient="bg-gradient-to-br from-purple-50 to-purple-100"
                    textColor="text-purple-900"
                  />
                  <div className="md:col-span-1 col-span-2">
                    <PerformanceCard
                      label="Engagement Rate"
                      value={`${post.engagement_rate?.toFixed(2) || "0.00"}%`}
                      gradient="bg-gradient-to-br from-green-50 to-green-100"
                      textColor="text-green-900"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="pt-4 border-t"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Engagement</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {calculateEngagement(post).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Posted</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatLongDate(post.posted_at)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
