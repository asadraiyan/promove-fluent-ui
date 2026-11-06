import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, tokens, Divider, Text } from "@fluentui/react-components";

import {
  InvoicingAddressDetailsFormValues,
  ModalDropdownOptions,
} from "../types";
import { CommonEditDialog, FormInput, FormDropdown } from "@/shared";
import {
  loadCountries,
  loadStates,
  LocationDataState,
} from "@/features/address/reducers/locationDataSlice";

const useStyles = makeStyles({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalXXL,
    marginTop: tokens.spacingVerticalM,
    "@media (max-width: 1024px)": {
      gridTemplateColumns: "1fr",
    },
  },
  topHeaderGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
  },
  sectionTitle: {
    fontWeight: "600",
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalS,
    display: "block",
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  plainTextRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, min(12rem, 40%)) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalXS,
  },
  plainTextLabel: {
    justifySelf: "end",
    textAlign: "right",
  },
});

interface InvoicingAddressDetailsModalProps {
  open: boolean;
  onClose: () => void;
  defaultValues: InvoicingAddressDetailsFormValues;
  options: ModalDropdownOptions;
}

export const InvoicingAddressDetailsModal: React.FC<
  InvoicingAddressDetailsModalProps
> = ({ open, onClose, defaultValues, options }) => {
  const styles = useStyles();

  const dispatch = useDispatch<any>();

  const { countries, states } = useSelector(
    (state: { locationData: LocationDataState }) => state.locationData,
  );

  const { control, reset } = useForm<InvoicingAddressDetailsFormValues>({
    defaultValues,
  });

  const selectedCountryCode = useWatch({
    control,
    name: "country",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (open) {
      dispatch(loadCountries());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (selectedCountryCode) {
      dispatch(loadStates(selectedCountryCode));
    }
  }, [dispatch, selectedCountryCode]);

  const apiCountryOptions = countries.map((c) => ({
    label: c.description,
    value: c.countryCode,
  }));

  const apiStateOptions = states.map((s) => ({
    label: s.description,
    value: s.stateCode || s.id,
  }));

  const content = (
    <div>
      <div className={styles.topHeaderGrid}>
        <FormDropdown
          name="owner"
          control={control}
          label="Owner"
          options={options.ownerOptions}
          labelPosition="left"
          disabled
        />
        <FormInput
          name="number"
          control={control}
          label="Number"
          readOnly
          labelPosition="left"
        />
        <FormDropdown
          name="status"
          control={control}
          label="Status"
          options={options.statusOptions}
          labelPosition="left"
          disabled
        />
        <FormDropdown
          name="private"
          control={control}
          label="Private"
          options={options.privateOptions}
          labelPosition="left"
          disabled
        />
        <FormDropdown
          name="debtorType"
          control={control}
          label="Debtor type"
          options={options.debtorTypeOptions}
          labelPosition="left"
          disabled
        />
      </div>

      <Divider />

      <div className={styles.gridContainer}>
        <div className={styles.formSection}>
          <Text className={styles.sectionTitle}>Name and address</Text>
          <FormInput
            name="name"
            control={control}
            label="Name"
            labelPosition="left"
          />
          <FormInput
            name="namePart2"
            control={control}
            label="Name (part 2)"
            labelPosition="left"
          />

          <FormDropdown
            name="country"
            control={control}
            label="Country"
            options={apiCountryOptions}
            labelPosition="left"
            placeholder="Select a country"
          />

          <FormInput
            name="address1"
            control={control}
            label="Address1"
            labelPosition="left"
          />
          <FormInput
            name="address2"
            control={control}
            label="Address2"
            labelPosition="left"
          />
          <FormInput
            name="address3"
            control={control}
            label="Address3"
            labelPosition="left"
          />
          <FormInput
            name="city"
            control={control}
            label="City"
            labelPosition="left"
          />

          <FormDropdown
            name="stateCounty"
            control={control}
            label="State/County"
            options={apiStateOptions}
            labelPosition="left"
            placeholder="Select a state"
          />

          <FormInput
            name="postalCode"
            control={control}
            label="Postal code"
            labelPosition="left"
          />
          <FormInput
            name="telephone"
            control={control}
            label="Telephone"
            labelPosition="left"
          />
          <FormInput
            name="fax"
            control={control}
            label="Fax"
            labelPosition="left"
          />
          <FormInput
            name="email"
            control={control}
            label="e-mail"
            labelPosition="left"
          />

          <Divider
            style={{
              margin: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalM} 0`,
            }}
          />

          <Text className={styles.sectionTitle}>Contact</Text>
          <FormDropdown
            name="contactTitle"
            control={control}
            label="Title"
            options={options.titleOptions}
            labelPosition="left"
          />
          <FormInput
            name="contactName"
            control={control}
            label="Name"
            labelPosition="left"
          />
          <FormInput
            name="contactEmail"
            control={control}
            label="e-mail"
            labelPosition="left"
          />
          <FormInput
            name="contactTel"
            control={control}
            label="Tel"
            labelPosition="left"
          />
          <FormInput
            name="contactMobile"
            control={control}
            label="Mobile"
            labelPosition="left"
          />
          <FormInput
            name="contactFax"
            control={control}
            label="Fax"
            labelPosition="left"
          />
        </div>

        <div
          className={styles.formSection}
          style={{ marginTop: tokens.spacingVerticalXL }}
        >
          <FormDropdown
            name="vatRegistration"
            control={control}
            label="VAT registration"
            options={options.vatRegistrationOptions}
            labelPosition="left"
          />
          <FormInput
            name="vatNumber"
            control={control}
            label="VAT number"
            labelPosition="left"
          />
          <FormInput
            name="vatRegistrationNumber"
            control={control}
            label="VAT registration number"
            labelPosition="left"
          />
          <FormInput
            name="dunsNumber"
            control={control}
            label="DUNS number"
            labelPosition="left"
          />
          <FormDropdown
            name="invoicePrintMode"
            control={control}
            label="Invoice print mode"
            options={options.invoicePrintModeOptions}
            labelPosition="left"
          />
          <FormDropdown
            name="collectionMode"
            control={control}
            label="Collection mode"
            options={options.collectionModeOptions}
            labelPosition="left"
          />
          <FormDropdown
            name="termsOfPayment"
            control={control}
            label="Terms of payment"
            options={options.termsOfPaymentOptions}
            labelPosition="left"
          />
          <FormDropdown
            name="defaultCurrency"
            control={control}
            label="Default currency"
            options={options.defaultCurrencyOptions}
            labelPosition="left"
          />
          <FormDropdown
            name="fxEffectiveDate"
            control={control}
            label="FX effective date"
            options={options.fxEffectiveDateOptions}
            labelPosition="left"
          />
          <FormDropdown
            name="defaultLanguage"
            control={control}
            label="Default language"
            options={options.defaultLanguageOptions}
            labelPosition="left"
          />
          <FormInput
            name="invoiceRole"
            control={control}
            label="Invoice role"
            labelPosition="left"
          />

          <Divider
            style={{
              margin: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalM} 0`,
            }}
          />

          <Text className={styles.sectionTitle}>SUN specifics</Text>
          <FormInput
            name="lookupCode"
            control={control}
            label="Lookup code"
            labelPosition="left"
          />
          <FormInput
            name="accountGroupParent"
            control={control}
            label="Account group parent"
            labelPosition="left"
          />

          <div style={{ marginTop: tokens.spacingVerticalM }}>
            <div className={styles.plainTextRow}>
              <Text className={styles.plainTextLabel}>Modification user</Text>
              <Text>{defaultValues.modificationUser}</Text>
            </div>
            <div className={styles.plainTextRow}>
              <Text className={styles.plainTextLabel}>Modification date</Text>
              <Text>{defaultValues.modificationDate}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <CommonEditDialog
      open={open}
      heading="Invoicing Address Details"
      content={content}
      onClose={onClose}
      showCloseButton={true}
      maxWidth="1100px"
    />
  );
};
