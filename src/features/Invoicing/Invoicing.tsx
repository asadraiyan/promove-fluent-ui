import React, { useState } from "react";
import {makeStyles, Text, tokens,} from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import {Button,FormDate, FormDropdown, FormInput, ResponsiveGrid, TextAreaField,} from "@/shared";
import { CommonEditDialog } from "@/shared/components/Modal/CommonEditDialog";
import {ModalTable, type GridColumnDef,} from "@/shared/components/Table/ModalTable";
import type {InvoiceDetails, InvoiceLineRow, InvoiceRow, UninvoicedRevenueLineRow} from "./Invoicing.types";
import {
  ATTENTION_TITLE_OPTIONS,
  CURRENCY_OPTIONS,
  EMPTY_INVOICE_DETAILS,
  INVOICE_COLUMNS,
  INVOICE_LINE_COLUMNS,
  INVOICE_MODE_OPTIONS,
  LANGUAGE_OPTIONS,
  UNINVOICED_REVENUE_LINE_COLUMNS,
  VAT_OPTIONS,
} from "./constants";

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
  sectionHeading: {
    margin: 0,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  section: {
    paddingTop: tokens.spacingVerticalM,
  },
  sectionTitle: {
    margin: 0,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
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
  detailsLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  invoiceFields: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    minWidth: 0,
  },
  serviceDescription: {
    gridColumn: "1 / -1",
  },
  invoiceFieldColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  horizontalDate: {
    gridTemplateColumns: "minmax(96px, 0.8fr) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    minWidth: 0,
    "& label": {
      fontSize: tokens.fontSizeBase200,
    },
    "& > div": {
      minWidth: 0,
    },
    "& input": {
      minWidth: 0,
      width: "100%",
    },
  },
  invoiceAddressFields: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  addressNameRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "end",
    gap: tokens.spacingHorizontalS,
  },
  attentionRow: {
    display: "grid",
    gridTemplateColumns: "minmax(100px, 0.65fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalS,
    alignItems: "end",
  },
  addressArea: {
    minHeight: "112px",
  },
  vatLanguageRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalM,
    alignItems: "end",
  },
  vatControl: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
    alignItems: "end",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  invoiceLinesTools: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    alignItems: "end",
    gap: tokens.spacingHorizontalL,
    margin: `${tokens.spacingVerticalM} 0 tokens.spacingVerticalS`,
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
  dialogContent: {
    paddingTop: tokens.spacingVerticalM,
  },
  dialogDescription: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  dialogTable: {
    maxHeight: "55vh",
    overflow: "auto",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: tokens.spacingVerticalM,
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

  return (
    <div className={styles.root}>
      <section>
        <h2 className={styles.sectionHeading}>Invoices</h2>
        <div className={styles.section}>
          <ResponsiveGrid className={styles.invoiceSummary}>
            <div className={styles.revenueTotal}>
              <Text className={styles.revenueLabel}>Uninvoiced revenue:</Text>
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
              onClick={() => setIsRevenueLinesOpen(true)}
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

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Invoice Details</h2>
        <div className={styles.section}>
          <ResponsiveGrid className={styles.detailsLayout}>
            <section>
              <h3 className={styles.sectionTitle}>Invoice details:</h3>
              <ResponsiveGrid className={styles.invoiceFields}>
                <div className={styles.invoiceFieldColumn}>
                  <FormInput
                    name="invoiceNumber"
                    control={invoiceForm.control}
                    label="Invoice number:"
                    labelPosition="left"
                  />
                  <FormInput
                    name="scanReference"
                    control={invoiceForm.control}
                    label="SCAN Ref."
                    labelPosition="left"
                  />
                  <FormInput
                    name="paymentTerms"
                    control={invoiceForm.control}
                    label="Payment terms:"
                    labelPosition="left"
                  />
                  <FormDropdown
                    name="currency"
                    control={invoiceForm.control}
                    label="Currency:"
                    labelPosition="left"
                    placeholder="Select"
                    options={CURRENCY_OPTIONS}
                  />
                  <FormInput
                    name="vatCurrency"
                    control={invoiceForm.control}
                    label="Currency for VAT"
                    labelPosition="left"
                  />
                  <FormDropdown
                    name="invoiceMode"
                    control={invoiceForm.control}
                    label="Invoice Mode:"
                    labelPosition="left"
                    placeholder="Select"
                    options={INVOICE_MODE_OPTIONS}
                  />
                </div>
                <div className={styles.invoiceFieldColumn}>
                  <FormDate
                    name="invoiceDate"
                    label="Invoice date:"
                    control={invoiceForm.control}
                    className={styles.horizontalDate}
                    orientation="horizontal"
                  />
                  <FormInput
                    name="agentStatementReference"
                    control={invoiceForm.control}
                    label="Agt Stmt Ref."
                    labelPosition="left"
                  />
                  <FormDate
                    name="dueDate"
                    label="Due date:"
                    control={invoiceForm.control}
                    className={styles.horizontalDate}
                    orientation="horizontal"
                  />
                  <FormInput
                    name="exchangeRate"
                    control={invoiceForm.control}
                    label="Exchange rate:"
                    labelPosition="left"
                  />
                  <FormInput
                    name="vatExchangeRate"
                    control={invoiceForm.control}
                    label="Exchange rate:"
                    labelPosition="left"
                  />
                </div>
                <TextAreaField
                  name="serviceDescription"
                  control={invoiceForm.control}
                  label="Service Description:"
                  rows={2}
                  className={styles.serviceDescription}
                />
              </ResponsiveGrid>
            </section>

            <section>
              <h3 className={styles.sectionTitle}>Invoice address</h3>
              <div className={styles.invoiceAddressFields}>
                <div className={styles.addressNameRow}>
                  <FormInput
                    name="invoiceAddressName"
                    control={invoiceForm.control}
                    label="Name"
                    labelPosition="left"
                  />
                  <Button type="button" appearance="secondary" disabled>
                    Pick
                  </Button>
                </div>
                <div className={styles.attentionRow}>
                  <FormDropdown
                    name="attentionTitle"
                    control={invoiceForm.control}
                    label="Attention:"
                    labelPosition="left"
                    placeholder=""
                    options={ATTENTION_TITLE_OPTIONS}
                  />
                  <FormInput
                    name="attentionName"
                    control={invoiceForm.control}
                    ariaLabel="Attention name"
                  />
                </div>
                <TextAreaField
                  name="invoiceAddress"
                  control={invoiceForm.control}
                  label="Address:"
                  rows={4}
                  className={styles.addressArea}
                />
                <ResponsiveGrid className={styles.vatLanguageRow}>
                  <FormInput
                    name="vatRegistrationNumber"
                    control={invoiceForm.control}
                    label="VAT reg status, Nr:"
                    labelPosition="left"
                  />
                  <FormDropdown
                    name="language"
                    control={invoiceForm.control}
                    label="Language:"
                    labelPosition="left"
                    placeholder="Select"
                    options={LANGUAGE_OPTIONS}
                  />
                </ResponsiveGrid>
                <TextAreaField
                  name="comments"
                  control={invoiceForm.control}
                  label="Comments:"
                  rows={2}
                />
              </div>
            </section>
          </ResponsiveGrid>

          <ResponsiveGrid className={styles.invoiceLinesTools}>
            <Text className={styles.invoiceLinesLabel}>Invoice lines:</Text>
            <ResponsiveGrid className={styles.invoiceLinesControls}>
              <Button type="button" appearance="secondary" disabled>
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
                <Button type="button" appearance="secondary" disabled>
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
        </div>
      </section>

      <CommonEditDialog
        open={isRevenueLinesOpen}
        heading="Uninvoiced revenue lines"
        content={
          <div className={styles.dialogContent}>
            <Text className={styles.dialogDescription} weight="semibold">
              These revenue lines have not been invoiced yet:
            </Text>
            <div className={styles.dialogTable}>
              <ModalTable<UninvoicedRevenueLineRow>
                items={revenueLines}
                columns={UNINVOICED_REVENUE_LINE_COLUMNS}
                getRowId={(line) => line.id}
                compact
                fillWidth
                emptyState="No invoices found yet."
              />
            </div>
          </div>
        }
        actions={[
          {
            label: "Close",
            onClick: () => setIsRevenueLinesOpen(false),
            appearance: "secondary",
          },
        ]}
        onClose={() => setIsRevenueLinesOpen(false)}
        showCloseButton
        maxWidth="min(1100px, calc(100vw - 32px))"
      />
    </div>
  );
};

export default Invoicing;
