import React, { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useForm } from "react-hook-form";

import { InvoiceDetails, InvoiceLineRow, InvoiceRow, UninvoicedRevenueLineRow } from "./Invoicing.types";

import {
  EMPTY_INVOICE_DETAILS,
  INVOICE_COLUMNS,
  INVOICE_LINE_COLUMNS,
  UNINVOICED_REVENUE_LINE_COLUMNS,
} from "./constants";

import {
  type GridColumnDef,
} from "@/shared/components/Table/ModalTable";

import InvoiceSummarySection from "./components/InvoiceSummarySection";
import InvoiceDetailsSection from "./components/InvoiceDetailsSection";
import InvoiceLinesSection from "./components/InvoiceLinesSection";
import UninvoicedRevenueDialog from "./components/UninvoicedRevenueDialog";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1280px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

const Invoicing: React.FC = () => {
  const styles = useStyles();

  const [isRevenueLinesOpen, setIsRevenueLinesOpen] = useState(false);

  const invoiceForm = useForm<InvoiceDetails>({
    defaultValues: EMPTY_INVOICE_DETAILS,
  });

  const invoiceRows: InvoiceRow[] = [];
  const invoiceLines: InvoiceLineRow[] = [];
  const revenueLines: UninvoicedRevenueLineRow[] = [];

  const invoiceColumns: GridColumnDef<InvoiceRow>[] = INVOICE_COLUMNS;

  const invoiceLineColumns: GridColumnDef<InvoiceLineRow>[] =
    INVOICE_LINE_COLUMNS;

  const revenueLineColumns: GridColumnDef<UninvoicedRevenueLineRow>[] =
    UNINVOICED_REVENUE_LINE_COLUMNS;

  return (
    <div className={styles.root}>
      <InvoiceSummarySection
        invoiceForm={invoiceForm}
        invoiceRows={invoiceRows}
        invoiceColumns={invoiceColumns}
        onOpenRevenueLines={() => setIsRevenueLinesOpen(true)}
      />

      <InvoiceDetailsSection invoiceForm={invoiceForm} />

      <InvoiceLinesSection
        invoiceForm={invoiceForm}
        invoiceLines={invoiceLines}
        invoiceLineColumns={invoiceLineColumns}
      />

      <UninvoicedRevenueDialog
        open={isRevenueLinesOpen}
        revenueLines={revenueLines}
        revenueLineColumns={revenueLineColumns}
        onClose={() => setIsRevenueLinesOpen(false)}
      />
    </div>
  );
};

export default Invoicing;
