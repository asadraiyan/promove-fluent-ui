import { FieldLabel, FormInput, TextAreaField } from "@/shared";
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
    gridTemplateColumns: "100px 1fr",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
    alignItems: "center",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      alignItems: "stretch",
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

function AccessInfo() {
  const styles = useStyles();
  const { control } = useFormContext<AddressDetailsFormValues>();

  return (
    <section>
      <div className={styles.title}>Access Info</div>
      <div className={styles.grid}>
        <div className={styles.labelCell}>
          <FieldLabel>Access info</FieldLabel>
        </div>
        {/* <FormInput name="accessInfo" control={control} /> */}
        <TextAreaField name="accessInfo" control={control} />

        <div className={styles.labelCell}>
          <FieldLabel>Directions</FieldLabel>
        </div>
        {/* <FormInput name="directions" control={control} /> */}
        <TextAreaField name="directions" control={control} />
      </div>
    </section>
  );
}

export default AccessInfo;
