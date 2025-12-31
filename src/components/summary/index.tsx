"use client";

import { useSummary } from "@/lib/hooks/use-summary";
import { MetricCard } from "./metric-card";
import { TopPostCard } from "./top-post-card";
import { SummaryLoading } from "./summary-loading";
import { HeartIcon, ChartBarIcon } from "../../lib/constants/icons";

export function SummaryCards({ days }: { days: number }) {
  const { data, isLoading } = useSummary(days);

  if (isLoading) {
    return <SummaryLoading />;
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Total Engagement"
        value={data.totalEngagement.toLocaleString()}
        subtitle="Likes + Comments + Shares + Saves"
        trend={data.trends.engagementChange}
        icon={<HeartIcon />}
        days={days}
      />

      <MetricCard
        title="Average Engagement Rate"
        value={`${data.avgEngagementRate.toFixed(2)}%`}
        subtitle="Across all posts"
        trend={data.trends.engagementRateChange}
        icon={<ChartBarIcon />}
        days={days}
      />

      <TopPostCard post={data.topPost} />
    </div>
  );
}
