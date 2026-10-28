import React, { useMemo } from "react";
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  createTableColumn,
  TableColumnDefinition,
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";

export interface GridColumnDef<T> {
  key: keyof T & string;
  label: string;
  renderCell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  accessor?: (item: T) => string | number;
}

interface DataTableProps<T> {
  items: T[];
  columns: GridColumnDef<T>[];
  getRowId: (item: T) => string;
  selectionMode?: "single" | "multiselect";
  emptyState?: React.ReactNode;
  showEmptyState?: boolean;
  compact?: boolean;
  onRowClick?: (item: T) => void;
  headerCellClassName?: string;
  emptyStateClassName?: string;
}

const useStyles = makeStyles({
  tableWrapper: {
    overflowX: "auto",
    width: "100%",
  },
  grid: {
    minWidth: "800px",
  },
  compactGrid: {
    width: "max-content",
    minWidth: "100%",
  },
  compactCell: {
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  compactHeaderCell: {
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    whiteSpace: "nowrap",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  compactBodyRow: {
    "&:nth-child(odd)": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
    "&:nth-child(even)": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },

  bodyRow: {
    "&:nth-child(odd)": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
    "&:nth-child(even)": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  emptyState: {
    padding: tokens.spacingVerticalXXL,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: tokens.colorNeutralForeground3,
  },
  cellContent: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    display: "block",
  },
});

export const ModalTable = <T extends Record<string, any>>({
  items,
  columns,
  getRowId,
  selectionMode,
  emptyState,
  showEmptyState = true,
  compact = false,
  onRowClick,
  headerCellClassName,
  emptyStateClassName,
}: DataTableProps<T>) => {
  const styles = useStyles();
  const compactColumnSizingOptions = useMemo(
    () =>
      Object.fromEntries(
        columns.map(({ key, label }) => {
          const width = Math.max(120, label.length * 8 + 40);
          return [
            key,
            {
              defaultWidth: width,
              idealWidth: width,
              minWidth: width,
              padding: 8,
            },
          ];
        }),
      ),
    [columns],
  );
  const compactTableWidth = compact
    ? columns.reduce(
      (total, { label }) => total + Math.max(120, label.length * 8 + 40),
      0,
    )
    : undefined;

  const fluentColumns: TableColumnDefinition<T>[] = useMemo(
    () =>
      columns.map((col) =>
        createTableColumn<T>({
          columnId: col.key,
          compare:
            col.sortable !== false
              ? (a, b) => {
                const valA = col.accessor ? col.accessor(a) : a[col.key];
                const valB = col.accessor ? col.accessor(b) : b[col.key];
                if (valA == null) return -1;
                if (valB == null) return 1;
                return valA > valB ? 1 : valA < valB ? -1 : 0;
              }
              : undefined,
          renderHeaderCell: () => col.label,
          renderCell: (item) => {
            const content = col.renderCell
              ? col.renderCell(item)
              : String(item[col.key] ?? "");
            return (
              <span
                className={styles.cellContent}
                title={String(item[col.key] ?? "")}
              >
                {content}
              </span>
            );
          },
        }),
      ),
    [columns, styles.cellContent],
  );

  return (
    <>
      <div className={styles.tableWrapper}>
        <DataGrid
          className={`${styles.grid} ${compact ? styles.compactGrid : ""}`}
          items={items}
          columns={fluentColumns}
          sortable
          selectionMode={selectionMode}
          getRowId={getRowId}
          focusMode="composite"
          columnSizingOptions={
            compact ? compactColumnSizingOptions : undefined
          }
          style={
            compactTableWidth
              ? {
                width: `${compactTableWidth}px`,
                minWidth: `${compactTableWidth}px`,
              }
              : undefined
          }
        >
          <DataGridHeader>
            <DataGridRow
              selectionCell={
                selectionMode === "multiselect"
                  ? { checkboxIndicator: { "aria-label": "Select all rows" } }
                  : undefined
              }
            >
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell
                  className={`${compact ? styles.compactHeaderCell : ""} ${headerCellClassName ?? ""
                    }`}
                >
                  <Text weight="semibold" wrap={!compact}>
                    {renderHeaderCell()}
                  </Text>
                </DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>

          <DataGridBody<T>>
            {({ item, rowId }) => (
              <DataGridRow<T>
                key={rowId}
                className={`${styles.bodyRow} ${compact ? styles.compactBodyRow : ""
                  }`}
                onClick={() => onRowClick?.(item)}
                selectionCell={
                  selectionMode
                    ? { checkboxIndicator: { "aria-label": "Select row" } }
                    : undefined
                }
              >
                {({ renderCell }) => (
                  <DataGridCell className={compact ? styles.compactCell : ""}>
                    {renderCell(item)}
                  </DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
      {showEmptyState && items.length === 0 && (
        <div className={`${styles.emptyState} ${emptyStateClassName ?? ""}`}>
          {emptyState || <Text>No records match your search criteria.</Text>}
        </div>
      )}
    </>
  );
};