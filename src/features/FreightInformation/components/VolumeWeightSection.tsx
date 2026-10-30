import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { MoreHorizontalRegular } from "@fluentui/react-icons";
import { Button, ResponsiveGrid } from "@/shared";
import {
  MEASUREMENT_ROWS,
  SECONDARY_WEIGHT_FIELDS,
} from "../constants";
import type { SummaryTextFieldRenderer } from "./SummaryFormFields";

const useStyles = makeStyles({
  section: {
    paddingTop: tokens.spacingVerticalM,
    minWidth: 0,
  },
  sectionTitle: {
    margin: 0,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  volumePanel: {
    minWidth: 0,
  },
  measurementRows: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
  },
  measurementRow: {
    gridTemplateColumns: "minmax(92px, 0.55fr) minmax(0, 1.7fr) minmax(0, 1.2fr)",
    alignItems: "end",
    columnGap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalXS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  measurementLabel: {
    paddingBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  measurementGroup: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  metricGroup: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  unitHeading: {
    gridColumn: "1 / -1",
    marginBottom: 0,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  densityControl: {
    display: "flex",
    alignItems: "end",
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
    "& > div": {
      flex: 1,
      minWidth: 0,
    },
  },
  moreButton: {
    minWidth: "30px",
    height: "32px",
    marginBottom: "1px",
  },
  weightInputs: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
  },
  weightRow: {
    gridTemplateColumns: "minmax(92px, 0.55fr) minmax(0, 1.7fr) minmax(0, 1.2fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalXS} 0`,
  },
  weightLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  summaryWeightGrid: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "end",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalM,
  },
});

interface VolumeWeightSectionProps {
  textField: SummaryTextFieldRenderer;
  onOpenActionHistory: () => void;
}

const VolumeWeightSection: React.FC<VolumeWeightSectionProps> = ({
  textField,
  onOpenActionHistory,
}) => {
  const styles = useStyles();

  return (
    <section className={`${styles.section} ${styles.volumePanel}`}>
      <h3 className={styles.sectionTitle}>Volume - weight</h3>
      <ResponsiveGrid className={styles.measurementRows}>
        {MEASUREMENT_ROWS.map((row) => (
          <ResponsiveGrid className={styles.measurementRow} key={row.label}>
            <div className={styles.measurementLabel}>{row.label}</div>
            <ResponsiveGrid className={styles.measurementGroup}>
              <div className={styles.unitHeading}>
                Imperial ({row.imperialUnit})
              </div>
              {textField(row.imperialNet, "Net", "number")}
              {textField(row.imperialGross, "Gross", "number")}
              {row.imperialDensity ? (
                row.label === "Actual Vol" ? (
                  <div className={styles.densityControl}>
                    {textField(row.imperialDensity, "Density", "number")}
                    <Button
                      type="button"
                      appearance="subtle"
                      className={styles.moreButton}
                      aria-label="More actual volume actions"
                      title="More actions"
                      onClick={onOpenActionHistory}
                    >
                      <MoreHorizontalRegular />
                    </Button>
                  </div>
                ) : (
                  textField(row.imperialDensity, "Density", "number")
                )
              ) : null}
            </ResponsiveGrid>
            <ResponsiveGrid className={styles.metricGroup}>
              <div className={styles.unitHeading}>Metric ({row.metricUnit})</div>
              {textField(row.metricNet, "Net", "number")}
              {textField(row.metricGross, "Gross", "number")}
            </ResponsiveGrid>
          </ResponsiveGrid>
        ))}
      </ResponsiveGrid>

      <ResponsiveGrid className={styles.weightInputs}>
        {SECONDARY_WEIGHT_FIELDS.map((row) => (
          <ResponsiveGrid className={styles.weightRow} key={row.label}>
            <div className={styles.weightLabel}>{row.label}</div>
            <ResponsiveGrid className={styles.measurementGroup}>
              <div className={styles.unitHeading}>Imperial (lbs)</div>
              {textField(row.imperialNet, "Net", "number")}
              {textField(row.imperialGross, "Gross", "number")}
            </ResponsiveGrid>
            <ResponsiveGrid className={styles.metricGroup}>
              <div className={styles.unitHeading}>Metric (Kg)</div>
              {textField(row.metricNet, "Net", "number")}
              {textField(row.metricGross, "Gross", "number")}
            </ResponsiveGrid>
          </ResponsiveGrid>
        ))}
      </ResponsiveGrid>

      <ResponsiveGrid className={styles.summaryWeightGrid}>
        {textField("authorizedWeight", "Auth Weight", "number")}
        {textField("billedWeight", "Billed Weight", "number")}
        {textField("partialDeliveryWeight", "Partial Delivery Weight", "number")}
        {textField("specialWeight", "Special Weight", "number")}
        {textField("surveyWeight", "Survey Weight", "number")}
      </ResponsiveGrid>
    </section>
  );
};

export default VolumeWeightSection;
