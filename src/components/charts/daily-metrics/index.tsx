"use client";

import { useState } from "react";
import { useDailyMetrics } from "@/lib/hooks/use-daily-metrics";
import { useUIStore } from "@/lib/stores/ui-store";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParentSize } from "@visx/responsive";
import { ChartLoading } from "../chart-loading";
import { MetricsSummaryCards } from "./summary-cards";
import { DailyMetricsVisxChart } from "./visx-chart";
import { MetricsLegendToggle } from "./legend-toggle";

type MetricView = "both" | "engagement" | "reach";

interface ChartData {
  date: Date;
  engagement: number;
  reach: number;
}

export function DailyMetricsChart({ days }: { days: number }) {
  const chartType = useUIStore((state) => state.dailyMetricsChartType);
  const setChartType = useUIStore((state) => state.setDailyMetricsChartType);
  const [showEngagement, setShowEngagement] = useState(true);
  const [showReach, setShowReach] = useState(true);

  const metricView: MetricView = 
    showEngagement && showReach ? "both" :
    showEngagement ? "engagement" :
    showReach ? "reach" : "both";

  const { data, isLoading, error } = useDailyMetrics(days);

  if (isLoading) {
    return <ChartLoading />;
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          Failed to load daily metrics
        </div>
      </Card>
    );
  }

  if (!data || !data.metrics.length) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">No metrics available</div>
      </Card>
    );
  }

  const chartData: ChartData[] = data.metrics.map((m) => ({
    date: new Date(m.date),
    engagement: m.engagement,
    reach: m.reach,
  }));

  const totalEngagement = data.metrics.reduce(
    (sum, m) => sum + m.engagement,
    0
  );
  const totalReach = data.metrics.reduce((sum, m) => sum + m.reach, 0);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Metrics</h2>
            <p className="text-sm text-gray-500 mt-1">
              Track your engagement and reach over time
            </p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Chart Type:
            </label>
            <Select
              value={chartType}
              onValueChange={(value) => setChartType(value as "line" | "area")}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="area">Area</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <MetricsSummaryCards
          totalEngagement={totalEngagement}
          totalReach={totalReach}
        />

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700">
              Showing {data.period.days} days
            </span>
          </div>
          <ParentSize>
            {({ width }) => (
              <DailyMetricsVisxChart
                data={chartData}
                width={width}
                height={320}
                chartType={chartType}
                metricView={metricView}
              />
            )}
          </ParentSize>
          <MetricsLegendToggle
            showEngagement={showEngagement}
            showReach={showReach}
            onToggleEngagement={() => setShowEngagement(!showEngagement)}
            onToggleReach={() => setShowReach(!showReach)}
          />
        </div>
      </div>
    </Card>
  );
}
