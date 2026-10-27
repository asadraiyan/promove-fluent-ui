import React, { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";
import {
  AddressDetailsFormValues,
  AddressPhoneNumber,
} from "./AddressDetails.types";
import NameSection from "./components/NameSection";
import AddressSection from "./components/AddressSection";
import { ADDRESS_DETAILS_DEFAULT_VALUES } from "./constants";
import ContactDetails from "./components/ContactDetails";
import ShipperDeclaration from "./components/ShipperDeclaration";
import AccessInfo from "./components/AccessInfo";
import { Button, ResponsiveGrid, Typography } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadCities, loadCountries } from "./reducers/locationDataSlice";
import { clearSelectedAddressDetails } from "./reducers/addressDetailsSlice";
import AddressList from "./components/AddressList";

const formatPhoneNumber = (phone: AddressPhoneNumber | null): string =>
  phone ? [phone.areaCode, phone.number].filter(Boolean).join("-") : "";

const preferredContactById: Record<number, string> = {
  1: "email",
  2: "mobile",
  3: "phone",
};

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
    gridTemplateColumns: "2fr 1fr",
    gap: tokens.spacingHorizontalL,
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
  const {
    data: selectedAddress,
    selectedAddressId,
    status: addressDetailsStatus,
    error: addressDetailsError,
  } = useAppSelector((state) => state.addressDetails);
  const methods = useForm<AddressDetailsFormValues>({
    defaultValues: ADDRESS_DETAILS_DEFAULT_VALUES,
  });

  const { dirtyFields } = methods.formState;
  const formValues = useWatch({ control: methods.control });
  const hasFormValues = Object.values(formValues).some(
    (value) => value.trim().length > 0,
  );

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedAddress) return;

    methods.reset({
      ...ADDRESS_DETAILS_DEFAULT_VALUES,
      prefix: selectedAddress.prefix ?? "",
      firstName: selectedAddress.firstName ?? "",
      middleName: selectedAddress.middleName ?? "",
      lastName: selectedAddress.lastName ?? "",
      nickName: selectedAddress.nickName ?? "",
      addressType: selectedAddress.addressType.toLowerCase(),
      country: selectedAddress.country?.id ?? "",
      address1: selectedAddress.address1 ?? "",
      address2: selectedAddress.address2 ?? "",
      address3: selectedAddress.address3 ?? "",
      city: selectedAddress.city?.id ?? "",
      state: selectedAddress.state?.id ?? "",
      postcode: selectedAddress.postcode ?? "",
      homeTel: formatPhoneNumber(selectedAddress.homeTel),
      officeTel: formatPhoneNumber(selectedAddress.officeTel),
      mobile1: formatPhoneNumber(selectedAddress.mobile1),
      mobile2: formatPhoneNumber(selectedAddress.mobile2),
      fax: formatPhoneNumber(selectedAddress.fax),
      email: selectedAddress.email ?? "",
      preferred:
        selectedAddress.preferredContactId === null
          ? ""
          : preferredContactById[selectedAddress.preferredContactId] ?? "",
      alternateEmail: selectedAddress.alternateEmail ?? "",
      accessInfo: selectedAddress.accessInfo ?? "",
      directions: selectedAddress.directions ?? "",
    });

    if (
      selectedAddress.country &&
      selectedAddress.state &&
      selectedAddress.city
    ) {
      dispatch(
        loadCities({
          countryCode: selectedAddress.country.id,
          stateCode: selectedAddress.state.id,
          search: selectedAddress.city.name,
        }),
      );
    }
  }, [dispatch, methods.reset, selectedAddress]);

  const onSubmit = (data: AddressDetailsFormValues) => {
    if (selectedAddressId === null) {
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
    dispatch(clearSelectedAddressDetails());
  };

  return (
    <>
      <AddressList />
      <FormProvider {...methods}>
        <form className={styles.root} onSubmit={methods.handleSubmit(onSubmit)}>
          {addressDetailsError && (
            <div role="alert">{addressDetailsError}</div>
          )}
          <div className={styles.header}>
            <h2 className={styles.heading}>Address details</h2>
          </div>
          <ResponsiveGrid className={styles.formBody}>
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
          </ResponsiveGrid>

          <div className={styles.footer}>
            <hr className={styles.divider} />
            <div className={styles.actionSection}>
              <Typography>
                Modification Date : 07/08/2026 10:14:10 EST
              </Typography>
              <div className={styles.btnContainer}>
                <Button type="button" onClick={handleNewClick}>
                  New
                </Button>
                <Button
                  type="submit"
                  disabled={
                    !hasFormValues || addressDetailsStatus === "loading"
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressDetails;
