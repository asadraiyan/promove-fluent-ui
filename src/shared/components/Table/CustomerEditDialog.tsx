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
} from "@fluentui/react-components";

export interface CustomerEditDetails {
  email: string;
  phone: string;
  locationString: string;
  addressType: string;
}

interface CustomerEditDialogProps {
  customer: CustomerEditDetails | null;
  onChange: (
    field: keyof CustomerEditDetails,
    value: string,
  ) => void;
  onSave: () => void;
  onClose: () => void;
}

export const CustomerEditDialog: React.FC<CustomerEditDialogProps> = ({
  customer,
  onChange,
  onSave,
  onClose,
}) => (
  <Dialog
    open={customer !== null}
    onOpenChange={(_, data) => {
      if (!data.open) onClose();
    }}
  >
    <DialogSurface>
      <DialogBody>
        <DialogTitle>Edit customer details</DialogTitle>
        <DialogContent>
          <Field label="Email address">
            <Input
              type="email"
              value={customer?.email ?? ""}
              onChange={(_, data) => onChange("email", data.value)}
            />
          </Field>
          <Field label="Phone number">
            <Input
              value={customer?.phone ?? ""}
              onChange={(_, data) => onChange("phone", data.value)}
            />
          </Field>
          <Field label="Location">
            <Input
              value={customer?.locationString ?? ""}
              onChange={(_, data) => onChange("locationString", data.value)}
            />
          </Field>
          <Field label="Type">
            <Input
              value={customer?.addressType ?? ""}
              onChange={(_, data) => onChange("addressType", data.value)}
            />
          </Field>
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
