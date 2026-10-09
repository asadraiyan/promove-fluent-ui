import { DatePicker } from "@fluentui/react-datepicker-compat";
import { makeStyles, tokens } from "@fluentui/react-components";
import React, { useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";

import { Button, FieldLabel, FormDropdown, FormInput } from "@/shared";
import { AddressDetailsFormValues } from "../AddressDetails.types";

const useStyles = makeStyles({
  title: {
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    marginBottom: tokens.spacingVerticalM,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "140px 1fr 160px 1fr auto",
    rowGap: tokens.spacingVerticalM,
    columnGap: tokens.spacingHorizontalM,
    alignItems: "center",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      alignItems: "stretch",
      "& > div:empty": {
        display: "none",
      },
    },
  },
  labelCell: {
    justifySelf: "end",
    textAlign: "right",
    "@media (max-width: 600px)": {
      justifySelf: "start",
      textAlign: "left",
    },
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

  const { today, minDobDate } = useMemo(() => {
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 120);
    return { today: currentDate, minDobDate: minDate };
  }, []);

  return (
    <section>
      <div className={styles.title}>Shipper Declaration :</div>
      <div className={styles.grid}>
        <div className={styles.labelCell}>
          <FieldLabel>Identification Indicator</FieldLabel>
        </div>
        <FormDropdown
          name="identificationIndicator"
          control={control}
          placeholder="Select Indicator"
          options={identificationIndicatorOptions}
        />
        <div className={styles.labelCell}>
          <FieldLabel>Customer Date of Birth</FieldLabel>
        </div>
        <DatePicker
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
          maxDate={today}
          minDate={minDobDate}
        />
        {/* <Button>Edit</Button> */}
        <div></div>
        <div className={styles.labelCell}>
          <FieldLabel>Foreign Id/EIN</FieldLabel>
        </div>
        <FormInput name="foreignIdEIN" control={control} />
        <div className={styles.labelCell}>
          <FieldLabel>Country of Issue</FieldLabel>
        </div>
        <FormDropdown
          name="countryOfIssue"
          control={control}
          placeholder="Select a country"
          options={countryOfIssueOptions}
        />
        <div />
      </div>
    </section>
  );
}

export default ShipperDeclaration;
