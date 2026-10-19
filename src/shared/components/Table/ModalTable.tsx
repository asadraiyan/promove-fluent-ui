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

interface ModalTableProps<T> {
  items: T[];
  columns: GridColumnDef<T>[];
  getRowId: (item: T) => string;
  selectionMode?: "single" | "multiselect";
  emptyState?: React.ReactNode;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow2,
  },
  tableWrapper: {
    overflowX: "auto",
    width: "100%",
    maxHeight: "400px",
  },
  grid: {
    minWidth: "100%",
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
    display: "block",
  },
});

export const ModalTable = <T extends Record<string, any>>({
  items,
  columns,
  getRowId,
  selectionMode,
  emptyState,
}: ModalTableProps<T>) => {
  const styles = useStyles();

  const fluentColumns: TableColumnDefinition<T>[] = useMemo(() => {
    return columns.map((col) =>
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
    );
  }, [columns, styles.cellContent]);

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <DataGrid
          className={styles.grid}
          items={items} 
          columns={fluentColumns}
          sortable
          selectionMode={selectionMode}
          getRowId={getRowId}
          focusMode="composite"
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
                <DataGridHeaderCell>
                  <Text weight="semibold">{renderHeaderCell()}</Text>
                </DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>

          <DataGridBody<T>>
            {({ item, rowId }) => (
              <DataGridRow<T>
                key={rowId}
                selectionCell={
                  selectionMode
                    ? { checkboxIndicator: { "aria-label": "Select row" } }
                    : undefined
                }
              >
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
      {items.length === 0 && (
        <div className={styles.emptyState}>
          {emptyState || <Text>No records available.</Text>}
        </div>
      )}
    </div>
  );
};
