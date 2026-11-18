import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import { QuoteDetailsSection } from "./components/QuoteDetailsSection";
import { QuoteHeader } from "./components/QuoteHeader";
import { QuoteOptionsSection } from "./components/QuoteOptionsSection";
import { WeightVolumesSection } from "./components/WeightVolumesSection";
import { EMPTY_QUOTE_FORM } from "./constants";
import type { QuoteFormValues } from "./quote.types";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
  },
  content: {
    maxWidth: "1600px",
    margin: "0 auto",
    padding: tokens.spacingHorizontalL,
    minWidth: 0,
  },
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalL,
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

const Quote: React.FC = () => {
  const styles = useStyles();
  const { control } = useForm<QuoteFormValues>({
    defaultValues: EMPTY_QUOTE_FORM,
  });

  return (
    <main className={styles.page}>
      <QuoteHeader />
      <div className={styles.content}>
        <div className={styles.sections}>
          <QuoteOptionsSection control={control} />
          <QuoteDetailsSection control={control} />
          <WeightVolumesSection control={control} />
        </div>
      </div>
    </main>
  );
};

export default Quote;
