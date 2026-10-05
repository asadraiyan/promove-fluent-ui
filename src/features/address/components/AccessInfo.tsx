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

function AccessInfo() {
  const styles = useStyles();
  const { control } = useFormContext<AddressDetailsFormValues>();

  return (
    <div>
      Access Info
      <div>
        <div className={styles.fieldSet}>
          <FieldLabel>Access info</FieldLabel>
          <FormInput name="access-info" control={control} />
        </div>
        <div className={styles.fieldSet}>
          <FieldLabel>Directions</FieldLabel>
          <FormInput name="directions" control={control} />
        </div>
      </div>
    </div>
  );
}

export default AccessInfo;
