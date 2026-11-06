import React from "react";
import {
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";

import {
  FormDropdown,
  FormInput,
  ResponsiveGrid,
  TextAreaField,
} from "@/shared";

import type { SupplierDetailsFormValues } from "../SupplierDetails.types";

import {
  BRAND_OPTIONS,
  SEND_FROM_GC_OPTIONS,
} from "../constants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minWidth: 0,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    minWidth: 0,
  },

  sectionTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },

  subsectionTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },

  claimField: {
    maxWidth: "950px",
  },

  claimHandler: {
    maxWidth: "720px",
  },

  qualityGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalXL,
    alignItems: "center",
  },

  otherField: {
    maxWidth: "950px",
  },
});

const ClmQualOthr: React.FC = () => {
  const styles = useStyles();

  const { control } = useFormContext<SupplierDetailsFormValues>();

  return (
    <div className={styles.root}>
      {/* Claims Information */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Claims Information
        </h3>

        <div className={styles.claimField}>
          <TextAreaField
            name="claimInitiationProcess"
            control={control}
            label="Claim initiation Process"
            rows={4}
          />
        </div>

        <div className={styles.claimHandler}>
          <FormInput
            name="claimHandledBy"
            control={control}
            label="Who handles claim?"
            labelPosition="left"
          />
        </div>
      </section>

      {/* Quality */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Quality</h3>

        <ResponsiveGrid className={styles.qualityGrid}>
          <FormDropdown
            name="sendFromGC"
            control={control}
            label="Do we send from GC?"
            labelPosition="left"
            placeholder="Select"
            options={SEND_FROM_GC_OPTIONS}
          />

          <FormDropdown
            name="brand"
            control={control}
            label="Brand"
            labelPosition="left"
            placeholder="Select"
            options={BRAND_OPTIONS}
          />
        </ResponsiveGrid>
      </section>

      {/* Other */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Other</h3>

        <div className={styles.otherField}>
          <TextAreaField
            name="additionalInformation"
            control={control}
            label="Any additional pertinent information?"
            rows={4}
          />
        </div>
      </section>
    </div>
  );
};

export default ClmQualOthr;