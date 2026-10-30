import React from "react";
import {
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { FormDate } from "../Date/FormDate";
import { FormDropdown } from "../Dropdown/Dropdown";
import { FormInput } from "../Input/Input";
import { ResponsiveGrid } from "../layout/ResponsiveGrid";
import { TextAreaField } from "../TextAreaField/TextAreaField";

interface ActionDetailsFieldBase<T extends FieldValues> {
  name: Path<T>;
  label: string;
  disabled?: boolean;
}

export type ActionDetailsFieldDefinition<T extends FieldValues> =
  | (ActionDetailsFieldBase<T> & {
      type: "select";
      options: ReadonlyArray<{ value: string; label: string }>;
    })
  | (ActionDetailsFieldBase<T> & {
      type: "date" | "text" | "number";
    })
  | (ActionDetailsFieldBase<T> & {
      type: "textarea";
      rows?: number;
    });

interface ActionDetailsFieldsProps<T extends FieldValues> {
  control: Control<T>;
  fields: ReadonlyArray<ActionDetailsFieldDefinition<T>>;
}

const useStyles = makeStyles({
  fields: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
    width: "100%",
  },
  field: {
    minWidth: 0,
    "& [data-responsive-grid-label]": {
      minWidth: "min(12rem, 40%)",
      justifySelf: "start",
      textAlign: "left",
    },
  },
  textarea: {
    "& [data-responsive-grid-label]": {
      alignSelf: "start",
      paddingTop: tokens.spacingVerticalS,
    },
  },
});

export const ActionDetailsFields = <T extends FieldValues>({
  control,
  fields,
}: ActionDetailsFieldsProps<T>): React.ReactElement => {
  const styles = useStyles();

  return (
    <ResponsiveGrid className={styles.fields}>
      {fields.map((field) => {
        const className =
          field.type === "textarea"
            ? `${styles.field} ${styles.textarea}`
            : styles.field;

        if (field.type === "select") {
          return (
            <FormDropdown
              key={field.name}
              name={field.name}
              control={control}
              label={field.label}
              labelPosition="left"
              options={[...field.options]}
              disabled={field.disabled}
              className={className}
            />
          );
        }

        if (field.type === "date") {
          return (
            <FormDate
              key={field.name}
              name={field.name}
              label={field.label}
              disabled={field.disabled}
              orientation="horizontal"
              className={className}
            />
          );
        }

        if (field.type === "textarea") {
          return (
            <TextAreaField
              key={field.name}
              name={field.name}
              control={control}
              label={field.label}
              labelPosition="left"
              rows={field.rows}
              className={className}
            />
          );
        }

        return (
          <FormInput
            key={field.name}
            name={field.name}
            control={control}
            label={field.label}
            labelPosition="left"
            type={field.type}
            disabled={field.disabled}
            className={className}
          />
        );
      })}
    </ResponsiveGrid>
  );
};
