import { Button, Dropdown, FieldLabel, FormInput } from "@/shared";
import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useForm } from "react-hook-form";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    gap: tokens.spacingVerticalXL,
  },
  fieldSet: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
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
  const { control } = useForm();
  const styles = useStyles();
  return (
    <>
      <section className={styles.root}>
        <div className={styles.fieldSet}>
          <FieldLabel>Identification Indicator</FieldLabel>
          <Dropdown
            placeholder="Select Indicator"
            options={identificationIndicatorOptions}
          />
        </div>
        <div className={styles.fieldSet}>
          <FieldLabel>Customer Date of Birth</FieldLabel>
          <Dropdown
            placeholder="Select a date"
            options={birthDateDigitOptions}
          />
          <Button>Edit</Button>
        </div>
        <div className={styles.fieldSet}>
          <FieldLabel>Foreign Id/EIN</FieldLabel>
          <FormInput name="foreignId" control={control} />
        </div>
        <div className={styles.fieldSet}>
          <FieldLabel>Country of Issue</FieldLabel>
          <Dropdown placeholder="Select a Issue" options={issueOptions} />
        </div>
      </section>
    </>
  );
}

export default ShipperDeclaration;
