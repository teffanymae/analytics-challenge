import { useQuery } from "@tanstack/react-query";
import { getUserFriendlyError } from "@/lib/utils/errors";

interface DailyMetric {
  date: string;
  engagement: number;
  reach: number;
}

interface DailyMetricsResponse {
  metrics: DailyMetric[];
  period: {
    start: string;
    end: string;
    days: number;
  };
}

export function useDailyMetrics(days: number = 30) {
  return useQuery<DailyMetricsResponse>({
    queryKey: ["daily-metrics", days],
    queryFn: async () => {
      const response = await fetch(`/api/metrics/daily?days=${days}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || getUserFriendlyError(response));
      }

      return response.json();
    },
  });
}
