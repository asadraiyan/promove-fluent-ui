import type { DataGridColumn } from "./DataGrid.types";

export type SortDirection = "ascending" | "descending";

export type SortConfig = {
  key: string;
  direction: SortDirection;
} | null;

export function filterGridData<T>(
  data: T[],
  columns: DataGridColumn<T>[],
  search: string,
  filters: Record<string, string>
): T[] {
  const query = search.trim().toLowerCase();

  return data.filter((row) => {
    const matchesSearch =
      !query ||
      columns.some((column) => {
        if (column.searchable === false) return false;

        return String(column.accessor(row) ?? "")
          .toLowerCase()
          .includes(query);
      });

    const matchesFilters = columns.every((column) => {
      const selected = filters[column.key];

      if (!selected) return true;

      return String(column.accessor(row) ?? "") === selected;
    });

    return matchesSearch && matchesFilters;
  });
}

export function sortGridData<T>(
  data: T[],
  columns: DataGridColumn<T>[],
  sortConfig: SortConfig
): T[] {
  if (!sortConfig) return data;

  const column = columns.find(
    (item) => item.key === sortConfig.key
  );

  if (!column || column.sortable === false) return data;

  const direction = sortConfig.direction === "ascending" ? 1 : -1;

  return [...data].sort((a, b) => {
    const first = column.accessor(a);
    const second = column.accessor(b);

    if (first == null) return second == null ? 0 : 1;
    if (second == null) return -1;

    let result: number;

    if (typeof first === "number" && typeof second === "number") {
      result = first - second;
    } else if (
      first instanceof Date &&
      second instanceof Date
    ) {
      result = first.getTime() - second.getTime();
    } else {
      result = String(first).localeCompare(String(second), undefined, {
        numeric: true,
        sensitivity: "base",
      });
    }

    return result * direction;
  });
}