import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Controller, Control } from "react-hook-form";
import { DebtorsFormData } from "../types";
import constants from "../constants.json";
import { Checkbox, FormDropdown, FormInput, TextAreaField } from "@/shared";

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

export const PaymentTermsSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  const styles = useStyles();

  return (
    <div className={styles.grid}>
      <FormDropdown
        name="paymentTerms"
        control={control}
        label="Payment Terms"
        options={constants.dropdownOptions.paymentTerms}
      />
      <FormDropdown
        name="accountTypeAnalysisCode"
        control={control}
        label="Account Type Analysis Code"
        options={constants.dropdownOptions.accountType}
      />
      <FormDropdown
        name="vendorPaymentStatus"
        control={control}
        label="Vendor Payment Status"
        options={constants.dropdownOptions.vendorPaymentStatus}
      />
      <FormDropdown
        name="vendorPaymentMethod"
        control={control}
        label="Vendor Payment Method"
        options={constants.dropdownOptions.vendorPaymentMethod}
      />
      <FormDropdown
        name="vendorPaymentCurrency"
        control={control}
        label="Vendor Payment Currency"
        options={constants.dropdownOptions.currency}
      />
      <FormInput name="tinNumber" control={control} label="TIN Number" />
      <FormInput name="ssn" control={control} label="SSN#" />

      <div className={styles.fullWidth}>
        <TextAreaField name="notes" control={control} label="Notes" rows={4} />
      </div>

      <Controller
        name="withHolding"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="With Holding"
            checked={value}
            onChange={(_, d) => onChange(d.checked)}
          />
        )}
      />
    </div>
  );
};
