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
  MOVE_INITIATION_OPTIONS,
  MOVE_REGISTRATION_OPTIONS,
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
  column: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  row: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(140px, 0.6fr)",
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
  },
  textareaGrid: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  field: {
    minWidth: 0,
  },
  policyField: {
    width: "100%",
    maxWidth: "360px",
    minWidth: 0,
  },
});

const InstAgtselAllow: React.FC = () => {
  const styles = useStyles();
  const { control } = useFormContext<SupplierDetailsFormValues>();

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <Typography className={styles.sectionTitle}>
          Operational instructions
        </Typography>

        <ResponsiveGrid className={styles.twoColumns}>
          <div className={styles.column}>
            <FormDropdown
              name="moveInitiationFrom"
              control={control}
              label="Move initiation from"
              labelPosition="left"
              placeholder="Select"
              options={MOVE_INITIATION_OPTIONS}
            />
            <FormDropdown
              name="moveRegistrationProcess"
              control={control}
              label="Move registration process"
              labelPosition="left"
              placeholder="Select"
              options={MOVE_REGISTRATION_OPTIONS}
            />
          </div>
          <div className={styles.column}>
            <FormDropdown
              name="qualityFeedbackSurveyUsed"
              control={control}
              label="Quality feedback survey used?"
              labelPosition="left"
              placeholder="Select"
              options={YES_NO_OPTIONS}
            />
          </div>
        </ResponsiveGrid>

        <ResponsiveGrid className={styles.textareaGrid}>
          <TextAreaField
            name="qualityApprovalProcess"
            control={control}
            label="Quality approval process:"
            rows={4}
            className={styles.field}
          />
          <TextAreaField
            name="exceptionAncillaryApprovalProcess"
            control={control}
            label="Exception/ancillary approval process:"
            rows={4}
            className={styles.field}
          />
        </ResponsiveGrid>
      </section>

      <section className={styles.section}>
        <Typography className={styles.sectionTitle}>Agent selection</Typography>

        <TextAreaField
          name="agentSelectionCriteria"
          control={control}
          label="Agent selection criteria:"
          rows={3}
        />

        <ResponsiveGrid className={styles.twoColumns}>
          <div className={styles.column}>
            <FormDropdown
              name="anyLocationCriteria"
              control={control}
              label="Any location criteria?"
              labelPosition="left"
              placeholder="Select"
              options={YES_NO_OPTIONS}
            />
            <TextAreaField
              name="locationSpecificCriteria"
              control={control}
              label="Location specific criteria"
              rows={4}
            />
          </div>
          <div className={styles.column}>
            <FormDropdown
              name="anyBannedAgent"
              control={control}
              label="Any banned agent?"
              labelPosition="left"
              placeholder="Select"
              options={YES_NO_OPTIONS}
            />
            <TextAreaField
              name="bannedAgentList"
              control={control}
              label="Banned agent list"
              rows={4}
            />
          </div>
        </ResponsiveGrid>
      </section>

      <section className={styles.section}>
        <Typography className={styles.sectionTitle}>
          Allowance information
        </Typography>

        <div className={styles.policyField}>
          <FormInput
            name="numberOfMovePolicies"
            control={control}
            label="Nbr of move policies"
          />
        </div>

        <ResponsiveGrid className={styles.twoColumns}>
          <TextAreaField
            name="standardHousingAllowance"
            control={control}
            label="Standard housing allowance"
            rows={4}
          />
          <TextAreaField
            name="sitAllowances"
            control={control}
            label="Sit allowances"
            rows={4}
          />
        </ResponsiveGrid>

        <FormInput
          name="petsApproved"
          control={control}
          label="Pets approved"
        />

        <ResponsiveGrid className={styles.twoColumns}>
          <FormInput
            name="firearmsApproved"
            control={control}
            label="Firearms approved"
          />
          <TextAreaField
            name="frequentSpecialItemsApproved"
            control={control}
            label="Frequent special items approved:"
            rows={4}
          />
        </ResponsiveGrid>
      </section>
    </div>
  );
};

export default InstAgtselAllow;
