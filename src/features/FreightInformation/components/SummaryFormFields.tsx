import React from "react";
import { Checkbox } from "@/shared";
import { useController, type Control } from "react-hook-form";
import type {
  OverseasSummaryCheckboxName,
  OverseasSummaryFormValues,
  OverseasSummaryTextFieldName,
} from "../OverseasSummary.types";

export type SummaryTextFieldRenderer = (
  name: OverseasSummaryTextFieldName,
  label: string,
  type?: "text" | "number" | "date",
  disabled?: boolean,
) => React.ReactNode;

interface FormCheckboxProps {
  control: Control<OverseasSummaryFormValues>;
  name: OverseasSummaryCheckboxName;
  label: string;
  disabled?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  control,
  name,
  label,
  disabled,
}) => {
  const { field } = useController({ control, name });

  return (
    <Checkbox
      checked={field.value}
      disabled={disabled}
      label={label}
      onChange={(_, data) => field.onChange(data.checked)}
    />
  );
};
