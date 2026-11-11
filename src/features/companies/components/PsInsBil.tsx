import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";

import {
  FormDropdown,
  FormInput,
  ResponsiveGrid,
  TextAreaField,
  Typography,
} from "@/shared";

import type { SupplierDetailsFormValues } from "../SupplierDetails.types";
import {
  INSURANCE_PROVIDER_OPTIONS,
  INSURANCE_TYPE_OPTIONS,
  YES_NO_OPTIONS,
} from "../constants";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    width: "100%",
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
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  twoColumns: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalXL,
    alignItems: "start",
    width: "100%",
  },
  inlineFields: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalXL,
    alignItems: "center",
  },
});

const PsInsBil: React.FC = () => {
  const styles = useStyles();
  const { control } = useFormContext<SupplierDetailsFormValues>();

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <Typography className={styles.sectionTitle}>
          Permanent Storage
        </Typography>
        <FormDropdown
          name="permanentStorageAuthorized"
          control={control}
          label="Is perm storage normally authorized?"
          labelPosition="left"
          placeholder="Select"
          options={YES_NO_OPTIONS}
        />
        <TextAreaField
          name="psDetails"
          control={control}
          label="Ps Details"
          rows={4}
        />
      </section>

      <section className={styles.section}>
        <Typography className={styles.sectionTitle}>Insurance</Typography>
        <ResponsiveGrid className={styles.inlineFields}>
          <FormDropdown
            name="insuredBy"
            control={control}
            label="Insured By"
            labelPosition="left"
            placeholder="Select"
            options={INSURANCE_PROVIDER_OPTIONS}
          />
          <FormDropdown
            name="insuranceType"
            control={control}
            label="Insurance Type"
            labelPosition="left"
            placeholder="Select"
            options={INSURANCE_TYPE_OPTIONS}
          />
        </ResponsiveGrid>
        <TextAreaField
          name="rateCriteria"
          control={control}
          label="Rate Criteria:"
          rows={4}
        />
        <ResponsiveGrid className={styles.twoColumns}>
          <FormDropdown
            name="insuranceCommissionPaid"
            control={control}
            label="Any insurance commission paid"
            labelPosition="left"
            placeholder="Select"
            options={YES_NO_OPTIONS}
          />
          <TextAreaField
            name="insuranceProcess"
            control={control}
            label="Process"
            rows={4}
          />
        </ResponsiveGrid>
      </section>

      <section className={styles.section}>
        <Typography className={styles.sectionTitle}>
          Billing instructions
        </Typography>
        <ResponsiveGrid className={styles.inlineFields}>
          <FormInput
            name="billToId"
            control={control}
            label="Bill to ID:"
            labelPosition="left"
          />
          <FormInput
            name="billTo"
            control={control}
            label="Bill to:"
            labelPosition="left"
          />
        </ResponsiveGrid>
        <TextAreaField
          name="billToLocation"
          control={control}
          label="Bill to Location"
          rows={4}
        />
        <FormInput
          name="billingTimeframes"
          control={control}
          label="Any billing Time frames?"
        />
        <ResponsiveGrid className={styles.twoColumns}>
          <TextAreaField
            name="billingAttachmentsNeeded"
            control={control}
            label="Billing attachments needed"
            rows={4}
          />
          <TextAreaField
            name="billingInformation"
            control={control}
            label="Any billing information?"
            rows={4}
          />
        </ResponsiveGrid>
      </section>
    </div>
  );
};

export default PsInsBil;
