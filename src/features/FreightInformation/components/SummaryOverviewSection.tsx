import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useController, type Control } from "react-hook-form";
import {
  FormDropdown,
  FormInput,
  ResponsiveGrid,
  SearchableInput,
} from "@/shared";
import { OVERSEAS_SUMMARY_DROPDOWN_OPTIONS } from "../constants";
import type { OverseasSummaryFormValues } from "../OverseasSummary.types";
import { FormCheckbox, type SummaryTextFieldRenderer } from "./SummaryFormFields";

const useStyles = makeStyles({
  section: {
    paddingTop: tokens.spacingVerticalM,
    minWidth: 0,
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
});

interface SummaryOverviewSectionProps {
  control: Control<OverseasSummaryFormValues>;
  textField: SummaryTextFieldRenderer;
}

const SummaryOverviewSection: React.FC<SummaryOverviewSectionProps> = ({
  control,
  textField,
}) => {
  const styles = useStyles();
  const { field: originAgentField } = useController({
    name: "originAgent",
    control,
  });
  const { field: destinationAgentField } = useController({
    name: "destinationAgent",
    control,
  });

  return (
    <>
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
          <FormCheckbox
            control={control}
            name="partialAllowance"
            label="Partial Allowance"
          />
          <FormCheckbox
            control={control}
            name="confidential"
            label="Confidential"
          />
          <FormCheckbox
            control={control}
            name="diplomaticDesignation"
            label="Diplomatic Designation"
          />
          <FormCheckbox control={control} name="spoc" label="SPOC" />
        </ResponsiveGrid>
      </section>
    </>
  );
};

export default SummaryOverviewSection;
