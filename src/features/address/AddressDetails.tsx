import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";
import { AddressDetailsFormValues } from "./AddressDetails.types";
import NameSection from "./components/NameSection";
import AddressSection from "./components/AddressSection";
import { ADDRESS_DETAILS_DEFAULT_VALUES } from "./constants";
import ContactDetails from "./components/ContactDetails";
import ShipperDeclaration from "./components/ShipperDeclaration";
import AccessInfo from "./components/AccessInfo";
import { Button, Typography } from "@/shared";

const useStyles = makeStyles({
  root: {
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
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  heading: {
    margin: 0,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  close: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    flexShrink: 0,
    padding: 0,
    border: 0,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase500,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  formBody: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  divider: {
    border: "none",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: `${tokens.spacingVerticalS} 0`,
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    marginTop: tokens.spacingVerticalL,
  },
  actionSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalS,
  },
});

const AddressDetails: React.FC = () => {
  const styles = useStyles();
  const methods = useForm<AddressDetailsFormValues>({
    defaultValues: ADDRESS_DETAILS_DEFAULT_VALUES,
  });

  const onSubmit = (data: AddressDetailsFormValues) => {
    console.log("Address Details:", data);
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.root} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Address details</h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close address details"
          >
            ×
          </button>
        </div>

        <div className={styles.formBody}>
          <div className={styles.leftColumn}>
            <NameSection />
            <hr className={styles.divider} />
            <AddressSection />
            <hr className={styles.divider} />
            <ShipperDeclaration />
          </div>

          <div className={styles.rightColumn}>
            <ContactDetails />
            <hr className={styles.divider} />
            <AccessInfo />
          </div>
        </div>

        <div className={styles.footer}>
          <hr className={styles.divider} />
          <div className={styles.actionSection}>
            <Typography>Modification Date : 07/08/2026 10:14:10 EST</Typography>
            <Button>Close</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddressDetails;
