import React, { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";

import { FieldLabel, FormInput, TextAreaField } from "@/shared";
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
    display: "grid",
    gridTemplateColumns: "minmax(0, 3.2fr) minmax(190px, 1fr)",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    alignItems: "center",
    padding: tokens.spacingHorizontalM,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "minmax(145px, 0.72fr) minmax(0, 1.8fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
    "& input": {
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
    },
  },
  textareaRow: {
    display: "grid",
    gridTemplateColumns: "minmax(145px, 0.72fr) minmax(0, 1.8fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
    "& textarea": {
      width: "100%",
      minWidth: 0,
      minHeight: "48px",
      boxSizing: "border-box",
      resize: "vertical",
    },
  },
  financialRow: {
    display: "grid",
    gridTemplateColumns: "minmax(100px, 1.3fr) minmax(54px, 0.35fr) minmax(120px, 1.25fr) minmax(76px, 0.65fr) minmax(58px, 0.5fr) minmax(80px, 0.8fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
    "& input": {
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
    },
  },
  financialInput: {
    minWidth: 0,
  },
  label: {
    minWidth: 0,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  compactField: {
    minWidth: 0,
    "& > div": {
      width: "100%",
      minWidth: 0,
    },
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
          <div className={styles.content}>
            <div className={styles.fieldRow}>
              <FieldLabel htmlFor="seProgram" className={styles.label}>
                SE Program
              </FieldLabel>
              <div className={styles.compactField}>
                <FormInput name="seProgram" control={control} />
              </div>
            </div>
            <div className={styles.fieldRow}>
              <FieldLabel htmlFor="moveType" className={styles.label}>
                Move Type
              </FieldLabel>
              <div className={styles.compactField}>
                <FormInput name="moveType" control={control} />
              </div>
            </div>
            <div className={styles.financialRow}>
              <FieldLabel htmlFor="monetaryCap" className={styles.label}>
                Is there a monetary cap on this relocation?
              </FieldLabel>
              <div className={styles.financialInput}>
                <FormInput name="monetaryCap" control={control} />
              </div>
              <FieldLabel htmlFor="monetaryCapAmount" className={styles.label}>
                If yes what is the amount
              </FieldLabel>
              <div className={styles.financialInput}>
                <FormInput name="monetaryCapAmount" control={control} />
              </div>
              <FieldLabel htmlFor="currency" className={styles.label}>
                Currency
              </FieldLabel>
              <div className={styles.financialInput}>
                <FormInput name="currency" control={control} />
              </div>
            </div>
            <div className={styles.fieldRow}>
              <FieldLabel htmlFor="preferredMoveDate" className={styles.label}>
                Preferred Move Date
              </FieldLabel>
              <div className={styles.compactField}>
                <FormInput name="preferredMoveDate" control={control} />
              </div>
            </div>
            <TextAreaField
              name="empInstructions"
              control={control}
              label="EMP Instructions"
              className={styles.textareaRow}
              labelClassName={styles.label}
            />
            <div className={styles.fieldRow}>
              <FieldLabel htmlFor="citizenship" className={styles.label}>
                Citizenship
              </FieldLabel>
              <div className={styles.compactField}>
                <FormInput name="citizenship" control={control} />
              </div>
            </div>
            <TextAreaField
              name="confidentialAssignmentRequirements"
              control={control}
              label="Confidential Assignment Requirements"
              className={styles.textareaRow}
              labelClassName={styles.label}
            />
            <div className={styles.fieldRow}>
              <FieldLabel htmlFor="volume" className={styles.label}>
                Volume
              </FieldLabel>
              <div className={styles.compactField}>
                <FormInput name="volume" control={control} />
              </div>
            </div>
            <TextAreaField
              name="reasonForRushMove"
              control={control}
              label="Reason for Rush Move"
              className={styles.textareaRow}
              labelClassName={styles.label}
            />
            <div className={styles.fieldRow}>
              <FieldLabel htmlFor="containerSize" className={styles.label}>
                Container Size
              </FieldLabel>
              <div className={styles.compactField}>
                <FormInput name="containerSize" control={control} />
              </div>
            </div>
            <TextAreaField
              name="singlePointOfContactInstructions"
              control={control}
              label="Single Point of Contact Instructions"
              className={styles.textareaRow}
              labelClassName={styles.label}
            />
            <div className={styles.fieldRow}>
              <FieldLabel htmlFor="unitsOfMeasurement" className={styles.label}>
                Units of Measurement
              </FieldLabel>
              <div className={styles.compactField}>
                <FormInput name="unitsOfMeasurement" control={control} />
              </div>
            </div>
          </div>
        )}
      </section>
    </FormProvider>
  );
};

export default ServiceEngineDataInitiation;