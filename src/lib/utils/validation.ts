export function sanitizePageParams(
  page: number,
  pageSize: number,
  maxPageSize = 100
): { page: number; pageSize: number } {
  return {
    page: Math.max(1, Math.floor(page)),
    pageSize: Math.min(Math.max(1, Math.floor(pageSize)), maxPageSize),
  };
}
