import React from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { useForm } from "react-hook-form";

import { FormDropdown, FormInput, FormRadioGroup, ResponsiveGrid } from "@/shared";
import { Button } from "@/shared/components/Button/Button";

import {
  ACTION_CODE_OPTIONS,
  ASSIGNEE_OPTIONS,
  EDIT_OPTIONS,
  EMPTY_ACTION_FORM,
  EVENT_DATE_OPTIONS,
  GROUP_OPTIONS,
  TRIGGER_OPTIONS,
} from "../constants";
import type { TriggerActionFormValues } from "../Triggers.types";

interface ActionDetailsFormProps {
  onSave: (values: TriggerActionFormValues) => boolean;
}

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalM,
    minWidth: 0,
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
  },
  fields: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  codeGroup: {
    display: "grid",
    gridColumn: "1 / -1",
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) auto auto",
    alignItems: "end",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
    "@media (max-width: 720px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  fullRow: {
    gridColumn: "1 / -1",
  },
  emptyCell: {},
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: tokens.spacingVerticalS,
  },
});

export const ActionDetailsForm: React.FC<ActionDetailsFormProps> = ({
  onSave,
}) => {
  const styles = useStyles();
  const { control, handleSubmit, reset } = useForm<TriggerActionFormValues>({
    defaultValues: EMPTY_ACTION_FORM,
  });

const handleSave = (values: TriggerActionFormValues) => {
    const isAnyFieldFilled = Object.values(values).some((value) =>
      String(value ?? "").trim()
    );

    if (!isAnyFieldFilled) {
      return;
    }

    const isSaved = onSave(values);

    if (isSaved) {
      reset(EMPTY_ACTION_FORM);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
      <Text className={styles.title}>Action Details</Text>

      <ResponsiveGrid className={styles.fields}>
        <div className={styles.codeGroup}>
          <FormDropdown
            name="actionCode"
            control={control}
            label="Action Code:"
            labelPosition="left"
            placeholder="Select action code"
            options={ACTION_CODE_OPTIONS}
          />
          <FormDropdown
            name="group"
            control={control}
            label="Group:"
            labelPosition="left"
            placeholder="Select group"
            options={GROUP_OPTIONS}
          />

            <FormDropdown
            name="edit"
            control={control}
            options={EDIT_OPTIONS}
          />
          <Button type="button">Group</Button>
        </div>

        <div className={styles.fullRow}>
          <FormRadioGroup
            name="trigger"
            control={control}
            label="Trigger:"
            direction="horizontal"
            labelPosition="left"
            options={TRIGGER_OPTIONS}
          />
        </div>

        <FormDropdown
          name="eventDate"
          control={control}
          label="Event / Date:"
          labelPosition="left"
          placeholder="Select event or date"
          options={EVENT_DATE_OPTIONS}
        />
        <FormDropdown
          name="assignee"
          control={control}
          label="Assign To:"
          labelPosition="left"
          placeholder="Select assignee"
          options={ASSIGNEE_OPTIONS}
        />
        <FormInput
          name="sequenceNumber"
          control={control}
          label="Sequence No:"
          labelPosition="left"
          type="number"
        />
        <div className={styles.emptyCell} />
        <FormInput
          name="dueDate"
          control={control}
          label="Due Date:"
          labelPosition="left"
          type="number"
        />
      </ResponsiveGrid>

      <div className={styles.footer}>
        <Button appearance="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
