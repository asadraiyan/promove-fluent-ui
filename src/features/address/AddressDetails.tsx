import React, { useEffect } from "react";
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
import { useAppDispatch } from "@/app/hooks";
import { loadLocationData } from "./reducers/locationDataSlice";
import {
  loadAddressDetailsPeople,
  selectAddressDetailsPerson,
} from "./reducers/addressDetailsSlice";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1200px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    "& input, & select, & textarea": {
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
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
    "@media (max-width: 600px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
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
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
});

const AddressDetails: React.FC = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const methods = useForm<AddressDetailsFormValues>({
    defaultValues: ADDRESS_DETAILS_DEFAULT_VALUES,
  });

  const { dirtyFields } = methods.formState;

  useEffect(() => {
    dispatch(loadAddressDetailsPeople());
    dispatch(loadLocationData());
  }, [dispatch]);

  const onSubmit = (data: AddressDetailsFormValues) => {
    if (!data.prefix) {
      console.log("Create New Payload:", data);
    } else {
      const updatePayload: Partial<AddressDetailsFormValues> = {};

      (
        Object.keys(dirtyFields) as Array<keyof AddressDetailsFormValues>
      ).forEach((key) => {
        if (dirtyFields[key]) {
          (updatePayload as any)[key] = data[key];
        }
      });

      console.log("Update Payload (Modified Fields Only):", updatePayload);
    }
  };

  const handleNewClick = () => {
    methods.reset(ADDRESS_DETAILS_DEFAULT_VALUES);
    dispatch(selectAddressDetailsPerson(null));
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
            <div className={styles.btnContainer}>
              <Button type="button" onClick={handleNewClick}>
                New
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddressDetails;
