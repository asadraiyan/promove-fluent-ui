import React from 'react';

import {
  Label,
  LabelProps,
} from '@fluentui/react-components';

export interface FieldLabelProps extends LabelProps {
  children: React.ReactNode;
  required?: boolean;
}

export type FieldLabelPosition = "top" | "left";

export const FieldLabel: React.FC<FieldLabelProps> = ({
  children,
  required = false,
  ...props
}) => {
  return (
    <Label
      required={required}
      {...props}
    >
      {children}
    </Label>
  );
};
