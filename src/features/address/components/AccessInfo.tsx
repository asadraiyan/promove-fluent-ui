import {
  ResponsiveGrid,
  TextAreaField,
} from "@/shared";
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
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
  },
});

function AccessInfo() {
  const styles = useStyles();
  const { control } = useFormContext<AddressDetailsFormValues>();

  return (
    <section>
      <div className={styles.title}>Access Info</div>
      <ResponsiveGrid className={styles.grid}>
        <TextAreaField
          name="accessInfo"
          control={control}
          label="Access info"
          labelPosition="left"
        />

        <TextAreaField
          name="directions"
          control={control}
          label="Directions"
          labelPosition="left"
        />
      </ResponsiveGrid>
    </section>
  );
}

export default AccessInfo;
