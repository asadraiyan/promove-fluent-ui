import React from "react";
import { Text, makeStyles, tokens } from "@fluentui/react-components";
import { Control } from "react-hook-form";
import { FormInput, FormDropdown, ResponsiveGrid } from "@/shared";

import {
  REGION_OPTIONS,
  STAFF_STATUS_OPTIONS,
  TITLE_OPTIONS,
} from "../constants";
import type { StaffFormValues } from "../StaffSetup.types";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  sectionTitle: {
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalXS,
  },
  staffFields: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    width: "100%",
  },
  shortInput: {
    maxWidth: "280px",
  },
});

interface StaffDetailsSectionProps {
  control: Control<StaffFormValues>;
}

export const StaffDetailsSection: React.FC<StaffDetailsSectionProps> = ({
  control,
}) => {
  const styles = useStyles();

  return (
    <section className={styles.section} aria-labelledby="details-title">
      <Text id="details-title" className={styles.sectionTitle}>
        Staff details
      </Text>

      <ResponsiveGrid className={styles.staffFields}>
        <FormDropdown
          name="ownerCode"
          control={control}
          label="Owner code:"
          labelPosition="left"
          placeholder="Select owner code"
          options={[
            { value: "owner-001", label: "OWNER-001" },
            { value: "owner-002", label: "OWNER-002" },
            { value: "owner-003", label: "OWNER-003" },
          ]}
        />

        <FormDropdown
          name="region"
          control={control}
          label="Region:"
          labelPosition="left"
          placeholder="Select region"
          options={REGION_OPTIONS}
        />

        <FormInput
          name="pmUserId"
          control={control}
          label="PM User ID:"
          labelPosition="left"
        />

        <FormDropdown
          name="title"
          control={control}
          label="Title:"
          labelPosition="left"
          placeholder="Select title"
          options={TITLE_OPTIONS}
        />

        <FormInput
          name="firstName"
          control={control}
          label="First:"
          labelPosition="left"
        />

        <FormInput
          name="lastName"
          control={control}
          label="Last:"
          labelPosition="left"
        />

        <FormDropdown
          name="status"
          control={control}
          label="Status:"
          labelPosition="left"
          options={STAFF_STATUS_OPTIONS}
        />
      </ResponsiveGrid>
    </section>
  );
};