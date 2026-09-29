import React from "react";
import {
  Input,
  Text,
  type InputProps,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { useController } from "react-hook-form";

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
  label: {
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
    marginTop: tokens.spacingVerticalXS,
    fontSize: "12px",
  },
});

export const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
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

  return (
    <div className={styles.root}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <InputField {...field} placeholder={placeholder} id={name} type={type} />
      {fieldState.error?.message && (
        <Text className={styles.error}>{String(fieldState.error.message)}</Text>
      )}
    </div>
  );
};

export default InputField;
