import React from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { MoreHorizontalRegular } from "@fluentui/react-icons";
import { Button, FormInput, ResponsiveGrid } from "@/shared";
import type { QuoteFormSectionProps } from "../quote.types";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusMedium,
    minWidth: 0,
  },
  title: {
   fontWeight: tokens.fontWeightSemibold
  },
  collapseButton: {
    minWidth: "28px",
    width: "28px",
    height: "28px",
  },
  table: {
    gridTemplateColumns:
      "minmax(90px, 120px) 40px repeat(2, minmax(100px, 155px)) 40px repeat(2, minmax(100px, 155px)) 44px 85px minmax(100px, 155px)",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
    alignItems: "center",
    justifyContent: "start",
    minWidth: 0,
  },
  columnHeading: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
    textAlign: "center",
  },
  rowLabel: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: "nowrap",
  },
  unit: {
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
  },
  moreButton: {
    minWidth: "44px",
    width: "44px",
    height: "40px",
  },
  densityLabel: {
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: "nowrap",
  },
});

export const WeightVolumesSection: React.FC<QuoteFormSectionProps> = ({
  control,
}) => {
  const styles = useStyles();

  return (
    <section className={styles.section} aria-labelledby="weight-volumes-title">
      <Text id="weight-volumes-title" className={styles.title}>Weight Volumes</Text>
      <ResponsiveGrid className={styles.table}>
        <div />
        <div />
        <Text className={styles.columnHeading}>Net</Text>
        <Text className={styles.columnHeading}>Gross</Text>
        <div />
        <Text className={styles.columnHeading}>Net</Text>
        <Text className={styles.columnHeading}>Gross</Text>
        <div />
        <div />
        <div />

        <Text className={styles.rowLabel}>Weight</Text>
        <Text className={styles.unit}>lbs:</Text>
        <FormInput
          name="weightNetLbs"
          control={control}
          type="number"
          ariaLabel="Net weight in pounds"
        />
        <FormInput
          name="weightGrossLbs"
          control={control}
          type="number"
          ariaLabel="Gross weight in pounds"
        />
        <Text className={styles.unit}>kg:</Text>
        <FormInput
          name="weightNetKg"
          control={control}
          type="number"
          ariaLabel="Net weight in kilograms"
        />
        <FormInput
          name="weightGrossKg"
          control={control}
          type="number"
          ariaLabel="Gross weight in kilograms"
        />
        <div />
        <div />
        <div />

        <Text className={styles.rowLabel}>Volume</Text>
        <Text className={styles.unit}>cuft:</Text>
        <FormInput
          name="volumeNetCuft"
          control={control}
          type="number"
          ariaLabel="Net volume in cubic feet"
        />
        <FormInput
          name="volumeGrossCuft"
          control={control}
          type="number"
          ariaLabel="Gross volume in cubic feet"
        />
        <Text className={styles.unit}>M3:</Text>
        <FormInput
          name="volumeNetM3"
          control={control}
          type="number"
          ariaLabel="Net volume in cubic meters"
        />
        <FormInput
          name="volumeGrossM3"
          control={control}
          type="number"
          ariaLabel="Gross volume in cubic meters"
        />
        <Button
          type="button"
          appearance="subtle"
          className={styles.moreButton}
          aria-label="More weight and volume actions"
          title="More actions"
        >
          <MoreHorizontalRegular />
        </Button>
        <Text className={styles.densityLabel}>Density:</Text>
        <FormInput
          name="totalDensity"
          control={control}
          type="number"
          ariaLabel="Density"
        />
      </ResponsiveGrid>
    </section>
  );
};
