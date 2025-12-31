import type { SupabaseClient } from "@supabase/supabase-js";
import { calculateEngagement, calculateChange } from "@/lib/utils/engagement";
import { calculateComparisonPeriods } from "@/lib/utils/date-range";
import { formatDate } from "@/lib/utils/date";
import type { Tables } from "@/lib/database/database.types";

export interface AnalyticsQueryParams {
  days?: number;
  userId: string;
}

export type TopPerformingPost = Pick<
  Tables<"posts">,
  | "id"
  | "caption"
  | "platform"
  | "likes"
  | "comments"
  | "shares"
  | "saves"
  | "engagement_rate"
  | "posted_at"
  | "thumbnail_url"
> & {
  engagement: number;
};

export interface AnalyticsSummary {
  totalEngagement: number;
  averageEngagementRate: number;
  topPerformingPost: TopPerformingPost | null;
  trendIndicator: {
    value: number;
    isPositive: boolean;
    engagementRateChange: number;
  };
  periodDays: number;
}

export async function fetchAnalyticsSummary(
  supabase: SupabaseClient,
  params: AnalyticsQueryParams
): Promise<AnalyticsSummary> {
  const { days = 30, userId } = params;

  const { current, previous } = calculateComparisonPeriods(days);
  const { startDate: currentStartDate, endDate: currentEndDate } = current;
  const { startDate: previousStartDate, endDate: previousEndDate } = previous;

  const [currentResult, previousResult] = await Promise.all([
    supabase
      .from("posts")
      .select(
        "id, caption, platform, likes, comments, shares, saves, engagement_rate, posted_at, thumbnail_url"
      )
      .eq("user_id", userId)
      .gte("posted_at", formatDate(currentStartDate))
      .lte("posted_at", formatDate(currentEndDate)),
    supabase
      .from("posts")
      .select(
        "id, caption, platform, likes, comments, shares, saves, engagement_rate, posted_at, thumbnail_url"
      )
      .eq("user_id", userId)
      .gte("posted_at", formatDate(previousStartDate))
      .lt("posted_at", formatDate(previousEndDate)),
  ]);

  if (currentResult.error || previousResult.error) {
    throw new Error("Unable to retrieve analytics data. Please try again.");
  }

  const currentPosts = currentResult.data || [];
  const previousPosts = previousResult.data || [];

  const totalEngagement = currentPosts.reduce(
    (sum, post) => sum + calculateEngagement(post),
    0
  );
  const previousTotalEngagement = previousPosts.reduce(
    (sum, post) => sum + calculateEngagement(post),
    0
  );

  const averageEngagementRate =
    currentPosts.length > 0
      ? currentPosts.reduce(
          (sum, post) => sum + (post.engagement_rate || 0),
          0
        ) / currentPosts.length
      : 0;

  const previousAverageEngagementRate =
    previousPosts.length > 0
      ? previousPosts.reduce(
          (sum, post) => sum + (post.engagement_rate || 0),
          0
        ) / previousPosts.length
      : 0;

  let topPerformingPost = null;
  if (currentPosts.length > 0) {
    const topPost = currentPosts.reduce((max, post) => {
      const engagement = calculateEngagement(post);
      const maxEngagement = calculateEngagement(max);
      return engagement > maxEngagement ? post : max;
    });

    const engagement = calculateEngagement(topPost);
    topPerformingPost = {
      ...topPost,
      engagement,
    };
  }

  const trendChange = calculateChange(totalEngagement, previousTotalEngagement);
  const engagementRateChange = calculateChange(
    averageEngagementRate,
    previousAverageEngagementRate
  );

  return {
    totalEngagement,
    averageEngagementRate: parseFloat(averageEngagementRate.toFixed(2)),
    topPerformingPost,
    trendIndicator: {
      value: parseFloat(Math.abs(trendChange).toFixed(1)),
      isPositive: trendChange >= 0,
      engagementRateChange: parseFloat(engagementRateChange.toFixed(1)),
    },
    periodDays: days,
  };
}
