import React, { useMemo, useState, useEffect } from "react";
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  createTableColumn,
  TableColumnDefinition,
  Input,
  makeStyles,
  tokens,
  Text,
  Button,
} from "@fluentui/react-components";
import {
  SearchRegular,
  ChevronLeftRegular,
  ChevronRightRegular,
} from "@fluentui/react-icons";

export interface GridColumnDef<T> {
  key: keyof T & string;
  label: string;
  renderCell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface SharedDataGridProps<T> {
  items: T[];
  columns: GridColumnDef<T>[];
  getRowId: (item: T) => string;
  searchPlaceholder?: string;
  toolbarActions?: React.ReactNode;
  selectionMode?: "single" | "multiselect";
  emptyState?: React.ReactNode;
  pageSize?: number;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow2,
    overflow: "hidden",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  actionsGroup: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  searchInput: {
    minWidth: "280px",
  },
  emptyState: {
    padding: tokens.spacingVerticalXXL,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: tokens.colorNeutralForeground3,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  paginationControls: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
});

export const SharedDataGrid = <T extends Record<string, any>>({
  items,
  columns,
  getRowId,
  searchPlaceholder = "Search...",
  toolbarActions,
  selectionMode,
  emptyState,
  pageSize = 0,
}: SharedDataGridProps<T>) => {
  const styles = useStyles();
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fluentColumns: TableColumnDefinition<T>[] = useMemo(() => {
    return columns.map((col) =>
      createTableColumn<T>({
        columnId: col.key,
        compare:
          col.sortable !== false
            ? (a, b) => {
                const valA = a[col.key];
                const valB = b[col.key];
                if (valA == null) return -1;
                if (valB == null) return 1;
                return valA > valB ? 1 : valA < valB ? -1 : 0;
              }
            : undefined,
        renderHeaderCell: () => col.label,
        renderCell: (item) =>
          col.renderCell ? col.renderCell(item) : String(item[col.key] ?? ""),
      }),
    );
  }, [columns]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) =>
      columns.some((col) => {
        const value = item[col.key];
        return value != null && String(value).toLowerCase().includes(query);
      }),
    );
  }, [items, searchQuery, columns]);

  const paginatedItems = useMemo(() => {
    if (pageSize <= 0) return filteredItems;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredItems.slice(startIndex, startIndex + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const totalPages =
    pageSize > 0 ? Math.ceil(filteredItems.length / pageSize) : 1;
  const isPaginationEnabled = pageSize > 0 && filteredItems.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.actionsGroup}>{toolbarActions}</div>
        <Input
          className={styles.searchInput}
          placeholder={searchPlaceholder}
          contentBefore={<SearchRegular />}
          value={searchQuery}
          onChange={(ev, data) => setSearchQuery(data.value)}
        />
      </div>

      <DataGrid
        items={paginatedItems}
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

      {filteredItems.length === 0 && (
        <div className={styles.emptyState}>
          {emptyState || <Text>No records match your search criteria.</Text>}
        </div>
      )}

      {isPaginationEnabled && (
        <div className={styles.footer}>
          <Text size={200} color="neutralForeground3">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filteredItems.length)} of{" "}
            {filteredItems.length} records
          </Text>

          <div className={styles.paginationControls}>
            <Button
              appearance="subtle"
              icon={<ChevronLeftRegular />}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              aria-label="Previous page"
            />
            <Text size={200} weight="semibold">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              appearance="subtle"
              icon={<ChevronRightRegular />}
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              aria-label="Next page"
            />
          </div>
        </div>
      )}
    </div>
  );
};
