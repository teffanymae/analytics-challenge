import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function formatDate(date: Date): string {
  return dayjs(date).utc().format('YYYY-MM-DD');
}

export const formatLongDate = (dateString: string): string => {
  return dayjs(dateString).format("dddd, MMMM D, YYYY");
};

export const formatTime = (dateString: string): string => {
  return dayjs(dateString).format("hh:mm A");
};

export const formatShortDate = (dateString: string): string => {
  return dayjs(dateString).format("MMM D, YYYY");
};
