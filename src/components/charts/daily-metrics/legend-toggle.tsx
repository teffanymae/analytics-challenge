import { METRIC_LEGEND_COLORS } from "@/lib/constants/colors";

interface MetricsLegendToggleProps {
  showEngagement: boolean;
  showReach: boolean;
  onToggleEngagement: () => void;
  onToggleReach: () => void;
}

export function MetricsLegendToggle({
  showEngagement,
  showReach,
  onToggleEngagement,
  onToggleReach,
}: MetricsLegendToggleProps) {
  const engagementColors = showEngagement
    ? METRIC_LEGEND_COLORS.engagement.active
    : METRIC_LEGEND_COLORS.engagement.inactive;

  const reachColors = showReach
    ? METRIC_LEGEND_COLORS.reach.active
    : METRIC_LEGEND_COLORS.reach.inactive;

  return (
    <div className="mt-4 flex items-center justify-center gap-6">
      <button
        onClick={onToggleEngagement}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer border-2"
        style={{
          backgroundColor: engagementColors.background,
          borderColor: engagementColors.border,
          opacity: showEngagement ? 1 : 0.4,
        }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: engagementColors.dot,
          }}
        ></div>
        <span
          className="text-sm font-medium"
          style={{
            color: engagementColors.text,
          }}
        >
          Engagement
        </span>
      </button>
      <button
        onClick={onToggleReach}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer border-2"
        style={{
          backgroundColor: reachColors.background,
          borderColor: reachColors.border,
          opacity: showReach ? 1 : 0.4,
        }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: reachColors.dot,
          }}
        ></div>
        <span
          className="text-sm font-medium"
          style={{
            color: reachColors.text,
          }}
        >
          Reach
        </span>
      </button>
    </div>
  );
}
