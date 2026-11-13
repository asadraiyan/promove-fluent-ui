import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { UseFormReturn } from "react-hook-form";
import {
  Button,
  FormDate,
  FormDropdown,
  FormInput,
  ResponsiveGrid,
  TextAreaField,
} from "@/shared";
import { InvoiceDetails } from "../Invoicing.types";
import {ATTENTION_TITLE_OPTIONS, CURRENCY_OPTIONS, INVOICE_MODE_OPTIONS, LANGUAGE_OPTIONS} from "../constants";

const useStyles = makeStyles({
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
});

interface InvoiceDetailsSectionProps {
  invoiceForm: UseFormReturn<InvoiceDetails>;
}

const InvoiceDetailsSection: React.FC<InvoiceDetailsSectionProps> = ({
  invoiceForm,
}) => {
  const styles = useStyles();

  return (
    <section>
      <h2 className={styles.sectionHeading}>Invoice Details</h2>

      <div className={styles.section}>
        <ResponsiveGrid className={styles.detailsLayout}>
          <section>
            <h3 className={styles.sectionTitle}>
              Invoice details:
            </h3>

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
            <h3 className={styles.sectionTitle}>
              Invoice address
            </h3>

            <div className={styles.invoiceAddressFields}>
              <div className={styles.addressNameRow}>
                <FormInput
                  name="invoiceAddressName"
                  control={invoiceForm.control}
                  label="Name"
                  labelPosition="left"
                />

                <Button
                  type="button"
                  appearance="secondary"
                  disabled
                >
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
      </div>
    </section>
  );
};

export default InvoiceDetailsSection;
