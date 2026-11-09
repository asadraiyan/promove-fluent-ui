import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { type Control } from "react-hook-form";
import { FormDropdown, ResponsiveGrid } from "@/shared";
import { OVERSEAS_SUMMARY_DROPDOWN_OPTIONS } from "../constants";
import type { FreightInformationDropdowns } from "../api/freightInformationApi";
import type { OverseasSummaryFormValues } from "../OverseasSummary.types";
import { FormCheckbox, type SummaryTextFieldRenderer } from "./SummaryFormFields";

const useStyles = makeStyles({
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
  checkboxField: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
  },
});

interface AccountSpecificSectionProps {
  control: Control<OverseasSummaryFormValues>;
  textField: SummaryTextFieldRenderer;
  dropdowns: FreightInformationDropdowns | null;
}

const AccountSpecificSection: React.FC<AccountSpecificSectionProps> = ({
  control,
  textField,
  dropdowns,
}) => {
  const styles = useStyles();

  return (
    <section className={`${styles.section} ${styles.accountPanel}`}>
      <h3 className={styles.sectionTitle}>Account Specific:</h3>
      <ResponsiveGrid className={styles.accountFields}>
        {textField("costCenter", "Cost Center")}
        {textField("employeePersonnelNumber", "Employee Personnel No:")}
        {textField("affiliateCode", "Affiliate Code:")}
        {textField("entitledWeight", "Entitled Weight:", "number")}
        {textField("entitledWeightDescription", "Entitled Weight Description:")}
        {textField("endingAssignmentDate", "Ending Assignment Date:", "date")}
        <div className={styles.checkboxField}>
          <FormCheckbox
            control={control}
            name="housingSpendableWaiver"
            label="Housing Spendable Waiver?"
          />
        </div>
        {textField("housingSpendableWaiverDate", "Housing Spendable Waiver Date:", "date")}
        <FormDropdown
          name="removalType"
          control={control}
          label="Removal Type:"
          labelPosition="left"
          placeholder="Select"
          options={dropdowns?.removalTypes ?? []}
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
  );
};

export default AccountSpecificSection;
