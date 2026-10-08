import React, { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";

import {
  FormInput,
  ResponsiveGrid,
  TextAreaField,
} from "@/shared";
import { ServiceEngineDataInitiationFormValues } from "./ServiceEngine.types";
import { SERVICE_ENGINE_DEFAULT_VALUES } from "./constants";

const useStyles = makeStyles({
  section: {
    boxSizing: "border-box",
    width: "min(100% - 32px, 900px)",
    margin: "24px auto",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minHeight: "36px",
    padding: `0 ${tokens.spacingHorizontalS}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  toggle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    flexShrink: 0,
    padding: 0,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "2px",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    lineHeight: 1,
    cursor: "pointer",
  },
  heading: {
    margin: 0,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  content: {
    padding: tokens.spacingHorizontalM,
    gridTemplateColumns: "minmax(0, 3.2fr) minmax(190px, 1fr)",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
  },
  financialGrid: {
    gridTemplateColumns:
      "minmax(0, 1.3fr) minmax(0, 1.25fr) minmax(0, 0.8fr)",
    columnGap: tokens.spacingHorizontalXS,
    rowGap: tokens.spacingVerticalS,
  },
  fieldRow: {
    minWidth: 0,
    "& > div": {
      width: "100%",
      minWidth: 0,
    },
    "& input": {
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
    },
  },
  textareaRow: {
    minWidth: 0,
    "& textarea": {
      width: "100%",
      minWidth: 0,
      minHeight: "48px",
      boxSizing: "border-box",
      resize: "vertical",
    },
  },
  label: {
    minWidth: 0,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
});

const ServiceEngineDataInitiation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const methods = useForm<ServiceEngineDataInitiationFormValues>({
    defaultValues: SERVICE_ENGINE_DEFAULT_VALUES,
  });
  const { control } = methods;
  const styles = useStyles();

  return (
    <FormProvider {...methods}>
      <section className={styles.section}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.toggle}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} Service Engine Data Initiation`}
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? "−" : "+"}
          </button>
          <h3 className={styles.heading}>Service Engine Data Initiation</h3>
        </div>

        {isExpanded && (
          <ResponsiveGrid
            className={styles.content}
          >
            <div className={styles.fieldRow}>
              <FormInput
                name="seProgram"
                control={control}
                label="SE Program"
                labelPosition="left"
                labelClassName={styles.label}
              />
            </div>
            <div className={styles.fieldRow}>
              <FormInput
                name="moveType"
                control={control}
                label="Move Type"
                labelPosition="left"
                labelClassName={styles.label}
              />
            </div>
            <ResponsiveGrid
              className={styles.financialGrid}
            >
              <FormInput
                name="monetaryCap"
                control={control}
                label="Is there a monetary cap on this relocation?"
                labelPosition="left"
                labelClassName={styles.label}
              />
              <FormInput
                name="monetaryCapAmount"
                control={control}
                label="If yes what is the amount"
                labelPosition="left"
                labelClassName={styles.label}
              />
              <FormInput
                name="currency"
                control={control}
                label="Currency"
                labelPosition="left"
                labelClassName={styles.label}
              />
            </ResponsiveGrid>
            <div className={styles.fieldRow}>
              <FormInput
                name="preferredMoveDate"
                control={control}
                label="Preferred Move Date"
                labelPosition="left"
                labelClassName={styles.label}
              />
            </div>
            <TextAreaField
              name="empInstructions"
              control={control}
              label="EMP Instructions"
              labelPosition="left"
              className={styles.textareaRow}
              labelClassName={styles.label}
            />
            <div className={styles.fieldRow}>
              <FormInput
                name="citizenship"
                control={control}
                label="Citizenship"
                labelPosition="left"
                labelClassName={styles.label}
              />
            </div>
            <TextAreaField
              name="confidentialAssignmentRequirements"
              control={control}
              label="Confidential Assignment Requirements"
              labelPosition="left"
              className={styles.textareaRow}
              labelClassName={styles.label}
            />
            <div className={styles.fieldRow}>
              <FormInput
                name="volume"
                control={control}
                label="Volume"
                labelPosition="left"
                labelClassName={styles.label}
              />
            </div>
            <TextAreaField
              name="reasonForRushMove"
              control={control}
              label="Reason for Rush Move"
              labelPosition="left"
              className={styles.textareaRow}
              labelClassName={styles.label}
            />
            <div className={styles.fieldRow}>
              <FormInput
                name="containerSize"
                control={control}
                label="Container Size"
                labelPosition="left"
                labelClassName={styles.label}
              />
            </div>
            <TextAreaField
              name="singlePointOfContactInstructions"
              control={control}
              label="Single Point of Contact Instructions"
              labelPosition="left"
              className={styles.textareaRow}
              labelClassName={styles.label}
            />
            <div className={styles.fieldRow}>
              <FormInput
                name="unitsOfMeasurement"
                control={control}
                label="Units of Measurement"
                labelPosition="left"
                labelClassName={styles.label}
              />
            </div>
          </ResponsiveGrid>
        )}
      </section>
    </FormProvider>
  );
};

export default ServiceEngineDataInitiation;