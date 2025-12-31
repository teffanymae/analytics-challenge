import type { SupabaseClient } from "@supabase/supabase-js";
import { calculateDateRange } from "@/lib/utils/date-range";
import { formatDate } from "@/lib/utils/date";
import type { Tables } from "@/lib/database/database.types";

export interface MetricsQueryParams {
  days?: number;
  userId: string;
}

export type DailyMetric = Pick<
  Tables<"daily_metrics">,
  "date" | "engagement" | "reach"
>;

export interface MetricsResponse {
  metrics: DailyMetric[];
  period: {
    start: string;
    end: string;
    days: number;
  };
}

export async function fetchDailyMetrics(
  supabase: SupabaseClient,
  params: MetricsQueryParams
): Promise<MetricsResponse> {
  const { days = 30, userId } = params;
 
  const { startDate, endDate } = calculateDateRange(days);

  const { data, error } = await supabase
    .from("daily_metrics")
    .select("date, engagement, reach")
    .eq("user_id", userId)
    .gte("date", formatDate(startDate))
    .lte("date", formatDate(endDate))
    .order("date", { ascending: true });

  if (error) {
    throw new Error("Unable to retrieve daily metrics. Please try again.");
  }

  return {
    metrics: data || [],
    period: { start: formatDate(startDate), end: formatDate(endDate), days },
  };
}
