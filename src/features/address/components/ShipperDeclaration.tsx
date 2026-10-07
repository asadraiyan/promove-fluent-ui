import { Button, Dropdown, FieldLabel, FormInput } from "@/shared";
import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useFormContext } from "react-hook-form";
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
  { value: "mark", label: "Mark" },
  { value: "color", label: "Color" },
];

const birthDateDigitOptions = Array.from({ length: 10 }, (_, index) => ({
  value: String(index),
  label: String(index),
}));

const issueOptions = Array.from({ length: 10 }, (_, index) => ({
  value: String(index),
  label: String(index),
}));

function ShipperDeclaration() {
  const { control } = useFormContext<AddressDetailsFormValues>();
  const styles = useStyles();
  return (
    <section>
      <div className={styles.title}>Shipper Declaration :</div>
      <div className={styles.grid}>
        <div className={styles.labelCell}>
          <FieldLabel>Identification Indicator</FieldLabel>
        </div>
        <Dropdown
          placeholder="Select Indicator"
          options={identificationIndicatorOptions}
        />
        <div className={styles.labelCell}>
          <FieldLabel>Customer Date of Birth</FieldLabel>
        </div>
        <Dropdown placeholder="Select a date" options={birthDateDigitOptions} />
        <Button>Edit</Button>
        <div className={styles.labelCell}>
          <FieldLabel>Foreign Id/EIN</FieldLabel>
        </div>
        <FormInput name="foreignId" control={control} />
        <div className={styles.labelCell}>
          <FieldLabel>Country of Issue</FieldLabel>
        </div>
        <Dropdown placeholder="Select a Issue" options={issueOptions} />
        <div />{" "}
      </div>
    </section>
  );
}

export default ShipperDeclaration;
