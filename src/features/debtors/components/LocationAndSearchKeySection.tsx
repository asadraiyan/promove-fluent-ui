import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Controller, Control } from "react-hook-form";
import { DebtorsFormData } from "../types";
import { Checkbox, FormInput, TextAreaField } from "@/shared";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gap: tokens.spacingVerticalM + " " + tokens.spacingHorizontalM,
    gridTemplateColumns: "1fr",
    alignItems: "end",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
});

export const LocationAndSearchKeySection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  const styles = useStyles();

  return (
    <div className={styles.grid}>
      <FormInput name="searchKeys" control={control} label="Search keys" />

      <div
        className={styles.fullWidth}
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "16px",
        }}
      >
        <Controller
          name="directDebit"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              label="Direct Debit"
              checked={value}
              onChange={(_, d) => onChange(d.checked)}
            />
          )}
        />

        <div style={{ flex: "1 1 300px" }}>
          <TextAreaField
            name="locations"
            control={control}
            label="Locations"
            rows={3}
          />
        </div>

        <Controller
          name="allowPriceIncrease"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              label="Allow price increase"
              checked={value}
              onChange={(_, d) => onChange(d.checked)}
            />
          )}
        />
      </div>
    </div>
  );
};
