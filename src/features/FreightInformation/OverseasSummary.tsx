import React from "react";
import {
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { MoreHorizontalRegular } from "@fluentui/react-icons";
import {
  FormProvider,
  useController,
  useForm,
  type Control,
} from "react-hook-form";
import type { GridColumnDef } from "@/shared/components/Table/ModalTable";

import {
  ActionDetailsFields,
  Button,
  Checkbox,
  CommonEditDialog,
  FieldLabel,
  FormDate,
  FormDropdown,
  FormInput,
  ResponsiveGrid,
  SearchableInput,
} from "@/shared";
import { ModalTable } from "@/shared/components/Table/ModalTable";
import {
  ACTION_DETAILS_FIELDS,
  EMPTY_OVERSEAS_SUMMARY,
  MEASUREMENT_ROWS,
  OVERSEAS_SUMMARY_DROPDOWN_OPTIONS,
  SHIPMENT_ACTION_HISTORY,
  SECONDARY_WEIGHT_FIELDS,
} from "./constants";
import type {
  ActionDetailsValues,
  OverseasSummaryCheckboxName,
  OverseasSummaryFormValues,
  ShipmentActionHistoryRow,
  OverseasSummaryTextFieldName,
} from "./OverseasSummary.types";

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
  section: {
    paddingTop: tokens.spacingVerticalM,
    minWidth: 0,
  },
  sectionTitle: {
    margin: 0,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  coordinatorGrid: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
  },
  branchGrid: {
    gridTemplateColumns: "minmax(0, 1.7fr) minmax(120px, 0.8fr)",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalS,
  },
  generalFirstRow: {
    gridTemplateColumns:
      "minmax(190px, 1.15fr) minmax(190px, 1.15fr) minmax(190px, 1.25fr) auto minmax(90px, 0.55fr) minmax(90px, 0.55fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  generalSecondRow: {
    gridTemplateColumns:
      "minmax(150px, 0.65fr) minmax(270px, 1.2fr) repeat(6, max-content)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalS,
  },
  compactField: {
    maxWidth: "180px",
    "& input": {
      maxWidth: "100%",
    },
  },
  coordinatorField: {
    minWidth: 0,
    "& [data-responsive-grid-label]": {
      minWidth: "74px",
      justifySelf: "start",
      textAlign: "left",
    },
  },
  branchField: {
    minWidth: 0,
    "& [data-responsive-grid-label]": {
      minWidth: "130px",
      justifySelf: "start",
      textAlign: "left",
    },
  },
  checkboxField: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
  },
  narrowAmount: {
    minWidth: 0,
    "& [data-responsive-grid-label]": {
      minWidth: "42px",
      justifySelf: "start",
      textAlign: "left",
    },
    "& input": {
      maxWidth: "92px",
    },
  },
  currencyField: {
    minWidth: 0,
    "& [data-responsive-grid-label]": {
      minWidth: "42px",
      justifySelf: "start",
      textAlign: "left",
    },
  },
  agentField: {
    minWidth: 0,
    "& [data-responsive-grid-label]": {
      minWidth: "34px",
      justifySelf: "start",
      textAlign: "left",
    },
  },
  generalHeading: {
    margin: 0,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  primaryGrid: {
    gridTemplateColumns: "minmax(0, 1.8fr) minmax(260px, 1fr)",
    alignItems: "start",
    columnGap: tokens.spacingHorizontalL,
  },
  volumePanel: {
    minWidth: 0,
  },
  measurementRows: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
  },
  measurementRow: {
    gridTemplateColumns: "minmax(92px, 0.55fr) minmax(0, 1.7fr) minmax(0, 1.2fr)",
    alignItems: "end",
    columnGap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalXS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  measurementLabel: {
    paddingBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  measurementGroup: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  metricGroup: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  unitHeading: {
    gridColumn: "1 / -1",
    marginBottom: 0,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  densityControl: {
    display: "flex",
    alignItems: "end",
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
    "& > div": {
      flex: 1,
      minWidth: 0,
    },
  },
  moreButton: {
    minWidth: "30px",
    height: "32px",
    marginBottom: "1px",
  },
  weightInputs: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
  },
  weightRow: {
    gridTemplateColumns: "minmax(92px, 0.55fr) minmax(0, 1.7fr) minmax(0, 1.2fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalXS} 0`,
  },
  weightLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  summaryWeightGrid: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "end",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalM,
  },
  accountPanel: {
    minWidth: 0,
    padding: tokens.spacingVerticalS,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
  },
  accountFields: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
  },
  accountSubsection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalM,
  },
  divider: {
    border: "none",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: `${tokens.spacingVerticalM} 0 0`,
  },
  serviceGrid: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
    alignItems: "start",
    columnGap: tokens.spacingHorizontalL,
  },
  serviceFields: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
  },
  serviceTypeRow: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(100px, 0.55fr)",
    alignItems: "end",
    columnGap: tokens.spacingHorizontalS,
  },
  portGrid: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(160px, 0.55fr)",
    alignItems: "end",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
  },
  workflow: {
    gridColumn: "1 / -1",
  },
  holdReason: {
    gridColumn: "1 / -1",
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

interface FormCheckboxProps {
  control: Control<OverseasSummaryFormValues>;
  name: OverseasSummaryCheckboxName;
  label: string;
  disabled?: boolean;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  control,
  name,
  label,
  disabled,
}) => {
  const { field } = useController({ control, name });

  return (
    <Checkbox
      checked={field.value}
      disabled={disabled}
      label={label}
      onChange={(_, data) => field.onChange(data.checked)}
    />
  );
};

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
  const { field: originAgentField } = useController({
    name: "originAgent",
    control,
  });
  const { field: destinationAgentField } = useController({
    name: "destinationAgent",
    control,
  });
  const { field: portOfArrivalField } = useController({
    name: "portOfArrival",
    control,
  });

  const textField = (
    name: OverseasSummaryTextFieldName,
    label: string,
    type: "text" | "number" | "date" = "text",
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
        <section className={styles.section}>
          <ResponsiveGrid className={styles.coordinatorGrid}>
            <FormDropdown
              name="serviceCoordinator"
              control={control}
              label="SC"
              labelPosition="left"
              className={styles.coordinatorField}
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.coordinator}
            />
            <FormDropdown
              name="supportCoordinator"
              control={control}
              label="Support"
              labelPosition="left"
              className={styles.coordinatorField}
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.coordinator}
            />
            <FormDropdown
              name="billingCoordinator"
              control={control}
              label="Billing"
              labelPosition="left"
              className={styles.coordinatorField}
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.billingCoordinator}
            />
          </ResponsiveGrid>
          <ResponsiveGrid className={styles.branchGrid}>
            <FormDropdown
              name="controllingBranch"
              control={control}
              label="Controlling Branch"
              labelPosition="left"
              className={styles.branchField}
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.controllingBranch}
              disabled
            />
            <div className={styles.compactField}>
              {textField("revenueBranch", "Rev Branch")}
            </div>
          </ResponsiveGrid>
        </section>

        <section className={styles.section}>
          <h3 className={styles.generalHeading}>General</h3>
          <ResponsiveGrid className={styles.generalFirstRow}>
            <SearchableInput
              id="originAgent"
              label="OA"
              labelPosition="left"
              className={styles.agentField}
              value={originAgentField.value}
              onChange={originAgentField.onChange}
              onSearch={() => undefined}
            />
            <SearchableInput
              id="destinationAgent"
              label="DA"
              labelPosition="left"
              className={styles.agentField}
              value={destinationAgentField.value}
              onChange={destinationAgentField.onChange}
              onSearch={() => undefined}
            />
            <FormDropdown
              name="requiredThroughGc"
              control={control}
              label="Req through GC"
              labelPosition="left"
              className={styles.agentField}
              placeholder="Select"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.requiredThroughGc}
            />
            <div className={styles.checkboxField}>
              <FormCheckbox control={control} name="cod" label="COD" />
            </div>
            <div className={styles.narrowAmount}>
              <FormInput
                name="amount"
                control={control}
                label="Amt"
                labelPosition="left"
                type="number"
              />
            </div>
            <FormDropdown
              name="currency"
              control={control}
              label="Currency"
              labelPosition="left"
              className={styles.currencyField}
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.currency}
              disabled
            />
          </ResponsiveGrid>

          <ResponsiveGrid className={styles.generalSecondRow}>
            <div className={styles.compactField}>
              {textField("tradeLane", "Trade Lane")}
            </div>
            <FormDropdown
              name="freightLane"
              control={control}
              label="Freight Lane"
              labelPosition="left"
              placeholder="Select Freight Lane"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.freightLane}
              disabled
            />
            <FormCheckbox control={control} name="vip" label="VIP" />
            <FormCheckbox control={control} name="seaFlag" label="SN Sea Flag" />
            <FormCheckbox control={control} name="partialAllowance" label="Partial Allowance" />
            <FormCheckbox control={control} name="confidential" label="Confidential" />
            <FormCheckbox
              control={control}
              name="diplomaticDesignation"
              label="Diplomatic Designation"
            />
            <FormCheckbox control={control} name="spoc" label="SPOC" />
          </ResponsiveGrid>
        </section>

      <ResponsiveGrid className={styles.primaryGrid}>
        <section className={`${styles.section} ${styles.volumePanel}`}>
          <h3 className={styles.sectionTitle}>Volume - weight</h3>
          <ResponsiveGrid className={styles.measurementRows}>
            {MEASUREMENT_ROWS.map((row) => (
              <ResponsiveGrid className={styles.measurementRow} key={row.label}>
                <div className={styles.measurementLabel}>{row.label}</div>
                <ResponsiveGrid className={styles.measurementGroup}>
                  <div className={styles.unitHeading}>Imperial ({row.imperialUnit})</div>
                  {textField(row.imperialNet, "Net", "number")}
                  {textField(row.imperialGross, "Gross", "number")}
                  {row.imperialDensity ? (
                    row.label === "Actual Vol" ? (
                      <div className={styles.densityControl}>
                        {textField(row.imperialDensity, "Density", "number")}
                        <Button
                          type="button"
                          appearance="subtle"
                          className={styles.moreButton}
                          aria-label="More actual volume actions"
                          title="More actions"
                          onClick={() => setActionHistoryOpen(true)}
                        >
                          <MoreHorizontalRegular />
                        </Button>
                      </div>
                    ) : (
                      textField(row.imperialDensity, "Density", "number")
                    )
                  ) : null}
                </ResponsiveGrid>
                <ResponsiveGrid className={styles.metricGroup}>
                  <div className={styles.unitHeading}>Metric ({row.metricUnit})</div>
                  {textField(row.metricNet, "Net", "number")}
                  {textField(row.metricGross, "Gross", "number")}
                </ResponsiveGrid>
              </ResponsiveGrid>
            ))}
          </ResponsiveGrid>

          <ResponsiveGrid className={styles.weightInputs}>
            {SECONDARY_WEIGHT_FIELDS.map((row) => (
              <ResponsiveGrid className={styles.weightRow} key={row.label}>
                <div className={styles.weightLabel}>{row.label}</div>
                <ResponsiveGrid className={styles.measurementGroup}>
                  <div className={styles.unitHeading}>Imperial (lbs)</div>
                  {textField(row.imperialNet, "Net", "number")}
                  {textField(row.imperialGross, "Gross", "number")}
                </ResponsiveGrid>
                <ResponsiveGrid className={styles.metricGroup}>
                  <div className={styles.unitHeading}>Metric (Kg)</div>
                  {textField(row.metricNet, "Net", "number")}
                  {textField(row.metricGross, "Gross", "number")}
                </ResponsiveGrid>
              </ResponsiveGrid>
            ))}
          </ResponsiveGrid>

          <ResponsiveGrid className={styles.summaryWeightGrid}>
            {textField("authorizedWeight", "Auth Weight", "number")}
            {textField("billedWeight", "Billed Weight", "number")}
            {textField("partialDeliveryWeight", "Partial Delivery Weight", "number")}
            {textField("specialWeight", "Special Weight", "number")}
            {textField("surveyWeight", "Survey Weight", "number")}
          </ResponsiveGrid>
        </section>

        <section className={`${styles.section} ${styles.accountPanel}`}>
          <h3 className={styles.sectionTitle}>Account Specific:</h3>
          <ResponsiveGrid className={styles.accountFields}>
            {textField("costCenter", "Cost Center", "text", true)}
            {textField("employeePersonnelNumber", "Employee Personnel No:", "text", true)}
            {textField("affiliateCode", "Affiliate Code:", "text", true)}
            {textField("entitledWeight", "Entitled Weight:", "number", true)}
            {textField("endingAssignmentDate", "Ending Assignment Date:", "date", true)}
            <div className={styles.checkboxField}>
              <FormCheckbox
                control={control}
                name="housingSpendableWaiver"
                label="Housing Spendable Waiver?"
                disabled
              />
            </div>
            {textField("housingSpendableWaiverDate", "Housing Spendable Waiver Date:", "date", true)}
            <FormDropdown
              name="removalType"
              control={control}
              label="Removal Type:"
              labelPosition="left"
              disabled
              placeholder="Select"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.removalType}
            />
          </ResponsiveGrid>

          <div className={styles.accountSubsection}>
            {textField("gbl", "GBL")}
            {textField("sitNumber", "SIT #")}
            <FormDropdown
              name="origin"
              control={control}
              label="Origin:"
              labelPosition="left"
              placeholder="Select"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.origin}
            />
          </div>
        </section>
      </ResponsiveGrid>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Other key service parameters:</h3>
        <ResponsiveGrid className={styles.serviceGrid}>
          <ResponsiveGrid className={styles.serviceFields}>
            <ResponsiveGrid className={styles.serviceTypeRow}>
              <FormDropdown
                name="serviceType"
                control={control}
                label="Service Type"
                labelPosition="left"
                options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.serviceType}
              />
              {textField("serviceTypeDetails", "", "text")}
            </ResponsiveGrid>
            <FormDropdown
              name="pricingType"
              control={control}
              label="Pricing Type"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.pricingType}
            />
            <FormDropdown
              name="deliveryType"
              control={control}
              label="Delivery Type"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.deliveryType}
            />
            <FormDropdown
              name="packingType"
              control={control}
              label="Packing Type"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.packingType}
            />
            <FormDropdown
              name="furnitureWrap"
              control={control}
              label="Furniture Wrap"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.furnitureWrap}
            />
            <FormDropdown
              name="commodityType"
              control={control}
              label="Commodity Type"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.commodityType}
            />
            <ResponsiveGrid className={styles.serviceTypeRow}>
              {textField("consolCode", "Consol Code")}
              <FieldLabel>Managed from the Consolidation screen</FieldLabel>
            </ResponsiveGrid>
            <FormDropdown
              name="surveyType"
              control={control}
              label="Survey Type"
              labelPosition="left"
              placeholder="Select"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.surveyType}
            />
          </ResponsiveGrid>

          <ResponsiveGrid className={styles.portGrid}>
            <SearchableInput
              id="portOfArrival"
              label="Port of arrival"
              labelPosition="left"
              value={portOfArrivalField.value}
              onChange={portOfArrivalField.onChange}
              onSearch={() => undefined}
            />
            {textField("totalNumberOfLiftvans", "Total Number of Liftvans", "number")}
            <div className={styles.workflow}>
              <FormDropdown
                name="workflow"
                control={control}
                label="Workflow"
                labelPosition="left"
                options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.workflow}
              />
            </div>
            <div className={styles.checkboxField}>
              <FormCheckbox control={control} name="shipmentOnHold" label="Shipment On Hold" />
            </div>
            {textField("shipmentHoldDate", "Shipment Hold Date", "date")}
            <div className={styles.holdReason}>
              {textField("shipmentHoldReason", "Shipment Hold Reason")}
            </div>
          </ResponsiveGrid>
        </ResponsiveGrid>
      </section>
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
