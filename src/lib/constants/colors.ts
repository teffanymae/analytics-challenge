/**
 * Color constants for consistent styling across the application
 */

export const TREND_COLORS = {
  positive: {
    text: "#16a34a",
    background: "#f0fdf4",
  },
  negative: {
    text: "#dc2626",
    background: "#fef2f2",
  },
  neutral: {
    text: "#6b7280",
    background: "#f9fafb",
  },
} as const;

export const PLATFORM_COLORS = {
  instagram: {
    background: "bg-blue-100",
    text: "text-blue-800",
  },
  tiktok: {
    background: "bg-pink-100",
    text: "text-pink-800",
  },
} as const;

export const STATUS_COLORS = {
  success: {
    background: "bg-green-100",
    text: "text-green-800",
  },
  warning: {
    background: "bg-yellow-100",
    text: "text-yellow-800",
  },
  error: {
    background: "bg-red-100",
    text: "text-red-800",
  },
  info: {
    background: "bg-blue-100",
    text: "text-blue-800",
  },
} as const;

export const CHART_COLORS = {
  engagement: {
    stroke: "#3b82f6",
    fill: "#3b82f6",
    gradient: {
      start: { color: "#3b82f6", opacity: 0.3 },
      end: { color: "#3b82f6", opacity: 0 },
    },
  },
  reach: {
    stroke: "#10b981",
    fill: "#10b981",
    gradient: {
      start: { color: "#10b981", opacity: 0.3 },
      end: { color: "#10b981", opacity: 0 },
    },
  },
  likes: {
    stroke: "#ef4444",
    fill: "#ef4444",
  },
  comments: {
    stroke: "#3b82f6",
    fill: "#3b82f6",
  },
  shares: {
    stroke: "#10b981",
    fill: "#10b981",
  },
  saves: {
    stroke: "#8b5cf6",
    fill: "#8b5cf6",
  },
} as const;

export const METRIC_LEGEND_COLORS = {
  engagement: {
    active: {
      background: "#dbeafe",
      border: "#2563eb",
      dot: "#2563eb",
      text: "#1e3a8a",
    },
    inactive: {
      background: "#f3f4f6",
      border: "#d1d5db",
      dot: "#9ca3af",
      text: "#6b7280",
    },
  },
  reach: {
    active: {
      background: "#dcfce7",
      border: "#16a34a",
      dot: "#16a34a",
      text: "#14532d",
    },
    inactive: {
      background: "#f3f4f6",
      border: "#d1d5db",
      dot: "#9ca3af",
      text: "#6b7280",
    },
  },
} as const;
