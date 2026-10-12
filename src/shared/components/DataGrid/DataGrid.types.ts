import type { ReactNode } from "react";

export type DataGridFilterOption = {
  label: string;
  value: string;
};

export type DataGridColumn<T> = {
  key: string;
  header: string;
  accessor: (row: T) => unknown;
  sortable?: boolean;
  searchable?: boolean;
  filterOptions?: DataGridFilterOption[];
  renderCell?: (row: T) => ReactNode;
};

export type DataGridProps<T> = {
  data: T[];
  columns: DataGridColumn<T>[];
  getRowId: (row: T) => string | number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  showControls?: boolean;
};