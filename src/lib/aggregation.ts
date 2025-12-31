import type { Tables } from "@/lib/database/database.types";
import { formatDate } from "./utils/date";

export interface DailyEngagement {
  date: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  total: number;
}

export type PostMetrics = Pick<
  Tables<"posts">,
  "posted_at" | "likes" | "comments" | "shares" | "saves"
>;

export function aggregateByDate(
  posts: PostMetrics[]
): Map<string, DailyEngagement> {
  const map = new Map<string, DailyEngagement>();

  posts.forEach((post) => {
    const date = formatDate(new Date(post.posted_at));
    const existing = map.get(date) || createEmptyDailyEngagement(date);

    const likes = post.likes || 0;
    const comments = post.comments || 0;
    const shares = post.shares || 0;
    const saves = post.saves || 0;

    map.set(date, {
      date,
      likes: existing.likes + likes,
      comments: existing.comments + comments,
      shares: existing.shares + shares,
      saves: existing.saves + saves,
      total: existing.total + likes + comments + shares + saves,
    });
  });

  return map;
}

function createEmptyDailyEngagement(date: string): DailyEngagement {
  return {
    date,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    total: 0,
  };
}

export function fillMissingDates(
  startDate: Date,
  endDate: Date,
  dataMap: Map<string, DailyEngagement>
): DailyEngagement[] {
  const result: DailyEngagement[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const dateStr = formatDate(current);
    result.push(dataMap.get(dateStr) || createEmptyDailyEngagement(dateStr));
    current.setDate(current.getDate() + 1);
  }

  return result;
}

export function calculateTotals(data: DailyEngagement[]) {
  return data.reduce(
    (acc, day) => ({
      likes: acc.likes + day.likes,
      comments: acc.comments + day.comments,
      shares: acc.shares + day.shares,
      saves: acc.saves + day.saves,
      total: acc.total + day.total,
    }),
    { likes: 0, comments: 0, shares: 0, saves: 0, total: 0 }
  );
}
