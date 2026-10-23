import React from "react";
import { Field } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  useController,
  useFormContext,
  type RegisterOptions,
} from "react-hook-form";

interface FormDateProps {
  name: string;
  label: string;
  required?: boolean;
  rules?: RegisterOptions;
  placeholder?: string;
}

export const FormDate: React.FC<FormDateProps> = ({
  name,
  label,
  required,
  rules,
  placeholder,
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      required: required ? `${label} is required` : false,
      ...rules,
    },
  });

  const parseLocalDate = (dateStr?: string): Date | undefined => {
    if (!dateStr) return undefined;
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        parseInt(parts[2]),
      );
    }
    return new Date(dateStr);
  };

  const minDateString =
    rules?.min && typeof rules.min === "object"
      ? (rules.min.value as string | undefined)
      : (rules?.min as string | undefined);
  const minDateObj = parseLocalDate(minDateString);
  const pickerValue = field.value ? parseLocalDate(field.value) : undefined;

  const onFormatDate = (date?: Date): string => {
    if (!date) return "";
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <Field
      label={label}
      required={required}
      validationState={fieldState.error ? "error" : "none"}
      validationMessage={fieldState.error?.message}
    >
      <DatePicker
        {...field}
        ref={field.ref}
        name={field.name}
        onBlur={field.onBlur}
        value={pickerValue}
        minDate={minDateObj}
        formatDate={onFormatDate}
        placeholder={placeholder}
        onSelectDate={(date) => {
          if (date) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            field.onChange(`${yyyy}-${mm}-${dd}`);
          } else {
            field.onChange("");
          }
        }}
      />
    </Field>
  );
};
