import React from 'react';
import {
  tokens,
  Select,
  Text,
  makeStyles,
} from '@fluentui/react-components';
import { useController } from 'react-hook-form';
import { FieldLabel, type FieldLabelPosition } from '../FieldLabel/FieldLabel';
import {
  ResponsiveGrid,
  ResponsiveGridLabel,
} from '../layout/ResponsiveGrid';

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
  labelPosition?: FieldLabelPosition;
  labelClassName?: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  rootInline: {
    gridTemplateColumns: 'minmax(0, min(12rem, 40%)) minmax(0, 1fr)',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalM,
    minWidth: 0,
  },

  select: {
    width: '100%',
    minWidth: 0,
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
  labelPosition = 'top',
  labelClassName,
}) => {
  const styles = useStyles();
  const inline = labelPosition === 'left' && Boolean(label);

  const fieldLabel = label && (
    <FieldLabel htmlFor={id} className={labelClassName}>
      {label}
    </FieldLabel>
  );

  const select = (
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
  );

  return (
    inline ? (
      <ResponsiveGrid
        className={`${styles.rootInline} ${className ?? ''}`.trim()}
      >
        {fieldLabel && (
          <ResponsiveGridLabel>{fieldLabel}</ResponsiveGridLabel>
        )}
        <div>{select}</div>
      </ResponsiveGrid>
    ) : (
      <div className={`${styles.root} ${className ?? ''}`.trim()}>
        {fieldLabel}
        {select}
      </div>
    )
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
  labelPosition?: FieldLabelPosition;
  labelClassName?: string;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  name,
  control,
  label,
  options,
  defaultValue,
  placeholder,
  onChange,
  labelPosition = 'top',
  labelClassName,
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: defaultValue ?? '',
  });

  return (
    <div>
      <Dropdown
        label={label}
        labelPosition={labelPosition}
        labelClassName={labelClassName}
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