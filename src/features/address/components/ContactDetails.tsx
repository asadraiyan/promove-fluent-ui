import { Dropdown, FieldLabel, FormInput } from "@/shared";
import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AddressDetailsFormValues } from "../AddressDetails.types";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "100px 1fr",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  labelCell: {
    justifySelf: "end",
    textAlign: "right",
  },
});

const preferredOption = [
  { value: "mark", label: "Mark" },
  { value: "color", label: "Color" },
];

function ContactDetails() {
  const styles = useStyles();
  const { control } = useFormContext<AddressDetailsFormValues>();

  return (
    <div className={styles.grid}>
      <div className={styles.labelCell}>
        <FieldLabel>Home Tel</FieldLabel>
      </div>
      <FormInput name="homeTel" control={control} />

      <div className={styles.labelCell}>
        <FieldLabel>Office Tel</FieldLabel>
      </div>
      <FormInput name="officeTel" control={control} />

      <div className={styles.labelCell}>
        <FieldLabel>Mobile 1</FieldLabel>
      </div>
      <FormInput name="mobile1" control={control} />

      <div className={styles.labelCell}>
        <FieldLabel>Mobile 2</FieldLabel>
      </div>
      <FormInput name="mobile2" control={control} />

      <div className={styles.labelCell}>
        <FieldLabel>Fax</FieldLabel>
      </div>
      <FormInput name="fax" control={control} />

      <div className={styles.labelCell}>
        <FieldLabel>email</FieldLabel>
      </div>
      <FormInput
        name="email"
        type="email"
        control={control}
        placeholder="example@sirva.com"
      />

      <div className={styles.labelCell}>
        <FieldLabel>Preferred</FieldLabel>
      </div>
      <Dropdown options={preferredOption} />

      <div className={styles.labelCell}>
        <FieldLabel>Alternate e-mail</FieldLabel>
      </div>
      <FormInput name="altEmail" control={control} />
    </div>
  );
}

export default ContactDetails;
