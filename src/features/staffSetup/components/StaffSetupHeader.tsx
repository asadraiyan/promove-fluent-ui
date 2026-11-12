
import React from "react";
import { Button, makeStyles, tokens, Text } from "@fluentui/react-components";
import { Controller, useForm } from "react-hook-form";
import { Dropdown, InputField } from "@/shared";

import { REGION_OPTIONS } from "../constants";
import type { StaffSetupHeaderProps } from "../StaffSetup.types";

interface StaffFilterFormValues {
  region: string;
  lastName: string;
}

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "220px minmax(0, 1fr)",
    alignItems: "stretch",
    borderBottom: `2px solid ${tokens.colorNeutralStroke2}`,
    minHeight: "68px",
    "@media (max-width: 720px)": {
      gridTemplateColumns: "1fr",
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
  },
  filter: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  region: {
    width: "250px",
  },
  lastName: {
    width: "220px",
  },
  actions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginLeft: "auto",
  },
});

export const StaffSetupHeader: React.FC<StaffSetupHeaderProps> = ({
  region,
  lastName,
  onRegionChange,
  onLastNameChange,
  onClear,
}) => {
  const styles = useStyles();

  const { control, handleSubmit, reset } = useForm<StaffFilterFormValues>({
    defaultValues: {
      region: region ?? "",
      lastName: lastName ?? "",
    },
  });

  const handleFind = (values: StaffFilterFormValues) => {
    onRegionChange(values.region);
    onLastNameChange(values.lastName);
  };

  const handleClear = () => {
    reset({
      region: "",
      lastName: "",
    });

    onClear();
  };

  return (
    <header className={styles.root}>
      <div className={styles.title}>
        <Text size={500} weight="semibold" style={{ color: "inherit" }}>
          Staff set-up
        </Text>
      </div>

      <form className={styles.filters} onSubmit={handleSubmit(handleFind)}>
        <div className={styles.filter}>
          <Text weight="semibold">Branches / Regions:</Text>

          <div className={styles.region}>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <Dropdown
                  aria-label="Filter by branch or region"
                  options={REGION_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="All regions"
                />
              )}
            />
          </div>
        </div>

        <div className={styles.filter}>
          <Text weight="semibold">Last name:</Text>

          <div className={styles.lastName}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <InputField
                  ariaLabel="Filter by last name"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="submit">Find</Button>
          <Button type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </header>
  );
};
