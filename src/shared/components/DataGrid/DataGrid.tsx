import React, { useMemo, useState } from "react";

import {
  Button,
  DataGrid as FluentDataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Input,
  Select,
  createTableColumn,
} from "@fluentui/react-components";

import type { TableColumnDefinition } from "@fluentui/react-components";

import type { DataGridProps } from "./DataGrid.types";

import {
  filterGridData,
  sortGridData,
  type SortConfig,
} from "./DataGrid.helpers";

const DataGrid = <T,>({
  data,
  columns,
  getRowId,
  searchPlaceholder = "Search...",
  emptyMessage = "No records found.",
showControls = true,
}: DataGridProps<T>) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const filteredData = useMemo(
    () => filterGridData(data, columns, search, filters),
    [data, columns, search, filters]
  );

  const sortedData = useMemo(
    () => sortGridData(filteredData, columns, sortConfig),
    [filteredData, columns, sortConfig]
  );

  const fluentColumns = useMemo(
    () =>
      columns.map((column) =>
        createTableColumn<T>({
          columnId: column.key,

          renderHeaderCell: () => (
            <Button
              appearance="subtle"
              size="small"
              disabled={column.sortable === false}
              onClick={() => {
                setSortConfig((previous) => ({
                  key: column.key,
                  direction:
                    previous?.key === column.key &&
                    previous.direction === "ascending"
                      ? "descending"
                      : "ascending",
                }));
              }}
            >
              {column.header}
              {sortConfig?.key === column.key
                ? sortConfig.direction === "ascending"
                  ? " ↑"
                  : " ↓"
                : ""}
            </Button>
          ),

          renderCell: (row: T) =>
            column.renderCell
              ? column.renderCell(row)
              : String(column.accessor(row) ?? "—"),

          compare: (a: T, b: T) => {
            const first = column.accessor(a);
            const second = column.accessor(b);

            if (first == null) return second == null ? 0 : -1;
            if (second == null) return 1;

            if (typeof first === "number" && typeof second === "number") {
              return first - second;
            }

            return String(first).localeCompare(String(second), undefined, {
              numeric: true,
              sensitivity: "base",
            });
          },
        })
      ),
    [columns, sortConfig]
  ) as TableColumnDefinition<T>[];

  const clearFilters = () => {
    setSearch("");
    setFilters({});
    setSortConfig(null);
  };

  return (
    <div>
      {/* Search */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <Input
          value={search}
          placeholder={searchPlaceholder}
          aria-label="Search records"
          onChange={(_, value) => setSearch(value.value)}
        />

        {/* Dynamic column filters */}
        {columns
          .filter(
            (column) =>
              column.filterOptions && column.filterOptions.length > 0
          )
          .map((column) => (
            <Select
              key={column.key}
              value={filters[column.key] ?? ""}
              aria-label={`Filter by ${column.header}`}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  [column.key]: event.target.value,
                }))
              }
            >
              <option value="">All {column.header}</option>

              {column.filterOptions!.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          ))}

        <Button appearance="secondary" onClick={clearFilters}>
          Clear
        </Button>
      </div>

      {/* Grid */}
      <FluentDataGrid
        items={sortedData}
        columns={fluentColumns}
        getRowId={(row: T) => getRowId(row)}
        sortable={false}
        resizableColumns
        style={{ minWidth: "600px" }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>
                {renderHeaderCell()}
              </DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<T>>
          {({ item, rowId }) => (
            <DataGridRow<T> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </FluentDataGrid>

      {sortedData.length === 0 && (
        <div
          role="status"
          style={{ padding: 16, textAlign: "center" }}
        >
          {emptyMessage}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        Showing {sortedData.length} of {data.length} records
      </div>
    </div>
  );
};

export default DataGrid;