import React from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { FormInput, ResponsiveGrid } from "@/shared";
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
    fontWeight: tokens.fontWeightSemibold,
  },
  firstRow: {
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
  },
  secondRow: {
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalM,
  },
});

export const QuoteOptionsSection: React.FC<QuoteFormSectionProps> = ({
  control,
}) => {
  const styles = useStyles();

  return (
    <section className={styles.section} aria-labelledby="quote-options-title">
      <Text id="quote-options-title" className={styles.title}>
        Quote Options
      </Text>
      <ResponsiveGrid className={styles.firstRow}>
        <FormInput name="quoteNumber" control={control} label="Quote #" />
        <FormInput name="promoveNumber" control={control} label="ProMove #" />
        <FormInput
          name="bookingAgentSummary"
          control={control}
          label="Booking Agent"
        />
        <FormInput name="jobSummary" control={control} label="Job Summary" />
        <FormInput name="status" control={control} label="Status" />
      </ResponsiveGrid>

      <ResponsiveGrid className={styles.secondRow}>
        <FormInput name="clientName" control={control} label="Client Name" />
        <FormInput name="accountName" control={control} label="Account Name" />
        <FormInput name="gcNumber" control={control} label="GC #" />
        <FormInput
          name="summaryWeight"
          control={control}
          label="Weight"
          type="number"
        />
        <FormInput
          name="summaryVolume"
          control={control}
          label="Volume"
          type="number"
        />
        <FormInput name="originSummary" control={control} label="From" />
        <FormInput name="destinationSummary" control={control} label="To" />
      </ResponsiveGrid>
    </section>
  );
};
