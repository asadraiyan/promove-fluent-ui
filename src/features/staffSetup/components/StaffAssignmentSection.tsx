
import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Controller, Control } from "react-hook-form";
import { Checkbox, FormInput, FormDropdown, ResponsiveGrid } from "@/shared";

import { CREW_ROLE_OPTIONS } from "../constants";
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
  assignmentRow: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
  },
  crewRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    minWidth: 0,
  },
  crewRole: {
    minWidth: "160px",
    flex: "1 1 160px",
  },
  shortInput: {
    maxWidth: "280px",
  },
});

interface StaffAssignmentSectionProps {
  control: Control<StaffFormValues>;
}

export const StaffAssignmentSection: React.FC<
  StaffAssignmentSectionProps
> = ({ control }) => {
  const styles = useStyles();

  return (
    <section className={styles.section} aria-label="Staff assignment">
      <ResponsiveGrid className={styles.assignmentRow}>
        <div className={styles.crewRow}>
          <Controller
            name="crewMember"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value === "Yes"}
                onChange={(_, data) =>
                  field.onChange(data.checked ? "Yes" : "No")
                }
                label="Crew member"
              />
            )}
          />

          <div className={styles.crewRole}>
            <FormDropdown
              name="crewRole"
              control={control}
              label=""
              placeholder="Select role"
              options={CREW_ROLE_OPTIONS}
            />
          </div>
        </div>

        <FormInput
          name="initials"
          control={control}
          label="Initials:"
          labelPosition="left"
        />
      </ResponsiveGrid>

      <FormInput
        name="timeCardRef"
        control={control}
        label="Time card ref:"
        labelPosition="left"
      />

      <FormInput
        name="niRef"
        control={control}
        label="NI ref:"
        labelPosition="left"
      />
    </section>
  );
};
