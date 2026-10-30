import React, { useMemo, useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

import {
  Button,
  Checkbox,
  ResponsiveGrid,
  SharedDataGrid,
  type GridColumnDef,
} from "@/shared";
import { AdhocGlobalcoActions } from "../actionButtons/AdhocGlobalcoActions";
import {
  NegativeMarginDetailsDialog,
  NewActionDialog,
  ShipmentQuotesDialog,
  UploadToSistrsDialog,
  actionRowIcons,
} from "./ShipmentActionDialogs";
import { AddRegular } from "@fluentui/react-icons";

interface ShipmentActionRow {
  id: string;
  file: string;
  description: string;
  status: "Open" | "Completed" | "Cancelled";
  date: string;
  assignedTo: string;
  comment: string;
  moreActions: string;
  openAction: string;
  createdBy: string;
}

const sampleActions: ShipmentActionRow[] = [
  {
    id: "action-1",
    file: "INT",
    description: "Ad hoc",
    status: "Open",
    date: "21/10/2026 07:21:53",
    assignedTo: "Vilas Palve",
    comment: "",
    moreActions: "",
    openAction: "",
    createdBy: "Vilas Palve",
  },
  {
    id: "action-2",
    file: "INT",
    description: "Add Notes to Globalco",
    status: "Open",
    date: "21/10/2026 07:22:03",
    assignedTo: "Vilas Palve",
    comment: "",
    moreActions: "",
    openAction: "",
    createdBy: "Vilas Palve",
  },
  {
    id: "action-3",
    file: "INT",
    description: "Ad hoc",
    status: "Completed",
    date: "20/10/2026 14:36:18",
    assignedTo: "Vilas Palve",
    comment: "Confirmed shipment details",
    moreActions: "",
    openAction: "",
    createdBy: "Vilas Palve",
  },
];

const useStyles = makeStyles({
  section: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1200px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    "@media (max-width: 560px)": {
      width: "calc(100% - 16px)",
      margin: "12px auto",
      padding: tokens.spacingVerticalS,
    },
  },
  heading: {
    margin: 0,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  description: {
    margin: `${tokens.spacingVerticalS} 0`,
    color: tokens.colorNeutralForeground2,
  },
  topActions: {
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
    "@media (max-width: 760px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusSmall,
  },
  workflow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    margin: `${tokens.spacingVerticalM} 0 tokens.spacingVerticalS`,
  },
  workflowLabel: {
    marginRight: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground2,
  },
  actionButtons: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
    marginBottom: tokens.spacingVerticalM,
    "& > div": {
      width: "auto",
      margin: 0,
    },
    "& > div > div": {
      margin: 0,
    },
    "@media (max-width: 760px)": {
      justifyContent: "flex-start",
    },
  },
});

const columns: GridColumnDef<ShipmentActionRow>[] = [
  { key: "file", label: "File", minWidth: 75 },
  { key: "description", label: "Description", minWidth: 170 },
  { key: "status", label: "Status", minWidth: 100 },
  { key: "date", label: "Date", minWidth: 175 },
  { key: "assignedTo", label: "Assigned To", minWidth: 150 },
  { key: "comment", label: "Comment", minWidth: 220 },
  {
    key: "moreActions",
    label: "",
    minWidth: 44,
    sortable: false,
    renderCell: (action) => (
      <Button
        appearance="subtle"
        icon={actionRowIcons.more}
        aria-label={`More actions for ${action.description}`}
      />
    ),
  },
  {
    key: "openAction",
    label: "",
    minWidth: 44,
    sortable: false,
    renderCell: (action) => (
      <Button
        appearance="subtle"
        icon={actionRowIcons.open}
        aria-label={`Open ${action.description}`}
      />
    ),
  },
  { key: "createdBy", label: "Created By", minWidth: 150 },
];

const ShipmentActions: React.FC = () => {
  const styles = useStyles();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showOpen, setShowOpen] = useState(true);
  const [showCancelled, setShowCancelled] = useState(false);
  const [activeDialog, setActiveDialog] = useState<
    "negative-margin" | "quotes" | "upload" | "new-action" | null
  >(null);

  const visibleActions = useMemo(
    () =>
      sampleActions.filter((action) => {
        if (action.status === "Open") return showOpen;
        if (action.status === "Completed") return showCompleted;
        return showCancelled;
      }),
    [showCompleted, showOpen, showCancelled],
  );

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.heading}>Shipment Action details</h2>
        <p className={styles.description}>
          The actions below are specific to this shipment. For enquiry related
          actions (e.g. Quotes), please choose Actions on the third line in the
          preview on the left.
        </p>

        <ResponsiveGrid className={styles.topActions}>
          <div className={styles.filters}>
            <Checkbox
              label="Completed actions"
              checked={showCompleted}
              onChange={(_, data) => setShowCompleted(Boolean(data.checked))}
            />
            <Checkbox
              label="Open actions"
              checked={showOpen}
              onChange={(_, data) => setShowOpen(Boolean(data.checked))}
            />
            <Checkbox
              label="Cancelled actions"
              checked={showCancelled}
              onChange={(_, data) => setShowCancelled(Boolean(data.checked))}
            />
          </div>
          <div className={styles.workflow}>
            <Button
              appearance="secondary"
              onClick={() => setActiveDialog("negative-margin")}
            >
              Negative Margin Details
            </Button>
            <Button
              appearance="secondary"
              onClick={() => setActiveDialog("quotes")}
            >
              Enter Quote Data
            </Button>
            <Button appearance="secondary" disabled>
              Process Survey Request
            </Button>
          </div>
        </ResponsiveGrid>

        <div className={styles.workflow}>
          <span className={styles.workflowLabel}>
            Actions For Workflow... Intl Mil - Codes 4 &gt; Outbound Shipment
            Workflow
          </span>
        </div>

        <div className={styles.actionButtons}>
          <Button appearance="secondary">Retrieve from SISTRS</Button>
          <Button
            appearance="secondary"
            onClick={() => setActiveDialog("upload")}
          >
            Upload to SISTRS
          </Button>
          <AdhocGlobalcoActions />
          <Button
            icon={<AddRegular />}
            appearance="subtle"
            aria-label="Add action"
            onClick={() => setActiveDialog("new-action")}
          />
        </div>

        <SharedDataGrid
          items={visibleActions}
          columns={columns}
          getRowId={(action) => action.id}
          showSearch={false}
          emptyState="No shipment actions match the selected filters."
        />
      </section>
      <NegativeMarginDetailsDialog
        open={activeDialog === "negative-margin"}
        onClose={() => setActiveDialog(null)}
      />
      <ShipmentQuotesDialog
        open={activeDialog === "quotes"}
        onClose={() => setActiveDialog(null)}
      />
      <UploadToSistrsDialog
        open={activeDialog === "upload"}
        onClose={() => setActiveDialog(null)}
      />
      <NewActionDialog
        open={activeDialog === "new-action"}
        onClose={() => setActiveDialog(null)}
      />
    </>
  );
};

export default ShipmentActions;
