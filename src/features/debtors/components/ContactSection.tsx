import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Control } from "react-hook-form";
import { DebtorsFormData } from "../types";
import constants from "../constants.json";
import { FormDropdown, FormInput } from "@/shared";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gap: tokens.spacingVerticalM + " " + tokens.spacingHorizontalM,
    gridTemplateColumns: "1fr",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const ContactSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  const styles = useStyles();

  return (
    <div className={styles.grid}>
      <FormDropdown
        name="contactTitle"
        control={control}
        label="Title"
        options={constants.dropdownOptions.title}
      />
      <FormInput name="contactName" control={control} label="Name" />
      <FormInput name="contactEmail" control={control} label="E-mail" />
      <FormInput name="contactTel" control={control} label="Tel" />
      <FormInput name="contactMobile" control={control} label="Mobile" />
    </div>
  );
};
