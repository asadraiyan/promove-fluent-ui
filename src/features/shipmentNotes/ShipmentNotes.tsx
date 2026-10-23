import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import { TextAreaField } from "@/shared";
import { ShipmentNotesValues } from "./ShipmentNotes.types";
import { SHIPMENT_NOTE_FIELDS } from "./constants";

const useStyles = makeStyles({
  section: {
    boxSizing: "border-box",
    width: "min(100% - 32px, 1200px)",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingBottom: tokens.spacingVerticalS,
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
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  content: {
    paddingTop: tokens.spacingVerticalM,
  },
  subheading: {
    margin: `0 0 ${tokens.spacingVerticalM}`,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  fields: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalM,
    "@media (max-width: 768px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  field: {
    minWidth: 0,
    "& label": {
      display: "block",
      marginBottom: tokens.spacingVerticalXS,
      color: tokens.colorNeutralForeground1,
      fontSize: tokens.fontSizeBase300,
      fontWeight: tokens.fontWeightSemibold,
    },
    "& textarea": {
      boxSizing: "border-box",
      width: "100%",
      minHeight: "100px",
      resize: "vertical",
    },
  },
});

const ShipmentNotes: React.FC = () => {
  const { control } = useForm<ShipmentNotesValues>({
    defaultValues: {
      ourResponsibilities: "",
      operationalNotesForCrew: "",
      customerResponsibilities: "",
      noteForOperations: "",
      itemsNotToBeMoved: "",
      moveCoordinatorNotes: "",
      additionalNotes: "",
      forwardingServicesNotes: "",
    },
  });
  const styles = useStyles();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Shipment Notes</h2>
        </div>
        <div className={styles.content}>
          <h3 className={styles.subheading}>Notes</h3>
          <div className={styles.fields}>
            {SHIPMENT_NOTE_FIELDS.map(({ name, label }) => (
              <TextAreaField
                key={name}
                name={name}
                control={control}
                label={label}
                className={styles.field}
                rows={4}
              />
            ))}
          </div>
        </div>
    </section>
  );
};

export default ShipmentNotes;
