
import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Controller, useFormContext } from "react-hook-form";

import {
  Checkbox,
  FormDropdown,
  FormInput,
  ResponsiveGrid,
  ResponsiveGridLabel,
  TextAreaField,
  Typography,
} from "@/shared";

import type { SupplierDetailsFormValues } from "../SupplierDetails.types";
import { REGION_ADDRESS_OPTIONS } from "../constants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    width: "100%",
    minWidth: 0,
  },

  fieldRow: {
    gridTemplateColumns: "minmax(220px, 280px) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalXS,
    width: "100%",
  },

  fieldLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    minWidth: 0,
  },

  fieldControl: {
    width: "100%",
    minWidth: 0,
  },

  textAreaRow: {
    alignItems: "start",
  },

  textAreaLabel: {
    paddingTop: tokens.spacingVerticalS,
  },

  checkboxControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "32px",
    minWidth: 0,
  },

  invoicingSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    width: "100%",
    minWidth: 0,
  },

  sectionTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },

  compactControl: {
    width: "100%",
    maxWidth: "210px",
    minWidth: 0,
  },
});

const Contract: React.FC = () => {
  const styles = useStyles();

  const { control } = useFormContext<SupplierDetailsFormValues>();

  return (
    <div className={styles.root}>
      {/* Enquiry Remark */}
      <ResponsiveGrid
        className={`${styles.fieldRow} ${styles.textAreaRow}`}
      >
        <ResponsiveGridLabel className={`${styles.fieldLabel} ${styles.textAreaLabel}`}>
          <Typography>
            Remark to display when taking an enquiry:
          </Typography>
        </ResponsiveGridLabel>

        <div className={styles.fieldControl}>
          <TextAreaField
            name="enquiryRemark"
            control={control}
            rows={4}
          />
        </div>
      </ResponsiveGrid>

      {/* PO Number Required */}
      <ResponsiveGrid className={styles.fieldRow}>
        <ResponsiveGridLabel className={styles.fieldLabel}>
          <Typography>PO number required:</Typography>
        </ResponsiveGridLabel>

        <div className={styles.checkboxControl}>
          <Controller
            name="poNumberRequired"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={!!field.value}
                onChange={(_, data) => field.onChange(data.checked)}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
      </ResponsiveGrid>

      {/* Invoicing */}
      <section className={styles.invoicingSection}>
        <Typography className={styles.sectionTitle}>
          Invoicing:
        </Typography>

        {/* Service Description */}
        <ResponsiveGrid
          className={`${styles.fieldRow} ${styles.textAreaRow}`}
        >
          <ResponsiveGridLabel className={`${styles.fieldLabel} ${styles.textAreaLabel}`}>
            <Typography>
              Service description to mention on invoice:
            </Typography>
          </ResponsiveGridLabel>

          <div className={styles.fieldControl}>
            <TextAreaField
              name="invoiceServiceDescription"
              control={control}
              rows={4}
            />
          </div>
        </ResponsiveGrid>

        {/* Region Address */}
        <ResponsiveGrid className={styles.fieldRow}>
          <ResponsiveGridLabel className={styles.fieldLabel}>
            <Typography>
              Always print this region's address:
            </Typography>
          </ResponsiveGridLabel>

          <div className={styles.fieldControl}>
            <FormDropdown
              name="alwaysPrintRegionAddress"
              control={control}
              placeholder="Select"
              options={REGION_ADDRESS_OPTIONS}
            />
          </div>
        </ResponsiveGrid>

        {/* Security Restriction */}
        <ResponsiveGrid className={styles.fieldRow}>
          <ResponsiveGridLabel className={styles.fieldLabel}>
            <Typography>
              Invoicing restricted by security:
            </Typography>
          </ResponsiveGridLabel>

          <div className={styles.checkboxControl}>
            <Controller
              name="invoicingRestrictedBySecurity"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={!!field.value}
                  onChange={(_, data) => field.onChange(data.checked)}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
        </ResponsiveGrid>

        {/* Invoice Action Assigned To */}
        <ResponsiveGrid className={styles.fieldRow}>
          <ResponsiveGridLabel className={styles.fieldLabel}>
            <Typography>
              Invoice action assigned to:
            </Typography>
          </ResponsiveGridLabel>

          <div className={styles.fieldControl}>
            <FormInput
              name="invoiceActionAssignedTo"
              control={control}
            />
          </div>
        </ResponsiveGrid>

        {/* Insurance Allowance */}
        <ResponsiveGrid className={styles.fieldRow}>
          <ResponsiveGridLabel className={styles.fieldLabel}>
            <Typography>
              Insurance Allowance:
            </Typography>
          </ResponsiveGridLabel>

          <div className={styles.checkboxControl}>
            <Controller
              name="insuranceAllowance"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={!!field.value}
                  onChange={(_, data) => field.onChange(data.checked)}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
        </ResponsiveGrid>

        {/* Fire Insurance Allowance */}
        <ResponsiveGrid className={styles.fieldRow}>
          <ResponsiveGridLabel className={styles.fieldLabel}>
            <Typography>
              Fireinsurance Allowance:
            </Typography>
          </ResponsiveGridLabel>

          <div className={styles.fieldControl}>
            <FormInput
              name="fireInsuranceAllowance"
              control={control}
              className={styles.compactControl}
            />
          </div>
        </ResponsiveGrid>

        {/* Insurance Rate */}
        <ResponsiveGrid className={styles.fieldRow}>
          <ResponsiveGridLabel className={styles.fieldLabel}>
            <Typography>
              Insurance Rate p/1000 €:
            </Typography>
          </ResponsiveGridLabel>

          <div className={styles.fieldControl}>
            <FormInput
              name="insuranceRatePer1000"
              control={control}
              className={styles.compactControl}
            />
          </div>
        </ResponsiveGrid>
      </section>
    </div>
  );
};

export default Contract;
