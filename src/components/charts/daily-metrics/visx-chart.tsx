import { AreaClosed, LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { GridRows } from "@visx/grid";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { bisector } from "d3-array";
import { formatShortDate } from "@/lib/utils/date";
import { CHART_COLORS } from "@/lib/constants/colors";

type MetricView = "both" | "engagement" | "reach";

interface ChartData {
  date: Date;
  engagement: number;
  reach: number;
}

interface DailyMetricsVisxChartProps {
  data: ChartData[];
  width: number;
  height: number;
  chartType: "line" | "area";
  metricView: MetricView;
}

const tooltipStyles = {
  ...defaultStyles,
  background: "#1f2937",
  border: "1px solid #374151",
  color: "white",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "12px",
};

const bisectDate = bisector<ChartData, Date>((d) => d.date).left;

export function DailyMetricsVisxChart({
  data,
  width,
  height,
  chartType,
  metricView,
}: DailyMetricsVisxChartProps) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<ChartData>();

  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  if (innerWidth <= 0 || innerHeight <= 0) {
    return null;
  }

  const xScale = scaleTime({
    domain: [
      Math.min(...data.map((d) => d.date.getTime())),
      Math.max(...data.map((d) => d.date.getTime())),
    ],
    range: [0, innerWidth],
  });

  const maxEngagement = Math.max(...data.map((d) => d.engagement));
  const maxReach = Math.max(...data.map((d) => d.reach));
  const maxValue = Math.max(maxEngagement, maxReach);
  const yScale = scaleLinear({
    domain: [0, maxValue * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });

  const handleTooltip = (
    event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
  ) => {
    const point = localPoint(event);
    if (!point) return;

    const x0 = xScale.invert(point.x - margin.left);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];

    if (!d0 && !d1) return;

    const d =
      d1 &&
      d0 &&
      x0.valueOf() - d0.date.valueOf() > d1.date.valueOf() - x0.valueOf()
        ? d1
        : d0;

    if (!d) return;

    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(d.date),
      tooltipTop: yScale(d.engagement),
    });
  };

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={innerWidth}
            height={innerHeight}
            stroke="#e5e7eb"
            strokeOpacity={0.5}
          />

          {chartType === "area" ? (
            <>
              {(metricView === "both" || metricView === "engagement") && (
                <AreaClosed
                  data={data}
                  x={(d: ChartData) => xScale(d.date)}
                  y={(d: ChartData) => yScale(d.engagement)}
                  yScale={yScale}
                  strokeWidth={2}
                  stroke={CHART_COLORS.engagement.stroke}
                  fill="url(#area-gradient-engagement)"
                  curve={curveMonotoneX}
                />
              )}
              {(metricView === "both" || metricView === "reach") && (
                <AreaClosed
                  data={data}
                  x={(d: ChartData) => xScale(d.date)}
                  y={(d: ChartData) => yScale(d.reach)}
                  yScale={yScale}
                  strokeWidth={2}
                  stroke={CHART_COLORS.reach.stroke}
                  fill="url(#area-gradient-reach)"
                  curve={curveMonotoneX}
                />
              )}
            </>
          ) : (
            <>
              {(metricView === "both" || metricView === "engagement") && (
                <LinePath
                  data={data}
                  x={(d: ChartData) => xScale(d.date)}
                  y={(d: ChartData) => yScale(d.engagement)}
                  stroke={CHART_COLORS.engagement.stroke}
                  strokeWidth={2}
                  curve={curveMonotoneX}
                />
              )}
              {(metricView === "both" || metricView === "reach") && (
                <LinePath
                  data={data}
                  x={(d: ChartData) => xScale(d.date)}
                  y={(d: ChartData) => yScale(d.reach)}
                  stroke={CHART_COLORS.reach.stroke}
                  strokeWidth={2}
                  curve={curveMonotoneX}
                />
              )}
            </>
          )}

          <AxisBottom
            top={innerHeight}
            scale={xScale}
            numTicks={6}
            stroke="#9ca3af"
            tickStroke="#9ca3af"
            tickLabelProps={() => ({
              fill: "#6b7280",
              fontSize: 11,
              textAnchor: "middle",
            })}
          />

          <AxisLeft
            scale={yScale}
            numTicks={5}
            stroke="#9ca3af"
            tickStroke="#9ca3af"
            tickLabelProps={() => ({
              fill: "#6b7280",
              fontSize: 11,
              textAnchor: "end",
              dx: -4,
            })}
          />

          <rect
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={hideTooltip}
          />

          {tooltipData && (
            <>
              {(metricView === "both" || metricView === "engagement") && (
                <circle
                  cx={xScale(tooltipData.date)}
                  cy={yScale(tooltipData.engagement)}
                  r={4}
                  fill={CHART_COLORS.engagement.fill}
                  stroke="white"
                  strokeWidth={2}
                />
              )}
              {(metricView === "both" || metricView === "reach") && (
                <circle
                  cx={xScale(tooltipData.date)}
                  cy={yScale(tooltipData.reach)}
                  r={4}
                  fill={CHART_COLORS.reach.fill}
                  stroke="white"
                  strokeWidth={2}
                />
              )}
            </>
          )}
        </Group>

        <defs>
          <linearGradient
            id="area-gradient-engagement"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={CHART_COLORS.engagement.gradient.start.color}
              stopOpacity={CHART_COLORS.engagement.gradient.start.opacity}
            />
            <stop
              offset="100%"
              stopColor={CHART_COLORS.engagement.gradient.end.color}
              stopOpacity={CHART_COLORS.engagement.gradient.end.opacity}
            />
          </linearGradient>
          <linearGradient id="area-gradient-reach" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={CHART_COLORS.reach.gradient.start.color}
              stopOpacity={CHART_COLORS.reach.gradient.start.opacity}
            />
            <stop
              offset="100%"
              stopColor={CHART_COLORS.reach.gradient.end.color}
              stopOpacity={CHART_COLORS.reach.gradient.end.opacity}
            />
          </linearGradient>
        </defs>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          top={(tooltipTop || 0) + margin.top}
          left={(tooltipLeft || 0) + margin.left}
          style={tooltipStyles}
        >
          <div>
            <strong>{formatShortDate(tooltipData.date.toISOString())}</strong>
          </div>
          <div>Engagement: {tooltipData.engagement.toLocaleString()}</div>
          <div>Reach: {tooltipData.reach.toLocaleString()}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
}
