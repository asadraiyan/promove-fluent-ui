import React from "react";
import { Field, Input, makeStyles, tokens } from "@fluentui/react-components";
import { ResponsiveGrid } from "../layout/ResponsiveGrid";
import type { FlatUserRow } from "./PersonDashboard";

export type EditableCustomerField =
  | "email"
  | "phone"
  | "locationString"
  | "addressType";

interface PersonDashboardEditFieldsProps {
  customer: FlatUserRow | null;
  onChange: (field: EditableCustomerField, value: string) => void;
}

const labels: Record<EditableCustomerField, string> = {
  email: "Email address",
  phone: "Phone number",
  locationString: "Location",
  addressType: "Type",
};

const useStyles = makeStyles({
  fields: {
    gridTemplateColumns: "minmax(0, 1fr)",
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

export const PersonDashboardEditFields: React.FC<
  PersonDashboardEditFieldsProps
> = ({ customer, onChange }) => {
  const styles = useStyles();

  return (
    <ResponsiveGrid className={styles.fields}>
      {(Object.keys(labels) as EditableCustomerField[]).map((field) => (
        <Field
          key={field}
          className={styles.field}
          label={labels[field]}
        >
          <Input
            className={styles.input}
            type={field === "email" ? "email" : "text"}
            value={customer?.[field] ?? ""}
            onChange={(_, data) => onChange(field, data.value)}
          />
        </Field>
      ))}
    </ResponsiveGrid>
  );
};
