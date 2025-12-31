/**
 * Shared engagement calculation utilities
 * Can be used in both client and server contexts
 */

interface EngagementMetrics {
  likes: number | null;
  comments: number | null;
  shares: number | null;
  saves: number | null;
}

/**
 * Calculate total engagement from individual metrics
 * Handles null values by treating them as 0
 */
export const calculateEngagement = (metrics: EngagementMetrics): number => {
  return (
    (metrics.likes || 0) +
    (metrics.comments || 0) +
    (metrics.shares || 0) +
    (metrics.saves || 0)
  );
};

/**
 * Calculate percentage change between two values
 * Returns 100 if previous is 0 and current is positive
 * Returns 0 if both are 0
 */
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};
