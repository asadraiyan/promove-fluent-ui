
import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";

import {
  FormDropdown,
  ResponsiveGrid,
  ResponsiveGridLabel,
  TextAreaField,
  Typography,
} from "@/shared";

import type { SupplierDetailsFormValues } from "../SupplierDetails.types";

import { YES_NO_OPTIONS } from "../constants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    width: "100%",
    minWidth: 0,
  },

  // Two-column tariff layout
  tariffTopGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    alignItems: "start",
    width: "100%",
    minWidth: 0,
  },

  tariffColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minWidth: 0,
  },

  // Common label and field alignment
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "minmax(130px, 190px) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS,
    width: "100%",
    minWidth: 0,
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

  tariffDropdown: {
    width: "100%",
    maxWidth: "160px",
    minWidth: 0,
  },

  descriptionSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    width: "100%",
    minWidth: 0,
  },

  descriptionLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
});

const Tariff: React.FC = () => {
  const styles = useStyles();

  const { control } = useFormContext<SupplierDetailsFormValues>();

  return (
    <div className={styles.root}>
      {/* Top Tariff Information */}
      <ResponsiveGrid className={styles.tariffTopGrid}>

        {/* Left Column */}
        <div className={styles.tariffColumn}>
          {/* Is There a Tariff */}
          <ResponsiveGrid className={styles.fieldRow}>
            <ResponsiveGridLabel className={styles.fieldLabel}>
              <Typography>
                Is there a tariff?
              </Typography>
            </ResponsiveGridLabel>

            <div className={styles.fieldControl}>
              <FormDropdown
                name="hasTariff"
                control={control}
                placeholder="Select"
                options={YES_NO_OPTIONS}
                className={styles.tariffDropdown}
              />
            </div>
          </ResponsiveGrid>

          {/* Booking Commission */}
          <ResponsiveGrid
            className={`${styles.fieldRow} ${styles.textAreaRow}`}
          >
            <ResponsiveGridLabel
              className={`${styles.fieldLabel} ${styles.textAreaLabel}`}
            >
              <Typography>
                Booking commission:
              </Typography>
            </ResponsiveGridLabel>

            <div className={styles.fieldControl}>
              <TextAreaField
                name="bookingCommission"
                control={control}
                rows={4}
              />
            </div>
          </ResponsiveGrid>
        </div>

        {/* Right Column */}
        <div className={styles.tariffColumn}>
          {/* Location Details */}
          <ResponsiveGrid
            className={`${styles.fieldRow} ${styles.textAreaRow}`}
          >
            <ResponsiveGridLabel
              className={`${styles.fieldLabel} ${styles.textAreaLabel}`}
            >
              <Typography>
                Location details:
              </Typography>
            </ResponsiveGridLabel>

            <div className={styles.fieldControl}>
              <TextAreaField
                name="locationDetails"
                control={control}
                rows={4}
              />
            </div>
          </ResponsiveGrid>

          {/* Pricing or Previous Issues */}
          <ResponsiveGrid
            className={`${styles.fieldRow} ${styles.textAreaRow}`}
          >
            <ResponsiveGridLabel
              className={`${styles.fieldLabel} ${styles.textAreaLabel}`}
            >
              <Typography>
                Any pricing or previous issues:
              </Typography>
            </ResponsiveGridLabel>

            <div className={styles.fieldControl}>
              <TextAreaField
                name="pricingPreviousIssues"
                control={control}
                rows={4}
              />
            </div>
          </ResponsiveGrid>
        </div>
      </ResponsiveGrid>

      {/* Tariff Description */}
      <section className={styles.descriptionSection}>
        <ResponsiveGrid
          className={`${styles.fieldRow} ${styles.textAreaRow}`}
        >
          <ResponsiveGridLabel
            className={`${styles.fieldLabel} ${styles.textAreaLabel}`}
          >
            <Typography>
              Tariff description:
            </Typography>
          </ResponsiveGridLabel>

          <div className={styles.fieldControl}>
            <TextAreaField
              name="tariffDescription"
              control={control}
              rows={12}
            />
          </div>
        </ResponsiveGrid>
      </section>
    </div>
  );
};

export default Tariff;
