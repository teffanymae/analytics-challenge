import type { SupabaseClient } from "@supabase/supabase-js";
import { aggregateByDate, fillMissingDates, calculateTotals } from "@/lib/aggregation";
import { calculateChange } from "@/lib/utils/engagement";
import { calculateComparisonPeriods } from "@/lib/utils/date-range";
import { formatDate } from "@/lib/utils/date";
import type { DailyEngagement } from "@/lib/aggregation";

export interface EngagementQueryParams {
  days?: number;
  platform?: string;
  userId: string;
}

export interface EngagementSummary {
  likes: { current: number; previous: number; change: number };
  comments: { current: number; previous: number; change: number };
  shares: { current: number; previous: number; change: number };
  saves: { current: number; previous: number; change: number };
  total: { current: number; previous: number; change: number };
}

export interface EngagementResponse {
  current: DailyEngagement[];
  previous: DailyEngagement[];
  summary: EngagementSummary;
}

export async function fetchEngagementData(
  supabase: SupabaseClient,
  params: EngagementQueryParams
): Promise<EngagementResponse> {
  const { days = 30, userId } = params;

  const { current, previous } = calculateComparisonPeriods(days);
  const { startDate: currentStartDate, endDate: currentEndDate } = current;
  const { startDate: previousStartDate, endDate: previousEndDate } = previous;

  const [currentResult, previousResult] = await Promise.all([
    supabase
      .from("posts")
      .select("posted_at, likes, comments, shares, saves")
      .eq("user_id", userId)
      .gte("posted_at", formatDate(currentStartDate))
      .lte("posted_at", formatDate(currentEndDate)),
    supabase
      .from("posts")
      .select("posted_at, likes, comments, shares, saves")
      .eq("user_id", userId)
      .gte("posted_at", formatDate(previousStartDate))
      .lte("posted_at", formatDate(previousEndDate)),
  ]);

  if (currentResult.error || previousResult.error) {
    throw new Error("Unable to retrieve engagement data. Please try again.");
  }

  const currentMap = aggregateByDate(currentResult.data || []);
  const previousMap = aggregateByDate(previousResult.data || []);

  const currentData = fillMissingDates(
    currentStartDate,
    currentEndDate,
    currentMap
  );
  const previousData = fillMissingDates(
    previousStartDate,
    previousEndDate,
    previousMap
  );

  const currentTotals = calculateTotals(currentData);
  const previousTotals = calculateTotals(previousData);

  return {
    current: currentData,
    previous: previousData,
    summary: {
      likes: {
        current: currentTotals.likes,
        previous: previousTotals.likes,
        change: calculateChange(currentTotals.likes, previousTotals.likes),
      },
      comments: {
        current: currentTotals.comments,
        previous: previousTotals.comments,
        change: calculateChange(
          currentTotals.comments,
          previousTotals.comments
        ),
      },
      shares: {
        current: currentTotals.shares,
        previous: previousTotals.shares,
        change: calculateChange(currentTotals.shares, previousTotals.shares),
      },
      saves: {
        current: currentTotals.saves,
        previous: previousTotals.saves,
        change: calculateChange(currentTotals.saves, previousTotals.saves),
      },
      total: {
        current: currentTotals.total,
        previous: previousTotals.total,
        change: calculateChange(currentTotals.total, previousTotals.total),
      },
    },
  };
}
