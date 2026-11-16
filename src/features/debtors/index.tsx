import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";
import Tabs from "../../shared/components/Tabs/Tabs";

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
    maxWidth: "1400px",
    margin: "0 auto",
  },
});

export const DebtorsUI: React.FC = () => {
  const styles = useStyles();
  const { control, handleSubmit } = useForm<DebtorsFormData>();
  const [activeTab, setActiveTab] = useState<DebtorsTabKey>("nameAndAddress");

  const onSubmit: SubmitHandler<DebtorsFormData> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
      <HeaderSection control={control} />

      <Tabs
        items={debtorsTabs}
        value={activeTab}
        onChange={(value) => setActiveTab(value as DebtorsTabKey)}
        isBorder
      >
        {activeTab === "nameAndAddress" && (
          <NameAndAddressSection control={control} />
        )}
        {activeTab === "contact" && <ContactSection control={control} />}
        {activeTab === "vatRegistration" && (
          <VatRegistrationSection control={control} />
        )}
        {activeTab === "sunSpecifics" && (
          <SunSpecificsSection control={control} />
        )}
        {activeTab === "locationAndSearchKey" && (
          <LocationAndSearchKeySection control={control} />
        )}
        {activeTab === "paymentTerms" && (
          <PaymentTermsSection control={control} />
        )}
      </Tabs>
    </form>
  );
};

export default DebtorsUI;

type DebtorsTabKey =
  | "nameAndAddress"
  | "contact"
  | "vatRegistration"
  | "sunSpecifics"
  | "locationAndSearchKey"
  | "paymentTerms";

const debtorsTabs = [
  { value: "nameAndAddress", label: "Name and Address" },
  { value: "contact", label: "Contact" },
  { value: "vatRegistration", label: "VAT Registration" },
  { value: "sunSpecifics", label: "SUN Specifics" },
  { value: "locationAndSearchKey", label: "Location and Search Key" },
  { value: "paymentTerms", label: "Payment Terms" },
];
