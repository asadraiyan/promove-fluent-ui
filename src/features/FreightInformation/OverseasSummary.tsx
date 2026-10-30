import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { MoreHorizontalRegular } from "@fluentui/react-icons";
import { FormProvider, useForm } from "react-hook-form";
import type { GridColumnDef } from "@/shared/components/Table/ModalTable";

import {
  ActionDetailsFields,
  Button,
  CommonEditDialog,
  FormDate,
  FormInput,
  ResponsiveGrid,
} from "@/shared";
import { ModalTable } from "@/shared/components/Table/ModalTable";
import {
  ACTION_DETAILS_FIELDS,
  EMPTY_OVERSEAS_SUMMARY,
  SHIPMENT_ACTION_HISTORY,
} from "./constants";
import type {
  ActionDetailsValues,
  OverseasSummaryFormValues,
  ShipmentActionHistoryRow,
} from "./OverseasSummary.types";
import AccountSpecificSection from "./components/AccountSpecificSection";
import OtherKeyServiceSection from "./components/OtherKeyServiceSection";
import {
  type SummaryTextFieldRenderer,
} from "./components/SummaryFormFields";
import SummaryOverviewSection from "./components/SummaryOverviewSection";
import VolumeWeightSection from "./components/VolumeWeightSection";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1280px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    "& input, & select": {
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
  },
  heading: {
    margin: 0,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  primaryGrid: {
    gridTemplateColumns: "minmax(0, 1.8fr) minmax(260px, 1fr)",
    alignItems: "start",
    columnGap: tokens.spacingHorizontalL,
  },
  historyContent: {
    maxHeight: "min(65vh, 520px)",
    overflow: "auto",
    paddingTop: tokens.spacingVerticalM,
  },
  detailsContent: {
    maxHeight: "min(75vh, 820px)",
    overflowY: "auto",
    padding: `${tokens.spacingVerticalM} 0`,
  },
});

const OverseasSummary: React.FC = () => {
  const styles = useStyles();
  const [actionHistoryOpen, setActionHistoryOpen] = React.useState(false);
  const [actionDetailsOpen, setActionDetailsOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] =
    React.useState<ShipmentActionHistoryRow | null>(null);
  const methods = useForm<OverseasSummaryFormValues>({
    defaultValues: EMPTY_OVERSEAS_SUMMARY,
  });
  const actionDetailsMethods = useForm<ActionDetailsValues>({
    defaultValues: SHIPMENT_ACTION_HISTORY[0].actionDetails,
  });
  const { control } = methods;

  const openActionDetails = (action: ShipmentActionHistoryRow) => {
    setSelectedAction(action);
    actionDetailsMethods.reset(action.actionDetails);
    setActionDetailsOpen(true);
  };

  const textField: SummaryTextFieldRenderer = (
    name,
    label,
    type = "text",
    disabled = false,
  ) =>
    type === "date" ? (
      <FormDate
        name={name}
        label={label}
        disabled={disabled}
        orientation="horizontal"
      />
    ) : (
      <FormInput
        name={name}
        control={control}
        label={label}
        type={type}
        disabled={disabled}
      />
    );

  const actionHistoryColumns: GridColumnDef<ShipmentActionHistoryRow>[] = [
    { key: "file", label: "File" },
    { key: "description", label: "Description" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "comment", label: "Comment" },
    {
      key: "id",
      label: "Actions",
      sortable: false,
      renderCell: (action) => (
        <Button
          type="button"
          appearance="subtle"
          aria-label={`Open action details for ${action.description}`}
          title="Action details"
          onClick={(event) => {
            event.stopPropagation();
            openActionDetails(action);
          }}
        >
          <MoreHorizontalRegular />
        </Button>
      ),
    },
    { key: "createdBy", label: "Created By" },
  ];

  return (
    <FormProvider {...methods}>
      <div className={styles.root}>
        <h2 className={styles.heading}>Overseas Summary</h2>
        <SummaryOverviewSection control={control} textField={textField} />

        <ResponsiveGrid className={styles.primaryGrid}>
          <VolumeWeightSection
            textField={textField}
            onOpenActionHistory={() => setActionHistoryOpen(true)}
          />
          <AccountSpecificSection control={control} textField={textField} />
        </ResponsiveGrid>

        <OtherKeyServiceSection control={control} textField={textField} />

        <CommonEditDialog
          open={actionHistoryOpen}
          heading="Shipment Actions History"
          content={
            <div className={styles.historyContent}>
              <ModalTable<ShipmentActionHistoryRow>
                items={SHIPMENT_ACTION_HISTORY}
                columns={actionHistoryColumns}
                getRowId={(action) => action.id}
                compact
                fillWidth
                wrapCellContent
                emptyState="No shipment actions found."
              />
            </div>
          }
          actions={[
            {
              label: "Close",
              appearance: "secondary",
              onClick: () => setActionHistoryOpen(false),
            },
          ]}
          onClose={() => setActionHistoryOpen(false)}
          showCloseButton
          maxWidth="min(96vw, 1200px)"
        />
        <CommonEditDialog
          open={actionDetailsOpen}
          heading="Action Details"
          content={
            selectedAction ? (
              <FormProvider {...actionDetailsMethods}>
                <div className={styles.detailsContent}>
                  <ActionDetailsFields
                    control={actionDetailsMethods.control}
                    fields={ACTION_DETAILS_FIELDS}
                  />
                </div>
              </FormProvider>
            ) : null
          }
          actions={[
            {
              label: "OK",
              appearance: "primary",
              onClick: () => setActionDetailsOpen(false),
            },
            {
              label: "Cancel",
              appearance: "secondary",
              onClick: () => setActionDetailsOpen(false),
            },
          ]}
          onClose={() => setActionDetailsOpen(false)}
          showCloseButton
          maxWidth="min(96vw, 720px)"
        />
      </div>
    </FormProvider>
  );
};

export default OverseasSummary;
