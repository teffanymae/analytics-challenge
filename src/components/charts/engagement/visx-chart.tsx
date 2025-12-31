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

interface ChartData {
  date: Date;
  value: number;
  period: "current" | "previous";
}

interface VisxChartProps {
  data: ChartData[];
  width: number;
  height: number;
  chartType: "line" | "area";
  metric: string;
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

export function VisxChart({ data, width, height, chartType, metric }: VisxChartProps) {
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

  const currentData = data.filter((d) => d.period === "current");
  const previousData = data.filter((d) => d.period === "previous");

  const xScale = scaleTime({
    domain: [
      Math.min(...data.map((d) => d.date.getTime())),
      Math.max(...data.map((d) => d.date.getTime())),
    ],
    range: [0, innerWidth],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.value)) * 1.1],
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

    const d =
      d1 && x0.valueOf() - d0.date.valueOf() > d1.date.valueOf() - x0.valueOf()
        ? d1
        : d0;

    showTooltip({
      tooltipData: d,
      tooltipLeft: xScale(d.date),
      tooltipTop: yScale(d.value),
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
              <AreaClosed
                data={previousData}
                x={(d: ChartData) => xScale(d.date)}
                y={(d: ChartData) => yScale(d.value)}
                yScale={yScale}
                strokeWidth={2}
                stroke="#9ca3af"
                fill="url(#area-gradient-previous)"
                curve={curveMonotoneX}
              />
              <AreaClosed
                data={currentData}
                x={(d: ChartData) => xScale(d.date)}
                y={(d: ChartData) => yScale(d.value)}
                yScale={yScale}
                strokeWidth={2}
                stroke={CHART_COLORS.engagement.stroke}
                fill="url(#area-gradient)"
                curve={curveMonotoneX}
              />
            </>
          ) : (
            <>
              <LinePath
                data={previousData}
                x={(d: ChartData) => xScale(d.date)}
                y={(d: ChartData) => yScale(d.value)}
                stroke="#9ca3af"
                strokeWidth={2}
                strokeDasharray="4,4"
                curve={curveMonotoneX}
              />
              <LinePath
                data={currentData}
                x={(d: ChartData) => xScale(d.date)}
                y={(d: ChartData) => yScale(d.value)}
                stroke={CHART_COLORS.engagement.stroke}
                strokeWidth={2}
                curve={curveMonotoneX}
              />
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
            <circle
              cx={xScale(tooltipData.date)}
              cy={yScale(tooltipData.value)}
              r={4}
              fill={CHART_COLORS.engagement.fill}
              stroke="white"
              strokeWidth={2}
            />
          )}
        </Group>

        <defs>
          <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
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
          <linearGradient
            id="area-gradient-previous"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#9ca3af" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#9ca3af" stopOpacity={0} />
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
            <strong>
              {formatShortDate(tooltipData.date.toLocaleString())}
            </strong>
          </div>
          <div>
            {metric}: {tooltipData.value.toLocaleString()}
          </div>
        </TooltipWithBounds>
      )}
    </div>
  );
}
