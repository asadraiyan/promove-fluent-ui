import React from 'react';

import {
  Dropdown as FluentDropdown,
  Option,
  DropdownProps as FluentDropdownProps,
} from '@fluentui/react-components';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps
  extends Omit<FluentDropdownProps, 'children'> {
  options: DropdownOption[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  ...props
}) => {
  return (
    <FluentDropdown {...props}>
      {options.map((option) => (
        <Option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </Option>
      ))}
    </FluentDropdown>
  );
};
