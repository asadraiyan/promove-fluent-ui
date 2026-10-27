import React from "react";
import { useFormContext } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import {
  FormInput,
  FormDropdown,
  ResponsiveGrid,
} from "../../../shared";

import type { AddressDetailsFormValues } from "../AddressDetails.types";

const PREFIX_OPTIONS = [
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
];

const useStyles = makeStyles({
  grid: {
    gridTemplateColumns:
      "minmax(72px, 0.65fr) minmax(120px, 1.7fr) minmax(100px, 1.2fr) minmax(110px, 1.45fr) minmax(100px, 1.1fr)",
    gap: tokens.spacingHorizontalS,
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
      <ResponsiveGrid className={styles.grid}>
        <div className={styles.field}>
          <FormDropdown
            name="prefix"
            control={control}
            label="Prefix"
            options={PREFIX_OPTIONS}
            placeholder="Select"
          />
        </div>

        <div className={styles.field}>
          <FormInput
            label="Name"
            name="firstName"
            control={control}
            placeholder=""
          />
        </div>

        <div className={styles.field}>
          <FormInput
            label="Middle"
            name="middleName"
            control={control}
            placeholder=""
          />
        </div>

        <div className={styles.field}>
          <FormInput
            label="Last"
            name="lastName"
            control={control}
            placeholder=""
          />
        </div>

        <div className={styles.field}>
          <FormInput
            label="Nick Name"
            name="nickName"
            control={control}
            placeholder=""
          />
        </div>
      </ResponsiveGrid>
    </section>
  );
};

export default NameSection;
