import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Control } from "react-hook-form";
import { DebtorsFormData } from "../types";
import { FormInput } from "@/shared";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gap: tokens.spacingVerticalM + " " + tokens.spacingHorizontalM,
    gridTemplateColumns: "1fr",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const SunSpecificsSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  const styles = useStyles();

  return (
    <div className={styles.grid}>
      <FormInput name="lookupCode" control={control} label="Lookup code" />
      <FormInput
        name="accountGroupParent"
        control={control}
        label="Account group parent"
      />
    </div>
  );
};
