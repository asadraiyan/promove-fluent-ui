import React from "react";
import constants from "../constants.json";
import { FormDropdown, FormInput, TextAreaField } from "@/shared";
import { DebtorsFormData } from "../types";
import { Control } from "react-hook-form";
export const VatRegistrationSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <FormDropdown
        name="vatRegistration"
        control={control}
        label="VAT registration"
        labelPosition="left"
        options={constants.dropdownOptions.vatRegistration}
      />
      <FormInput
        name="vatNumber"
        control={control}
        label="VAT number"
        labelPosition="left"
      />
      <FormInput
        name="vatRegistrationNumber"
        control={control}
        label="VAT registration number"
        labelPosition="left"
      />
      <FormInput
        name="dunsNumber"
        control={control}
        label="DUNS number"
        labelPosition="left"
      />
      <FormDropdown
        name="invoicePrintMode"
        control={control}
        label="Invoice print mode"
        labelPosition="left"
        options={constants.dropdownOptions.invoicePrintMode}
      />
      <FormDropdown
        name="collectionMode"
        control={control}
        label="Collection mode"
        labelPosition="left"
        options={constants.dropdownOptions.collectionMode}
      />
      <FormDropdown
        name="termsOfPayment"
        control={control}
        label="Terms of payment"
        labelPosition="left"
        options={constants.dropdownOptions.termsOfPayment}
      />
      <FormDropdown
        name="defaultCurrency"
        control={control}
        label="Default currency"
        labelPosition="left"
        options={constants.dropdownOptions.currency}
      />
      <FormDropdown
        name="fxEffectiveDate"
        control={control}
        label="FX effective date"
        labelPosition="left"
        options={[]}
        placeholder="Select Date"
      />
      <FormDropdown
        name="defaultLanguage"
        control={control}
        label="Default language"
        labelPosition="left"
        options={constants.dropdownOptions.language}
      />
      <TextAreaField
        name="invoiceNote"
        control={control}
        label="Invoice note"
        labelPosition="left"
        rows={3}
      />
    </div>
  );
};
