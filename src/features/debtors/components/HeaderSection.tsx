import React from "react";
import { Button, makeStyles, Text, tokens } from "@fluentui/react-components";
import { Control, Controller } from "react-hook-form";
import constants from "../constants.json";
import { Checkbox, FormDropdown, FormInput } from "@/shared";
import { DebtorsFormData } from "../types";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    marginBottom: tokens.spacingVerticalM,
  },
  topBanner: {
    display: "flex",
    minHeight: "72px",
    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingHorizontalL,
    width: "180px",
    flexShrink: 0,
    "@media (max-width: 900px)": {
      width: "auto",
      justifyContent: "flex-start",
      padding: tokens.spacingVerticalM,
    },
  },
  topFieldsWrapper: {
    display: "flex",
    flex: 1,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
    flexWrap: "wrap",
  },
  topFieldsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    flex: 1,
    minWidth: "400px",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
      minWidth: "100%",
    },
  },
  topCheckbox: {
    display: "flex",
    alignItems: "center",
    paddingRight: tokens.spacingHorizontalM,
  },
  bottomBanner: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  bottomFieldsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
  },
});

export interface HeaderSectionProps {
  control: Control<DebtorsFormData>;
  onClear?: () => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  control,
  onClear,
}) => {
  const styles = useStyles();

  return (
    <header className={styles.root}>
      <div className={styles.topBanner}>
        <div className={styles.titleContainer}>
          <Text size={500} weight="semibold" style={{ color: "inherit" }}>
            Debtors (DB)
          </Text>
        </div>

        <div className={styles.topFieldsWrapper}>
          <div className={styles.topFieldsGrid}>
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
          </div>
          <div className={styles.topCheckbox}>
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
        </div>
      </div>

      <div className={styles.bottomBanner}>
        <div className={styles.bottomFieldsGrid}>
          <FormDropdown
            name="owner"
            control={control}
            label="Owner"
            labelPosition="left"
            options={constants.dropdownOptions.owner}
          />
          <FormInput
            name="refNumber"
            control={control}
            label="Ref Number"
            labelPosition="left"
          />
          <FormInput
            name="refNumber2"
            control={control}
            label="Ref Number 2"
            labelPosition="left"
          />

          <FormDropdown
            name="private"
            control={control}
            label="Private"
            labelPosition="left"
            options={constants.dropdownOptions.private}
          />
          <FormDropdown
            name="debtorType"
            control={control}
            label="Debtor type"
            labelPosition="left"
            options={constants.dropdownOptions.debtorType}
          />
          <FormDropdown
            name="status"
            control={control}
            label="Status"
            labelPosition="left"
            options={constants.dropdownOptions.status}
          />
        </div>

        <div className={styles.actions}>
          <Button type="submit">Find</Button>
          <Button type="button" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>
    </header>
  );
};
