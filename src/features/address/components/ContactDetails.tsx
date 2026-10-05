import { Dropdown, FieldLabel, FormInput } from "@/shared";
import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { AddressDetailsFormValues } from "../AddressDetails.types";

const useStyles = makeStyles({
  fieldSet: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
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
    <div>
      ContactDetails
      <div className={styles.fieldSet}>
        <FieldLabel>Home Tel</FieldLabel>
        <FormInput name="home-tel" control={control} />
      </div>
      <div className={styles.fieldSet}>
        <FieldLabel>Home Tel</FieldLabel>
        <FormInput name="home-tel" control={control} />
      </div>
      <div className={styles.fieldSet}>
        <FieldLabel>Home Tel</FieldLabel>
        <FormInput name="home-tel" control={control} />
      </div>
      <div className={styles.fieldSet}>
        <FieldLabel>Home Tel</FieldLabel>
        <FormInput name="home-tel" control={control} />
      </div>
      <div className={styles.fieldSet}>
        <FieldLabel>Home Tel</FieldLabel>
        <FormInput name="home-tel" control={control} />
      </div>
      <div className={styles.fieldSet}>
        <FieldLabel>Email</FieldLabel>
        <FormInput
          name="email"
          type="email"
          control={control}
          placeholder="example@sirva.com"
        />
      </div>
      <div className={styles.fieldSet}>
        <FieldLabel>Preferred</FieldLabel>
        <Dropdown options={preferredOption} />
      </div>
      <div className={styles.fieldSet}>
        <FieldLabel>Alternate Email</FieldLabel>
        <FormInput name="alt-email" control={control} />
      </div>
    </div>
  );
}

export default ContactDetails;
