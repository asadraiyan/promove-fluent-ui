import React from "react";
import { Radio, tokens, Text, makeStyles } from "@fluentui/react-components";
import { useController } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  label?: string;
  name?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  direction?: "vertical" | "horizontal";
};

const useStyles = makeStyles({
  fieldset: {
    border: "none",
    padding: 0,
    margin: 0,
  },
  legend: {
    marginBottom: tokens.spacingVerticalXS,
  },
  containerVertical: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexDirection: "column",
  },
  containerHorizontal: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexDirection: "row",
  },
});

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  className,
  direction = "vertical",
}) => {
  const styles = useStyles();

  return (
    <fieldset className={`${styles.fieldset} ${className ?? ""}`.trim()}>
      {label && <legend className={styles.legend}> {label} </legend>}
      <div
        className={
          direction === "vertical"
            ? styles.containerVertical
            : styles.containerHorizontal
        }
      >
        {options.map((o) => (
          <Radio
            key={o.value}
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
            label={o.label}
          />
        ))}
      </div>
    </fieldset>
  );
};

type FormRadioGroupProps = {
  name: string;
  control: any;
  label?: string;
  options: Option[];
  defaultValue?: string;
  direction?: "vertical" | "horizontal";
};

const useFormStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  error: {
    color: tokens.colorPaletteRedForeground1,
    marginTop: tokens.spacingVerticalXS,
    fontSize: "12px",
  },
});

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  name,
  control,
  label,
  options,
  defaultValue,
  direction = "vertical",
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: defaultValue ?? "",
  });

  const styles = useFormStyles();
  return (
    <div className={styles.root}>
      <RadioGroup
        label={label}
        name={name}
        options={options}
        value={field.value}
        onChange={(v) => field.onChange()}
        direction={direction}
      />
      {fieldState.error?.message && (
        <Text className={styles.error}>{String(fieldState.error.message)}</Text>
      )}
    </div>
  );
};
