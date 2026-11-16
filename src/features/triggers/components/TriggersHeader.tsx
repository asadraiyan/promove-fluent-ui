import React from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { Controller, useForm } from "react-hook-form";

import { Dropdown, ResponsiveGrid } from "@/shared";
import { Button } from "@/shared/components/Button/Button";

import {
  ACTION_CODE_OPTIONS,
  GROUP_OPTIONS,
  MOVE_TYPE_OPTIONS,
  OWNER_OPTIONS,
} from "../constants";
import type { TriggerFilters, TriggersHeaderProps } from "../Triggers.types";

const EMPTY_FILTERS: TriggerFilters = {
  actionCode: "",
  group: "",
  owner: "",
  moveType: "",
};

const useStyles = makeStyles({
  root: {
    gridTemplateColumns: "minmax(150px, 185px) minmax(0, 1fr)",
    alignItems: "stretch",
    gap: tokens.spacingHorizontalL,
    minHeight: "68px",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    // backgroundColor: "#159c9c",
    borderBottom: `2px solid ${tokens.colorNeutralStroke2}`,
    "@media (max-width: 720px)": {
      padding: tokens.spacingHorizontalS,
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    // backgroundColor: "#12344a",
    fontWeight: tokens.fontWeightSemibold,
  },
  filters: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    minWidth: 0,
  },
  filterFields: {
    gridTemplateColumns: "repeat(2, minmax(180px, 1fr))",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flex: "1 1 760px",
    minWidth: 0,
  },
  filterField: {
    minWidth: 0,
    "& [data-responsive-grid-label]": {
      color: "#102d3e",
      fontWeight: tokens.fontWeightSemibold,
    },
  },
  actions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginLeft: "auto",
  },
});

export const TriggersHeader: React.FC<TriggersHeaderProps> = ({
  onFind,
  onClear,
}) => {
  const styles = useStyles();
  const { control, handleSubmit, reset } = useForm<TriggerFilters>({
    defaultValues: EMPTY_FILTERS,
  });

  const handleClear = () => {
    reset(EMPTY_FILTERS);
    onClear();
  };

  return (
    <header>
      <ResponsiveGrid className={styles.root}>
        <Text size={500} className={styles.title}>
          Triggers
        </Text>

        <form
          className={styles.filters}
          onSubmit={handleSubmit(onFind)}
        >
          <ResponsiveGrid className={styles.filterFields}>
            <Controller
              name="actionCode"
              control={control}
              render={({ field }) => (
                <Dropdown
                  label="Action Code:"
                  labelPosition="left"
                  ariaLabel="Filter by action code"
                  options={ACTION_CODE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="All"
                  className={styles.filterField}
                />
              )}
            />
            <Controller
              name="group"
              control={control}
              render={({ field }) => (
                <Dropdown
                  label="Group:"
                  labelPosition="left"
                  ariaLabel="Filter by group"
                  options={GROUP_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="All"
                  className={styles.filterField}
                />
              )}
            />
            <Controller
              name="owner"
              control={control}
              render={({ field }) => (
                <Dropdown
                  label="Owner:"
                  labelPosition="left"
                  ariaLabel="Filter by owner"
                  options={OWNER_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="All"
                  className={styles.filterField}
                />
              )}
            />
            <Controller
              name="moveType"
              control={control}
              render={({ field }) => (
                <Dropdown
                  label="Move Type:"
                  labelPosition="left"
                  ariaLabel="Filter by move type"
                  options={MOVE_TYPE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="All"
                  className={styles.filterField}
                />
              )}
            />
          </ResponsiveGrid>
          <div className={styles.actions}>
            <Button appearance="primary" type="submit">
              Find
            </Button>
            <Button type="button" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>
      </ResponsiveGrid>
    </header>
  );
};
