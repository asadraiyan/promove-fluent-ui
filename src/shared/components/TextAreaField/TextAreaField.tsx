import React from "react";
import { Textarea } from "@fluentui/react-components";
import { useController } from "react-hook-form";

import { FieldLabel } from "../FieldLabel/FieldLabel";

export type TextAreaFieldProps = {
  name: string;
  control: any;
  label?: string;
  rows?: number;
  defaultValue?: string;
  className?: string;
  labelClassName?: string;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  control,
  label,
  rows = 2,
  defaultValue = "",
  className,
  labelClassName,
}) => {
  const { field } = useController({ name, control, defaultValue });

  return (
    <div className={className}>
      {label && (
        <FieldLabel htmlFor={name} className={labelClassName}>
          {label}
        </FieldLabel>
      )}
      <Textarea
        id={name}
        name={field.name}
        value={field.value ?? ""}
        onChange={(event) => field.onChange(event.currentTarget.value)}
        onBlur={field.onBlur}
        ref={field.ref as any}
        rows={rows}
      />
    </div>
  );
};

export default TextAreaField;