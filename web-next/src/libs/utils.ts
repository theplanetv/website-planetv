export function GetTotalPage(count: number, limit: number): number {
  if (limit <= 0) {
    throw new Error("Limit must be greater than 0");
  }

  return count === 0 ? 1 : Math.ceil(count / limit);
}