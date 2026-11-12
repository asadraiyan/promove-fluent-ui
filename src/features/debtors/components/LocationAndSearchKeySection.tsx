import { Checkbox, FormInput, TextAreaField } from "@/shared";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { DebtorsFormData } from "../types";

export const LocationAndSearchKeySection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "16px",
      }}
    >
      <FormInput
        name="searchKeys"
        control={control}
        label="Search keys"
        labelPosition="left"
      />

      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
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
        <TextAreaField
          name="locations"
          control={control}
          label="Locations"
          labelPosition="top"
          rows={3}
        />
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
