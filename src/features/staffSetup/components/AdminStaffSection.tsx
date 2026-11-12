
import React from "react";
import { Text, makeStyles, tokens } from "@fluentui/react-components";
import { Control, Controller } from "react-hook-form";
import {
  Checkbox,
  FormInput,
  FormDropdown,
  ResponsiveGrid,
} from "@/shared";

import {
  SUPERVISOR_OPTIONS,
  TEAM_OPTIONS,
  TOLERANCE_OPTIONS,
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
  splitFields: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  marginRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
  },
});

interface AdminStaffSectionProps {
  control: Control<StaffFormValues>;
}

export const AdminStaffSection: React.FC<AdminStaffSectionProps> = ({
  control,
}) => {
  const styles = useStyles();

  return (
    <section className={styles.section} aria-labelledby="admin-title">
      <Text id="admin-title" className={styles.sectionTitle}>
        Specific for Admin staff
      </Text>

      <FormDropdown
        name="toleranceLevel"
        control={control}
        label="Tolerance level:"
        labelPosition="left"
        placeholder="Select tolerance level"
        options={TOLERANCE_OPTIONS}
      />

      <FormInput
        name="phoneCode"
        control={control}
        label="Phone:"
        labelPosition="left"
      />

      <FormInput
        name="faxCode"
        control={control}
        label="Fax:"
        labelPosition="left"
      />

      <FormInput
        name="email"
        control={control}
        label="E-mail:"
        labelPosition="left"
        type="email"
      />

      <FormInput
        name="email2"
        control={control}
        label="E-mail 2:"
        labelPosition="left"
        type="email"
      />

      <FormInput
        name="email3"
        control={control}
        label="E-mail 3:"
        labelPosition="left"
        type="email"
      />

      <ResponsiveGrid className={styles.marginRow}>
        <FormInput
          name="marginNegative"
          control={control}
          label="Margin negative:"
          labelPosition="left"
          type="number"
        />

        <Controller
          name="ccaMember"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value === "Yes"}
              onChange={(_, data) =>
                field.onChange(data.checked ? "Yes" : "No")
              }
              label="CCA member"
            />
          )}
        />
      </ResponsiveGrid>

      <FormInput
        name="marginPositive"
        control={control}
        label="Margin positive:"
        labelPosition="left"
        type="number"
      />

      <FormDropdown
        name="supervisor"
        control={control}
        label="Supervisor:"
        labelPosition="left"
        placeholder="Select supervisor"
        options={SUPERVISOR_OPTIONS}
      />

      <FormDropdown
        name="team"
        control={control}
        label="Team #:"
        labelPosition="left"
        placeholder="Select team"
        options={TEAM_OPTIONS}
      />
    </section>
  );
};
