import dayjs from "dayjs";
import dayjsDayOfYear from "dayjs/plugin/dayOfYear";
import isLeapYear from "dayjs/plugin/isLeapYear";

dayjs.extend(dayjsDayOfYear);
dayjs.extend(isLeapYear);

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface ComparisonPeriods {
  current: DateRange;
  previous: DateRange;
}

export function calculateDateRange(days: number): DateRange {
  const endDate = dayjs().toDate();
  const startDate = dayjs().subtract(days, 'day').toDate();

  return { startDate, endDate };
}

export function calculateComparisonPeriods(days: number): ComparisonPeriods {
  const current = calculateDateRange(days);
  
  const previousEndDate = dayjs(current.startDate).subtract(1, 'day').toDate();
  const previousStartDate = dayjs(previousEndDate).subtract(days, 'day').toDate();

  return {
    current,
    previous: {
      startDate: previousStartDate,
      endDate: previousEndDate,
    },
  };
}
