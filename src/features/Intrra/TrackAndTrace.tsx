import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { ModalTable, type GridColumnDef } from "@/shared/components/Table/ModalTable";

interface TrackAndTraceRow {
  interface: string;
  status: string;
  createdBy: string;
  created: string;
  interfaced: string;
}

const columns: GridColumnDef<TrackAndTraceRow>[] = [
  { key: "interface", label: "Interface" },
  { key: "status", label: "Status" },
  { key: "createdBy", label: "Created by" },
  { key: "created", label: "Created" },
  { key: "interfaced", label: "Interfaced" },
];

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    width: "min(100%, 900px)",
  },
  heading: {
    margin: 0,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  tablePanel: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "100%",
    minHeight: "360px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  headerCell: {
    backgroundColor: "#0078D4",
    color: "#FFFFFF",
    borderRight: "2px solid #FFFFFF",
    "&:hover, &:active": {
      backgroundColor: "#0078D4",
      color: "#FFFFFF",
    },
    "& *": {
      color: "#FFFFFF",
    },
    "&:hover *": {
      color: "#FFFFFF",
    },
  },
  emptyState: {
    flex: 1,
    minHeight: "280px",
  },
});

const TrackAndTrace = () => {
  const styles = useStyles();

  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>Intrra - Track and Trace</h2>
      <div className={styles.tablePanel}>
        <ModalTable<TrackAndTraceRow>
          items={[]}
          columns={columns}
          getRowId={(row) => row.interface}
          emptyState="No Track and trace is found yet"
          headerCellClassName={styles.headerCell}
          emptyStateClassName={styles.emptyState}
        />
      </div>
    </section>
  );
};

export default TrackAndTrace;