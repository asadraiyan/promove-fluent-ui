import React from "react";
import { Control, Controller } from "react-hook-form";
import constants from "../constants.json";
import { Checkbox, FormDropdown, FormInput, TextAreaField } from "@/shared";
import { DebtorsFormData } from "../types";
export const PaymentTermsSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <FormDropdown
        name="paymentTerms"
        control={control}
        label="Payment Terms"
        labelPosition="left"
        options={constants.dropdownOptions.paymentTerms}
      />
      <FormDropdown
        name="accountTypeAnalysisCode"
        control={control}
        label="Account Type Analysis Code"
        labelPosition="left"
        options={constants.dropdownOptions.accountType}
      />
      <FormDropdown
        name="vendorPaymentStatus"
        control={control}
        label="Vendor Payment Status"
        labelPosition="left"
        options={constants.dropdownOptions.vendorPaymentStatus}
      />
      <FormDropdown
        name="vendorPaymentMethod"
        control={control}
        label="Vendor Payment Method"
        labelPosition="left"
        options={constants.dropdownOptions.vendorPaymentMethod}
      />
      <FormDropdown
        name="vendorPaymentCurrency"
        control={control}
        label="Vendor Payment Currency"
        labelPosition="left"
        options={constants.dropdownOptions.currency}
      />
      <FormInput
        name="tinNumber"
        control={control}
        label="TIN Number"
        labelPosition="left"
      />
      <FormInput
        name="ssn"
        control={control}
        label="SSN#"
        labelPosition="left"
      />
      <TextAreaField
        name="notes"
        control={control}
        label="Notes"
        labelPosition="left"
        rows={4}
      />
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
