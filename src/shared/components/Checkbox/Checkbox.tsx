import React from 'react';
import {
  Checkbox as FluentCheckbox,
  CheckboxProps as FluentCheckboxProps,
} from '@fluentui/react-components';

export interface CheckboxProps extends FluentCheckboxProps {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  ...props
}) => {
  return (
    <FluentCheckbox
      label={label}
      {...props}
    />
  );
};

export default Checkbox;