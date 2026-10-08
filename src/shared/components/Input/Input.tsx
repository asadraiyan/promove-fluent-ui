import React from "react";
import {
  Input,
  Text,
  type InputProps,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { useController } from "react-hook-form";
import {
  FieldLabel,
  type FieldLabelPosition,
} from "../FieldLabel/FieldLabel";
import {
  ResponsiveGrid,
  ResponsiveGridLabel,
} from "../layout/ResponsiveGrid";

type InputFieldProps = {
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  type?: InputProps["type"];
  className?: string;
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange, placeholder, id, type = "text", className }, ref) => {
    const inputValue =
      value === undefined || value === null ? "" : String(value);

    return (
      <Input
        id={id}
        type={type}
        value={inputValue}
        onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
        placeholder={placeholder}
        className={className}
        // Fluent Input's ref may be to the underlying input element; cast to any to satisfy types
        ref={ref as any}
      />
    );
  },
);

type FormInputProps = {
  name: string;
  control: any;
  label?: string;
  labelPosition?: FieldLabelPosition;
  labelClassName?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  type?: InputProps["type"];
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  rootInline: {
    gridTemplateColumns: "minmax(0, min(12rem, 40%)) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    minWidth: 0,
  },
  input: {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
  },
  error: {
    gridColumn: "1 / -1",
    color: tokens.colorPaletteRedForeground1,
    marginTop: tokens.spacingVerticalXS,
    fontSize: "12px",
  },
});

export const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  labelPosition = "top",
  labelClassName,
  className,
  placeholder,
  defaultValue,
  type,
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: defaultValue ?? "",
  });
  const styles = useStyles();
  const inline = labelPosition === "left" && Boolean(label);

  const fieldLabel = label && (
    <FieldLabel htmlFor={name} className={labelClassName}>
      {label}
    </FieldLabel>
  );
  const input = (
    <InputField
      {...field}
      placeholder={placeholder}
      id={name}
      type={type}
      className={styles.input}
    />
  );
  const error = fieldState.error?.message && (
    <Text className={styles.error}>{String(fieldState.error.message)}</Text>
  );

  return inline ? (
    <ResponsiveGrid className={`${styles.rootInline} ${className ?? ""}`.trim()}>
      {fieldLabel && <ResponsiveGridLabel>{fieldLabel}</ResponsiveGridLabel>}
      <div>{input}</div>
      {error}
    </ResponsiveGrid>
  ) : (
    <div className={`${styles.root} ${className ?? ""}`.trim()}>
      {fieldLabel}
      {input}
      {error}
    </div>
  );
};

export default InputField;
