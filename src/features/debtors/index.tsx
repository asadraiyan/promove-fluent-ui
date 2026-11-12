import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import { HeaderSection } from "./components/HeaderSection";
import { NameAndAddressSection } from "./components/NameAndAddressSection";
import { VatRegistrationSection } from "./components/VatRegistrationSection";
import { PaymentTermsSection } from "./components/PaymentTermsSection";
import { ContactSection } from "./components/ContactSection";
import { SunSpecificsSection } from "./components/SunSpecificsSection";
import { LocationAndSearchKeySection } from "./components/LocationAndSearchKeySection";
import { DebtorsFormData } from "./types";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalL,
  },
  columns: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalXL,
  },
  columnGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
});

export const DebtorsUI: React.FC = () => {
  const styles = useStyles();
  const { control, handleSubmit } = useForm<DebtorsFormData>();

  const onSubmit: SubmitHandler<DebtorsFormData> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
      <HeaderSection control={control} />

      <div className={styles.columns}>
        {/* Left Column */}
        <div className={styles.columnGroup}>
          <NameAndAddressSection control={control} />
          <ContactSection control={control} />
        </div>

        {/* Middle Column */}
        <div className={styles.columnGroup}>
          <VatRegistrationSection control={control} />
          <SunSpecificsSection control={control} />
          <LocationAndSearchKeySection control={control} />
        </div>

        {/* Right Column */}
        <div className={styles.columnGroup}>
          <PaymentTermsSection control={control} />
        </div>
      </div>
    </form>
  );
};

export default DebtorsUI;
