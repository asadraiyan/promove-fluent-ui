import {
  FormDropdown,
  FormInput,
  ResponsiveGrid,
} from "@/shared";
import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AddressDetailsFormValues } from "../AddressDetails.types";

const preferredOption = [
  { value: "email", label: "Email" },
  { value: "mobile", label: "Mobile" },
  { value: "phone", label: "Phone" },
];

const useStyles = makeStyles({
  grid: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
  },
});

function ContactDetails() {
  const { control } = useFormContext<AddressDetailsFormValues>();
  const styles = useStyles();

  return (
    <ResponsiveGrid className={styles.grid}>
      <FormInput label="Home Tel" labelPosition="left" name="homeTel" control={control} />

      <FormInput label="Office Tel" labelPosition="left" name="officeTel" control={control} />

      <FormInput label="Mobile 1" labelPosition="left" name="mobile1" control={control} />

      <FormInput label="Mobile 2" labelPosition="left" name="mobile2" control={control} />

      <FormInput label="Fax" labelPosition="left" name="fax" control={control} />

      <FormInput
        name="email"
        label="email"
        labelPosition="left"
        type="email"
        control={control}
        placeholder="example@sirva.com"
      />

      <FormDropdown
        name="preferred"
        control={control}
        label="Preferred"
        labelPosition="left"
        options={preferredOption}
      />

      <FormInput label="Alternate e-mail" labelPosition="left" name="alternateEmail" control={control} />
    </ResponsiveGrid>
  );
}

export default ContactDetails;
