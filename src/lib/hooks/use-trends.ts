import { useQuery } from "@tanstack/react-query";
import { getUserFriendlyError } from "@/lib/utils/errors";

interface Engagement {
  date: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  total: number;
}

interface MetricSummary {
  current: number;
  previous: number;
  change: number;
}

interface TrendsResponse {
  current: Engagement[];
  previous: Engagement[];
  summary: {
    likes: MetricSummary;
    comments: MetricSummary;
    shares: MetricSummary;
    saves: MetricSummary;
    total: MetricSummary;
  };
}

export function useTrends(days = 30, platform?: string) {
  return useQuery<TrendsResponse>({
    queryKey: ["trends", days, platform],
    queryFn: async () => {
      const response = await fetch("/api/engagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          days,
          platform,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || getUserFriendlyError(response));
      }

      return response.json();
    },
  });
}
