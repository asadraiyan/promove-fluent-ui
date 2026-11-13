import React from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { UseFormReturn } from "react-hook-form";

import {
  Button,
  FormDropdown,
  ResponsiveGrid,
} from "@/shared";

import {
  InvoiceDetails,
  InvoiceLineRow,
} from "../Invoicing.types";

import { VAT_OPTIONS } from "../constants";

import {
  ModalTable,
  type GridColumnDef,
} from "@/shared/components/Table/ModalTable";

const useStyles = makeStyles({
  invoiceLinesTools: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    alignItems: "end",
    gap: tokens.spacingHorizontalL,
    margin: `${tokens.spacingVerticalM} 0 ${tokens.spacingVerticalS}`,
  },
  invoiceLinesLabel: {
    fontWeight: tokens.fontWeightSemibold,
  },
  invoiceLinesControls: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    alignItems: "end",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  vatControl: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
    alignItems: "end",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
});

interface InvoiceLinesSectionProps {
  invoiceForm: UseFormReturn<InvoiceDetails>;
  invoiceLines: InvoiceLineRow[];
  invoiceLineColumns: GridColumnDef<InvoiceLineRow>[];
}

const InvoiceLinesSection: React.FC<InvoiceLinesSectionProps> = ({
  invoiceForm,
  invoiceLines,
  invoiceLineColumns,
}) => {
  const styles = useStyles();

  return (
    <>
      <ResponsiveGrid className={styles.invoiceLinesTools}>
        <Text className={styles.invoiceLinesLabel}>
          Invoice lines:
        </Text>

        <ResponsiveGrid className={styles.invoiceLinesControls}>
          <Button
            type="button"
            appearance="secondary"
            disabled
          >
            Add Revenue lines
          </Button>

          <ResponsiveGrid className={styles.vatControl}>
            <Text weight="semibold">VAT:</Text>

            <FormDropdown
              name="vat"
              control={invoiceForm.control}
              placeholder="Please Select"
              options={VAT_OPTIONS}
            />

            <Button
              type="button"
              appearance="secondary"
              disabled
            >
              Add New
            </Button>
          </ResponsiveGrid>
        </ResponsiveGrid>
      </ResponsiveGrid>

      <ModalTable<InvoiceLineRow>
        items={invoiceLines}
        columns={invoiceLineColumns}
        getRowId={(line) => line.id}
        compact
        fillWidth
        emptyState="No invoices found yet."
      />
    </>
  );
};

export default InvoiceLinesSection;
