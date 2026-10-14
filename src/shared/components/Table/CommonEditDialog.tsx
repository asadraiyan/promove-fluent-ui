import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Input,
  makeStyles,
  tokens,
  type InputProps,
} from "@fluentui/react-components";

export interface CustomerEditDetails {
  email: string;
  phone: string;
  locationString: string;
  addressType: string;
}

interface CustomerEditDialogProps<T extends { [K in keyof T]: string }> {
  customer: T | null;
  heading: string;
  labels: Partial<Record<keyof T, string>>;
  fieldTypes?: Partial<Record<keyof T, InputProps["type"]>>;
  onChange: (field: keyof T, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const useStyles = makeStyles({
  fields: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    rowGap: tokens.spacingVerticalM,
    columnGap: tokens.spacingHorizontalM,
  },
  field: {
    minWidth: 0,
  },
  input: {
    width: "100%",
    minWidth: 0,
  },
});

export function CommonEditDialog<T extends { [K in keyof T]: string }>({
  customer,
  heading,
  labels,
  fieldTypes,
  onChange,
  onSave,
  onClose,
}: CustomerEditDialogProps<T>) {
  const styles = useStyles();
  const fields = Object.keys(labels) as Array<keyof T>;

  return (
    <Dialog
      open={customer !== null}
      onOpenChange={(_, data) => {
        if (!data.open) onClose();
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{heading}</DialogTitle>
          <DialogContent>
              {fields.map((field) => (
                <Field
                  key={String(field)}
                  className={styles.field}
                  label={labels[field]}
                >
                  <Input
                    className={styles.input}
                    type={fieldTypes?.[field]}
                    value={customer?.[field] ?? ""}
                    onChange={(_, data) => onChange(field, data.value)}
                  />
                </Field>
              ))}
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={onSave}>
              Save
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
