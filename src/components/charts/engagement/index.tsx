"use client";

import { useState } from "react";
import { useTrends } from "@/lib/hooks/use-trends";
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
import { ChartLegend } from "./legend-toggle";
import { VisxChart } from "./visx-chart";
import { EngagementMetricCard } from "./metric-card";
import { MetricType, METRIC_CONFIG } from "@/lib/constants/metrics";
import dayjs from "dayjs";

interface ChartData {
  date: Date;
  value: number;
  period: "current" | "previous";
}

export function EngagementChart({ days }: { days: number }) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("likes");
  const chartType = useUIStore((state) => state.engagementChartType);
  const setChartType = useUIStore((state) => state.setEngagementChartType);

  const { data, isLoading, error } = useTrends(days);

  if (isLoading) {
    return <ChartLoading />;
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          Failed to load engagement data
        </div>
      </Card>
    );
  }

  if (!data) return null;

  const metricData = {
    likes: data.summary.likes,
    comments: data.summary.comments,
    shares: data.summary.shares,
    saves: data.summary.saves,
  };

  const chartData: ChartData[] = [
    ...data.previous.map((d) => ({
      date: dayjs(d.date).toDate(),
      value: d[selectedMetric],
      period: "previous" as const,
    })),
    ...data.current.map((d) => ({
      date: dayjs(d.date).toDate(),
      value: d[selectedMetric],
      period: "current" as const,
    })),
  ];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Engagement</h2>
            <p className="text-sm text-gray-500 mt-1">
              Learn how your Page is performing.
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

        <div className="flex flex-col lg:flex-row gap-4">
          {(Object.keys(METRIC_CONFIG) as MetricType[]).map((metric) => {
            const Icon = METRIC_CONFIG[metric].icon;
            return (
              <div key={metric} className="flex-1">
                <EngagementMetricCard
                  title={METRIC_CONFIG[metric].title}
                  icon={<Icon className={`w-5 h-5 ${METRIC_CONFIG[metric].iconColor}`} />}
                  current={metricData[metric].current}
                  change={metricData[metric].change}
                  isSelected={selectedMetric === metric}
                  onClick={() => setSelectedMetric(metric)}
                />
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <ChartLegend />
          <ParentSize>
            {({ width }) => (
              <VisxChart
                data={chartData}
                width={width}
                height={400}
                chartType={chartType}
                metric={METRIC_CONFIG[selectedMetric].title}
              />
            )}
          </ParentSize>
        </div>
      </div>
    </Card>
  );
}
