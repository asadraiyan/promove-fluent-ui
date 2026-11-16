import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Control } from "react-hook-form";
import { DebtorsFormData } from "../types";
import constants from "../constants.json";
import { FormDropdown, FormInput, TextAreaField } from "@/shared";

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
  fullWidth: {
    gridColumn: "1 / -1",
  },
});

export const VatRegistrationSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  const styles = useStyles();

  return (
    <div className={styles.grid}>
      <FormDropdown
        name="vatRegistration"
        control={control}
        label="VAT registration"
        options={constants.dropdownOptions.vatRegistration}
      />
      <FormInput name="vatNumber" control={control} label="VAT number" />
      <FormInput
        name="vatRegistrationNumber"
        control={control}
        label="VAT registration number"
      />
      <FormInput name="dunsNumber" control={control} label="DUNS number" />
      <FormDropdown
        name="invoicePrintMode"
        control={control}
        label="Invoice print mode"
        options={constants.dropdownOptions.invoicePrintMode}
      />
      <FormDropdown
        name="collectionMode"
        control={control}
        label="Collection mode"
        options={constants.dropdownOptions.collectionMode}
      />
      <FormDropdown
        name="termsOfPayment"
        control={control}
        label="Terms of payment"
        options={constants.dropdownOptions.termsOfPayment}
      />
      <FormDropdown
        name="defaultCurrency"
        control={control}
        label="Default currency"
        options={constants.dropdownOptions.currency}
      />
      <FormDropdown
        name="fxEffectiveDate"
        control={control}
        label="FX effective date"
        options={[]}
        placeholder="Select Date"
      />
      <FormDropdown
        name="defaultLanguage"
        control={control}
        label="Default language"
        options={constants.dropdownOptions.language}
      />

      <div className={styles.fullWidth}>
        <TextAreaField
          name="invoiceNote"
          control={control}
          label="Invoice note"
          rows={3}
        />
      </div>
    </div>
  );
};
