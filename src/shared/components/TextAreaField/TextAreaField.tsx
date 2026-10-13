import React from "react";
import { makeStyles, Textarea, tokens } from "@fluentui/react-components";
import { useController } from "react-hook-form";

import {
  FieldLabel,
  type FieldLabelPosition,
} from "../FieldLabel/FieldLabel";
import {
  ResponsiveGrid,
  ResponsiveGridLabel,
} from "../layout/ResponsiveGrid";

const useStyles = makeStyles({
  inline: {
    gridTemplateColumns: "minmax(0, min(12rem, 40%)) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
  },
  textarea: {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
  },
});

export type TextAreaFieldProps = {
  name: string;
  control: any;
  label?: string;
  rows?: number;
  defaultValue?: string;
  className?: string;
  labelClassName?: string;
  labelPosition?: FieldLabelPosition;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  control,
  label,
  rows = 2,
  defaultValue = "",
  className,
  labelClassName,
  labelPosition = "top",
}) => {
  const { field } = useController({ name, control, defaultValue });
  const styles = useStyles();
  const inline = labelPosition === "left" && Boolean(label);
  const fieldLabel = label && (
    <FieldLabel htmlFor={name} className={labelClassName}>
      {label}
    </FieldLabel>
  );
  const textarea = (
    <Textarea
      id={name}
      name={field.name}
      value={field.value ?? ""}
      onChange={(event) => field.onChange(event.currentTarget.value)}
      onBlur={field.onBlur}
      ref={field.ref as any}
      rows={rows}
      className={styles.textarea}
    />
  );

  return inline ? (
    <ResponsiveGrid className={`${styles.inline} ${className ?? ""}`.trim()}>
      {fieldLabel && <ResponsiveGridLabel>{fieldLabel}</ResponsiveGridLabel>}
      <div>{textarea}</div>
    </ResponsiveGrid>
  ) : (
    <div className={className}>
      {fieldLabel}
      {textarea}
    </div>
  );
};

export default TextAreaField;