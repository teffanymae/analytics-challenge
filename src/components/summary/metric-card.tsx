"use client";

import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { TREND_COLORS } from "@/lib/constants/colors";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
  days?: number;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  days,
}: MetricCardProps) {
  const getTrendStyle = () => {
    if (!trend) return TREND_COLORS.neutral;
    if (trend > 0) return TREND_COLORS.positive;
    return TREND_COLORS.negative;
  };

  const trendStyle = getTrendStyle();
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      {trend !== undefined && trend !== 0 && (
        <div className="flex items-center gap-1 mt-4">
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full"
            style={{
              backgroundColor: trendStyle.background,
              color: trendStyle.text,
            }}
          >
            {isPositive ? (
              <ArrowUpIcon className="w-4 h-4" />
            ) : isNegative ? (
              <ArrowDownIcon className="w-4 h-4" />
            ) : null}
            <span className="text-sm font-medium">
              {Math.abs(trend).toFixed(1)}%
            </span>
          </div>
          <span className="text-xs text-gray-600 ml-1">
            vs. prior {days} days
          </span>
        </div>
      )}
    </div>
  );
}
