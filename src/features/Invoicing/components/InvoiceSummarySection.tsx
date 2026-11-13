import React from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { UseFormReturn } from "react-hook-form";

import {
  Button,
  FormInput,
  ResponsiveGrid,
} from "@/shared";

import {
  InvoiceDetails,
  InvoiceRow,
} from "../Invoicing.types";

import { INVOICE_COLUMNS } from "../constants";

import {
  ModalTable,
  type GridColumnDef,
} from "@/shared/components/Table/ModalTable";

const useStyles = makeStyles({
  section: {
    paddingTop: tokens.spacingVerticalM,
  },
  sectionHeading: {
    margin: 0,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  invoiceSummary: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalS,
  },
  revenueTotal: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  revenueLabel: {
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: "nowrap",
  },
  revenueInput: {
    width: "140px",
  },
  revenueDetailsButton: {
    justifySelf: "center",
  },
  sendButton: {
    justifySelf: "end",
  },
  invoiceTableLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 92px",
    alignItems: "stretch",
    gap: tokens.spacingHorizontalS,
  },
  invoiceTable: {
    minWidth: 0,
    minHeight: "168px",
  },
  tableActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalXS,
  },
  smallAction: {
    minWidth: 0,
    width: "100%",
  },
});

interface InvoiceSummarySectionProps {
  invoiceForm: UseFormReturn<InvoiceDetails>;
  invoiceRows: InvoiceRow[];
  invoiceColumns: GridColumnDef<InvoiceRow>[];
  onOpenRevenueLines: () => void;
}

const InvoiceSummarySection: React.FC<InvoiceSummarySectionProps> = ({
  invoiceForm,
  invoiceRows,
  invoiceColumns,
  onOpenRevenueLines,
}) => {
  const styles = useStyles();

  return (
    <section>
      <h2 className={styles.sectionHeading}>Invoices</h2>

      <div className={styles.section}>
        <ResponsiveGrid className={styles.invoiceSummary}>
          <div className={styles.revenueTotal}>
            <Text className={styles.revenueLabel}>
              Uninvoiced revenue:
            </Text>

            <FormInput
              name="uninvoicedRevenue"
              control={invoiceForm.control}
              className={styles.revenueInput}
              ariaLabel="Uninvoiced revenue"
            />

            <Text weight="semibold">USD</Text>
          </div>

          <Button
            type="button"
            appearance="secondary"
            className={styles.revenueDetailsButton}
            onClick={onOpenRevenueLines}
          >
            Uninvoiced Revenue lines Details
          </Button>

          <Button
            type="button"
            appearance="primary"
            className={styles.sendButton}
          >
            Send to Sistra
          </Button>
        </ResponsiveGrid>

        <ResponsiveGrid className={styles.invoiceTableLayout}>
          <div className={styles.invoiceTable}>
            <ModalTable<InvoiceRow>
              items={invoiceRows}
              columns={invoiceColumns}
              getRowId={(invoice) => invoice.id}
              compact
              fillWidth
              emptyState="No invoices found yet."
            />
          </div>

          <div className={styles.tableActions}>
            <Button
              type="button"
              appearance="secondary"
              className={styles.smallAction}
              aria-label="Edit invoice"
              title="Edit invoice"
              disabled
            >
              Bill
            </Button>

            <Button
              type="button"
              appearance="secondary"
              className={styles.smallAction}
            >
              Print...
            </Button>

            <Button
              type="button"
              appearance="secondary"
              className={styles.smallAction}
              disabled
            >
              Credit
            </Button>
          </div>
        </ResponsiveGrid>
      </div>
    </section>
  );
};

export default InvoiceSummarySection;
