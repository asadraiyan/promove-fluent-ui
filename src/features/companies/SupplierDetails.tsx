import React, { useState } from "react";
import {
  makeStyles,
  Tab,
  TabList,
  tokens,
} from "@fluentui/react-components";
import { FormProvider, useForm } from "react-hook-form";

import { ResponsiveGrid } from "@/shared";

import type {
  SupplierTab,
  SupplierDetailsFormValues,
} from "./SupplierDetails.types";

import {
  EMPTY_SUPPLIER_DETAILS,
  SUPPLIER_TABS,
} from "./constants";
import General from "./components/General";
import Contract from "./components/Contract";
import Tariff from "./components/Tariff";
import InstAgtselAllow from "./components/InstAgtselAllow";
import PsInsBil from "./components/PsInsBil";
import ClmQualOthr from "./components/ClmQualOthr";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1280px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: 0,
  },
    tabsWrapper: {
    width: "100%",
    minWidth: 0,
    marginBottom: tokens.spacingVerticalL,
  },

tabList: {
  display: "flex",
  flexWrap: "nowrap",
  overflowX: "auto",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  marginBottom: tokens.spacingVerticalL,
  gap: tokens.spacingHorizontalXS,
  scrollbarWidth: "thin",
},

tab: {
  flexShrink: 0,
  minWidth: "fit-content",
  fontWeight: tokens.fontWeightSemibold,
},

  tabContent: {
    width: "100%",
    minWidth: 0,
  },
});

const SupplierDetails: React.FC = () => {
  const styles = useStyles();

  const [selectedTab, setSelectedTab] =
    useState<SupplierTab>("general");

  const supplierForm = useForm<SupplierDetailsFormValues>({
    defaultValues: EMPTY_SUPPLIER_DETAILS,
    mode: "onBlur",
  });

  const renderTabContent = () => {
    switch (selectedTab) {
      case "general":
        return <General />;

      case "contract":
        return <Contract />;

      case "tariff":
        return <Tariff />;

      case "instAgtselAllow":
        return <InstAgtselAllow />;

      case "psInsBil":
        return <PsInsBil />;

      case "clmQualOthr":
        return <ClmQualOthr />;

      default:
        return null;
    }
  };

  const handleSubmit = (values: SupplierDetailsFormValues) => {
    console.log("Supplier Details:", values);
  };

  return (
    <FormProvider {...supplierForm}>
      <form onSubmit={supplierForm.handleSubmit(handleSubmit)}>
        <div className={styles.root}>
        <ResponsiveGrid className={styles.tabsWrapper}>
          <TabList
            className={styles.tabList}
            selectedValue={selectedTab}
            onTabSelect={(_, data) =>
              setSelectedTab(data.value as SupplierTab)
            }
          >
            {SUPPLIER_TABS.map((tab) => (
              <Tab
                key={tab.key}
                value={tab.key}
                className={styles.tab}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
        </ResponsiveGrid>

          <ResponsiveGrid className={styles.tabContent}>
            {renderTabContent()}
          </ResponsiveGrid>
        </div>
      </form>
    </FormProvider>
  );
};

export default SupplierDetails;