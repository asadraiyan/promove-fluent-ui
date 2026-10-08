import { DatePicker } from "@fluentui/react-datepicker-compat";
import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

import {
  FieldLabel,
  FormDropdown,
  FormInput,
  ResponsiveGrid,
} from "@/shared";
import { AddressDetailsFormValues } from "../AddressDetails.types";

const useStyles = makeStyles({
  title: {
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    marginBottom: tokens.spacingVerticalM,
  },
  grid: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalM,
    columnGap: tokens.spacingHorizontalM,
  },
  dateGrid: {
    gridTemplateColumns: "160px minmax(0, 1fr)",
    gap: tokens.spacingHorizontalM,
  },
});

const identificationIndicatorOptions = [
  { value: "passport", label: "Passport" },
  { value: "national-id", label: "National ID" },
];

const countryOfIssueOptions = [
  { value: "india", label: "India" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

function ShipperDeclaration() {
  const { control } = useFormContext<AddressDetailsFormValues>();
  const { field: dateOfBirthField } = useController({
    name: "customerDateOfBirth",
    control,
  });
  const styles = useStyles();

  return (
    <section>
      <div className={styles.title}>Shipper Declaration :</div>
      <ResponsiveGrid className={styles.grid}>
        <FormDropdown
          name="identificationIndicator"
          control={control}
          label="Identification Indicator"
          labelPosition="left"
          placeholder="Select Indicator"
          options={identificationIndicatorOptions}
        />
        <ResponsiveGrid className={styles.dateGrid}>
          <FieldLabel htmlFor="customerDateOfBirth">
            Customer Date of Birth
          </FieldLabel>
          <DatePicker
            id="customerDateOfBirth"
            placeholder="Select a date"
            value={
              dateOfBirthField.value
                ? new Date(`${dateOfBirthField.value}T00:00:00`)
                : null
            }
            onSelectDate={(date) =>
              dateOfBirthField.onChange(date ? formatDate(date) : "")
            }
            formatDate={(date) => (date ? formatDate(date) : "")}
          />
        </ResponsiveGrid>
        <FormInput
          name="foreignIdEIN"
          control={control}
          label="Foreign Id/EIN"
          labelPosition="left"
        />
        <FormDropdown
          name="countryOfIssue"
          control={control}
          label="Country of Issue"
          labelPosition="left"
          placeholder="Select a country"
          options={countryOfIssueOptions}
        />
      </ResponsiveGrid>
    </section>
  );
}

export default ShipperDeclaration;
