import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { MoreHorizontalRegular } from "@fluentui/react-icons";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { GridColumnDef } from "@/shared/components/Table/ModalTable";

import {
  ActionDetailsFields,
  Button,
  CommonEditDialog,
  FormDate,
  FormInput,
  ResponsiveGrid,
} from "@/shared";
import type {
  FreightDropdownQuery,
} from "./api/freightInformationApi";
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
import {
  loadFreightInformation,
  loadFreightInformationDropdowns,
  saveFreightInformationThunk,
} from "./reducers/freightInformationSlice";
import {
  mapFormToFreightInformation,
  mapFreightInformationToForm,
} from "./freightInformationMapping";

interface OverseasSummaryProps {
  goodsId?: number;
  companyId?: string | number;
  ownerCode?: string | number;
  addressId?: string | number;
}

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
  saveContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL,
  },
  saveButton: {
    minWidth: "120px",
  },
});

const OverseasSummary: React.FC<OverseasSummaryProps> = ({
  goodsId = 89,
  companyId = 104213383,
  ownerCode = 67,
  addressId = 21,
}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [actionHistoryOpen, setActionHistoryOpen] = React.useState(false);
  const [actionDetailsOpen, setActionDetailsOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] =
    React.useState<ShipmentActionHistoryRow | null>(null);
  const methods = useForm<OverseasSummaryFormValues>({
    defaultValues: EMPTY_OVERSEAS_SUMMARY,
  });
  const {
    data,
    dropdowns,
    status,
    error,
    dropdownStatus,
    dropdownError,
    saveStatus,
    saveError,
    saveSuccess,
  } = useAppSelector((state) => state.freightInformation);
  const actionDetailsMethods = useForm<ActionDetailsValues>({
    defaultValues: SHIPMENT_ACTION_HISTORY[0].actionDetails,
  });
  const { control } = methods;
  const serviceMode = methods.watch("serviceMode");

  React.useEffect(() => {
    let isCurrent = true;
    const loadInformation = async () => {
      const result = await dispatch(loadFreightInformation(goodsId));
      if (!isCurrent || !loadFreightInformation.fulfilled.match(result)) return;
      methods.reset(mapFreightInformationToForm(result.payload));
    };

    void loadInformation();
    return () => {
      isCurrent = false;
    };
  }, [dispatch, goodsId, methods.reset]);

  React.useEffect(() => {
    const query: FreightDropdownQuery = {
      mode: serviceMode,
      companyId,
      ownerCode,
      addressId,
    };
    void dispatch(loadFreightInformationDropdowns(query));
  }, [dispatch, serviceMode, companyId, ownerCode, addressId]);

  const openActionDetails = (action: ShipmentActionHistoryRow) => {
    setSelectedAction(action);
    actionDetailsMethods.reset(action.actionDetails);
    setActionDetailsOpen(true);
  };

  const onSave = (values: OverseasSummaryFormValues) => {
    if (!data) return;
    void dispatch(
      saveFreightInformationThunk({
        goodsId,
        payload: mapFormToFreightInformation(values, data),
      }),
    );
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
      <form onSubmit={methods.handleSubmit(onSave)}>
        <div className={styles.root}>
          <h2 className={styles.heading}>Overseas Summary</h2>
          {status === "loading" && (
            <div role="status">Loading freight information...</div>
          )}
          {error && <div role="alert">{error}</div>}
          {dropdownStatus === "loading" && (
            <div role="status">Loading freight dropdowns...</div>
          )}
          {dropdownError && <div role="alert">{dropdownError}</div>}
          {saveError && <div role="alert">{saveError}</div>}
          {saveSuccess && <div role="status">Freight information saved.</div>}

          <SummaryOverviewSection
            control={control}
            textField={textField}
            dropdowns={dropdowns}
          />

          <ResponsiveGrid className={styles.primaryGrid}>
            <VolumeWeightSection
              textField={textField}
              onOpenActionHistory={() => setActionHistoryOpen(true)}
            />
            <AccountSpecificSection
              control={control}
              textField={textField}
              dropdowns={dropdowns}
            />
          </ResponsiveGrid>

          <OtherKeyServiceSection
            control={control}
            textField={textField}
            dropdowns={dropdowns}
          />

          <div className={styles.saveContainer}>
            <Button
              appearance="primary"
              type="submit"
              className={styles.saveButton}
              disabled={!data || saveStatus === "loading"}
            >
              {saveStatus === "loading" ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
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
    </FormProvider>
  );
};

export default OverseasSummary;
