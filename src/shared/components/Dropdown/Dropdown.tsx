import React from 'react';
import {
  tokens,
  Select,
  Text,
  makeStyles,
} from '@fluentui/react-components';
import { useController } from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },

  label: {
    marginBottom: tokens.spacingVerticalXS,
  },

  select: {
    minWidth: '160px',
  },

  placeholder: {
    color: tokens.colorNeutralForegroundDisabled,
  },
});

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  id,
  className,
}) => {
  const styles = useStyles();

  return (
    <div className={`${styles.root} ${className ?? ''}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <Select
        id={id}
        onChange={(e) =>
          onChange?.((e.target as HTMLSelectElement).value)
        }
        value={value}
        appearance="outline"
        className={styles.select}
      >
        {placeholder && (
          <option
            value=""
            disabled
            className={styles.placeholder}
          >
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

type FormDropdownProps = {
  name: string;
  control: any;
  label?: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export const FormDropdown: React.FC<FormDropdownProps> = ({
  name,
  control,
  label,
  options,
  defaultValue,
  placeholder,
  onChange,
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: defaultValue ?? '',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <Dropdown
        label={label}
        options={options}
        value={field.value}
        onChange={(value) => {
          field.onChange(value);
          onChange?.(value);
        }}
        placeholder={placeholder}
        id={name}
      />

      {fieldState.error?.message && (
        <Text
          style={{
            color: '#a4262c',
            marginTop: 6,
            fontSize: 12,
          }}
        >
          {String(fieldState.error.message)}
        </Text>
      )}
    </div>
  );
};

export default Dropdown;