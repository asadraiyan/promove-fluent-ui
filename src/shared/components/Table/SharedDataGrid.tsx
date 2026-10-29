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
  mergeClasses,
} from "@fluentui/react-components";
import {
  SearchRegular,
  ChevronLeftRegular,
  ChevronRightRegular,
  PinRegular,
  PinFilled,
} from "@fluentui/react-icons";

export interface GridColumnDef<T> {
  key: keyof T & string;
  label: string;
  renderCell?: (item: T) => React.ReactNode;
  sortable?: boolean;
  accessor?: (item: T) => string | number;
  minWidth?: number;
}

type PinnedCellStyle = React.CSSProperties & {
  "--pinned-offset"?: string;
};

interface SharedDataGridProps<T> {
  items: T[];
  columns: GridColumnDef<T>[];
  getRowId: (item: T) => string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  toolbarActions?: React.ReactNode;
  selectionMode?: "single" | "multiselect";
  emptyState?: React.ReactNode;
  pageSize?: number;
  enableColumnPinning?: boolean;
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
    position: "relative",
  },
  grid: {
    minWidth: "max-content",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  actionsGroup: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    flexWrap: "wrap",
  },
  searchInput: {
    flexGrow: 1,
    minWidth: "200px",
    maxWidth: "350px",
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
  gridRow: {
    backgroundColor: tokens.colorNeutralBackground1,
    "&:hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
  },
  cellContent: {
    whiteSpace: "nowrap",
    overflow: "visible",
    width: "100%",
    display: "block",
  },
  pinnedCell: {
    position: "sticky",
    left: "var(--pinned-offset, 0px)",
    backgroundColor: "inherit",
    boxShadow: `2px 0 4px -2px ${tokens.colorNeutralShadowAmbient}`,
  },
  pinnedHeader: {
    zIndex: 3,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  pinnedBody: {
    zIndex: 2,
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  cellBase: {
    width: "var(--cell-width, 100px)",
    minWidth: "var(--cell-width, 100px)",
    maxWidth: "var(--cell-width, 100px)",
    flexBasis: "var(--cell-width, 100px)",
    flexGrow: 0,
    flexShrink: 0,
    boxSizing: "border-box",
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
  },
});

export const SharedDataGrid = <T extends Record<string, any>>({
  items,
  columns,
  getRowId,
  showSearch = true,
  searchPlaceholder = "Search...",
  toolbarActions,
  selectionMode,
  emptyState,
  pageSize = 0,
  enableColumnPinning = false,
}: SharedDataGridProps<T>) => {
  const styles = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pinnedColumnIds, setPinnedColumnIds] = useState<string[]>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const orderedColumnsDef = useMemo(() => {
    const pinned = columns.filter((col) => pinnedColumnIds.includes(col.key));
    const unpinned = columns.filter(
      (col) => !pinnedColumnIds.includes(col.key),
    );
    return [...pinned, ...unpinned];
  }, [columns, pinnedColumnIds]);

  const { pinnedOffsets } = useMemo(() => {
    const offsets: Record<string, string> = {};
    let currentLeft = 0;

    orderedColumnsDef.forEach((col) => {
      if (pinnedColumnIds.includes(col.key)) {
        const width = col.minWidth ?? 100;
        offsets[col.key] = `${currentLeft}px`;
        currentLeft += width;
      }
    });

    return { pinnedOffsets: offsets };
  }, [orderedColumnsDef, pinnedColumnIds]);

  const getCellVariables = (
    columnId: string,
    isPinned: boolean,
  ): React.CSSProperties => {
    const columnDef = orderedColumnsDef.find((col) => col.key === columnId);
    const width = columnDef?.minWidth ?? 100;

    const vars: Record<string, string> = {
      "--cell-width": `${width}px`,
    };

    if (isPinned) {
      vars["--pinned-offset"] = pinnedOffsets[columnId];
    }

    return vars as React.CSSProperties;
  };

  const fluentColumns: TableColumnDefinition<T>[] = useMemo(() => {
    return orderedColumnsDef.map((col) =>
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
  }, [orderedColumnsDef, styles.cellContent]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) =>
      columns.some((col) => {
        const value = col.accessor ? col.accessor(item) : item[col.key];
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

  const togglePin = (columnId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedColumnIds((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId],
    );
  };

  return (
    <div className={styles.container}>
      {(showSearch || toolbarActions) && (
        <div className={styles.toolbar}>
          <div className={styles.actionsGroup}>{toolbarActions}</div>
          {showSearch && (
            <Input
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              contentBefore={<SearchRegular />}
              value={searchQuery}
              onChange={(ev, data) => setSearchQuery(data.value)}
            />
          )}
        </div>
      )}
      <div className={styles.tableWrapper}>
        <DataGrid
          className={styles.grid}
          items={paginatedItems}
          columns={fluentColumns}
          sortable
          selectionMode={selectionMode}
          getRowId={getRowId}
          focusMode="composite"
        >
          <DataGridHeader>
            <DataGridRow
              className={styles.gridRow}
              selectionCell={
                selectionMode === "multiselect"
                  ? { checkboxIndicator: { "aria-label": "Select all rows" } }
                  : undefined
              }
            >
              {({ renderHeaderCell, columnId }) => {
                const stringColumnId = String(columnId);
                const isPinned = pinnedColumnIds.includes(stringColumnId);

                return (
                  <DataGridHeaderCell
                    className={mergeClasses(
                      styles.cellBase,
                      isPinned && styles.pinnedCell,
                      isPinned && styles.pinnedHeader,
                    )}
                    style={getCellVariables(stringColumnId, isPinned)}
                  >
                    <div className={styles.headerContent}>
                      <Text weight="semibold">{renderHeaderCell()}</Text>
                      {enableColumnPinning && (
                        <Button
                          appearance="transparent"
                          icon={isPinned ? <PinFilled /> : <PinRegular />}
                          onClick={(e) => togglePin(stringColumnId, e)}
                          aria-label={isPinned ? "Unpin column" : "Pin column"}
                          size="small"
                        />
                      )}
                    </div>
                  </DataGridHeaderCell>
                );
              }}
            </DataGridRow>
          </DataGridHeader>

          <DataGridBody<T>>
            {({ item, rowId }) => (
              <DataGridRow<T>
                className={styles.gridRow}
                key={rowId}
                selectionCell={
                  selectionMode
                    ? { checkboxIndicator: { "aria-label": "Select row" } }
                    : undefined
                }
              >
                {({ renderCell, columnId }) => {
                  const stringColumnId = String(columnId);
                  const isPinned = pinnedColumnIds.includes(stringColumnId);

                  return (
                    <DataGridCell
                      className={mergeClasses(
                        styles.cellBase,
                        isPinned && styles.pinnedCell,
                        isPinned && styles.pinnedBody,
                      )}
                      style={getCellVariables(stringColumnId, isPinned)}
                    >
                      {renderCell(item)}
                    </DataGridCell>
                  );
                }}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
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
