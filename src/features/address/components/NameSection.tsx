import React from "react";
import { useFormContext } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import {
  FormInput,
  FormDropdown,
  FieldLabel,
} from "../../../shared";

import type { AddressDetailsFormValues } from "../AddressDetails.types";
import { PREFIX_OPTIONS } from "../constants";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(72px, 0.65fr) minmax(120px, 1.7fr) minmax(100px, 1.2fr) minmax(110px, 1.45fr) minmax(100px, 1.1fr)",
    gap: tokens.spacingHorizontalXS,
    alignItems: "start",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    "& > div": {
      width: "100%",
      minWidth: 0,
    },
    "& select, & input": {
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
    },
  },
});

const NameSection: React.FC = () => {
  const { control } = useFormContext<AddressDetailsFormValues>();
  const styles = useStyles();

  return (
    <section>
      <div className={styles.grid}>

        {/* Prefix */}
        <div className={styles.field}>
          <FieldLabel>Prefix</FieldLabel>

          <FormDropdown
            name="prefix"
            control={control}
            options={PREFIX_OPTIONS}
            placeholder="Select"
          />
        </div>

        {/* Name */}
        <div className={styles.field}>
          <FieldLabel>Name</FieldLabel>

          <FormInput
            name="firstName"
            control={control}
            placeholder=""
          />
        </div>

        {/* Middle */}
        <div className={styles.field}>
          <FieldLabel>Middle</FieldLabel>

          <FormInput
            name="middleName"
            control={control}
            placeholder=""
          />
        </div>

        {/* Last */}
        <div className={styles.field}>
          <FieldLabel>Last</FieldLabel>

          <FormInput
            name="lastName"
            control={control}
            placeholder=""
          />
        </div>

        {/* Nick Name */}
        <div className={styles.field}>
          <FieldLabel>Nick Name</FieldLabel>

          <FormInput
            name="nickName"
            control={control}
            placeholder=""
          />
        </div>

      </div>
    </section>
  );
};

export default NameSection;