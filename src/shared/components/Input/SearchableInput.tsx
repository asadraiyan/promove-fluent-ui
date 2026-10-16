import React from "react";
import {
  Button,
  Input,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import {
  FieldLabel,
  type FieldLabelPosition,
} from "../FieldLabel/FieldLabel";
import {
  ResponsiveGrid,
  ResponsiveGridLabel,
} from "../layout/ResponsiveGrid";

export interface SearchableInputProps {
  id: string;
  label?: string;
  labelPosition?: FieldLabelPosition;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
  },
  rootInline: {
    gridTemplateColumns: "minmax(0, min(12rem, 40%)) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    minWidth: 0,
  },
  input: {
    width: "100%",
    minWidth: 0,
  },
});

export const SearchableInput: React.FC<SearchableInputProps> = ({
  id,
  label,
  labelPosition = "top",
  value,
  placeholder,
  disabled,
  className,
  onChange,
  onSearch,
}) => {
  const styles = useStyles();
  const inline = labelPosition === "left" && Boolean(label);
  const fieldLabel = label && <FieldLabel htmlFor={id}>{label}</FieldLabel>;

  const input = (
    <Input
      id={id}
      className={styles.input}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      contentAfter={
        <Button
          type="button"
          appearance="transparent"
          size="small"
          icon={<SearchRegular />}
          aria-label={`Search ${label ?? "items"}`}
          disabled={disabled}
          onClick={onSearch}
        />
      }
      onChange={(_, data) => onChange(data.value)}
      onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onSearch();
        }
      }}
    />
  );

  return inline ? (
    <ResponsiveGrid className={`${styles.rootInline} ${className ?? ""}`.trim()}>
      {fieldLabel && <ResponsiveGridLabel>{fieldLabel}</ResponsiveGridLabel>}
      <div>{input}</div>
    </ResponsiveGrid>
  ) : (
    <div className={`${styles.root} ${className ?? ""}`.trim()}>
      {fieldLabel}
      {input}
    </div>
  );
};

export default SearchableInput;
