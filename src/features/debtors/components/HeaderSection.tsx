import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Control, Controller } from "react-hook-form";
import constants from "../constants.json";
import { Checkbox, FormDropdown, FormInput } from "@/shared";
import { DebtorsFormData } from "../types";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  row: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "center",
  },
});

export const HeaderSection: React.FC<{ control: Control<DebtorsFormData> }> = ({
  control,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {/* Top Banner Row */}
      <div className={styles.row}>
        <h3 style={{ margin: 0, marginRight: "16px" }}>Debtors (DB)</h3>
        <FormDropdown
          name="topOwner"
          control={control}
          label="Owner"
          labelPosition="left"
          options={constants.dropdownOptions.owner}
        />
        <FormInput
          name="topName"
          control={control}
          label="Name"
          labelPosition="left"
        />
        <FormInput
          name="topRefNumber"
          control={control}
          label="Ref Number"
          labelPosition="left"
        />
        <FormInput
          name="topRefNumber2"
          control={control}
          label="Ref Number 2"
          labelPosition="left"
        />
        <Controller
          name="includeBlockeds"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              label="Include blockeds"
              checked={value}
              onChange={(_, d) => onChange(d.checked)}
            />
          )}
        />
      </div>

      {/* Second Row */}
      <div className={styles.row}>
        <FormDropdown
          name="owner"
          control={control}
          label="Owner"
          labelPosition="left"
          options={constants.dropdownOptions.owner}
        />
        <FormDropdown
          name="private"
          control={control}
          label="Private"
          labelPosition="left"
          options={constants.dropdownOptions.private}
        />
        <FormInput
          name="refNumber"
          control={control}
          label="Ref Number"
          labelPosition="left"
        />
        <FormDropdown
          name="debtorType"
          control={control}
          label="Debtor type"
          labelPosition="left"
          options={constants.dropdownOptions.debtorType}
        />
        <FormInput
          name="refNumber2"
          control={control}
          label="Ref Number 2"
          labelPosition="left"
        />
        <FormDropdown
          name="status"
          control={control}
          label="Status"
          labelPosition="left"
          options={constants.dropdownOptions.status}
        />
      </div>
    </div>
  );
};
