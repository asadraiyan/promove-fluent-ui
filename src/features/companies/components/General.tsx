import React, { useEffect, useMemo } from "react";
import { Checkbox, makeStyles, tokens } from "@fluentui/react-components";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import {FormDropdown, FormInput, ResponsiveGrid, ResponsiveGridLabel, Typography} from "@/shared";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { ModalTable} from "@/shared/components/Table/ModalTable";
import {loadCities, loadCountries, loadStates} from "@/features/address/reducers/locationDataSlice";

import type { InvoiceAddressRow, SupplierDetailsFormValues } from "../SupplierDetails.types";
import {
  BILLABLE_AT_OPTIONS,
  COMPANY_STATUS_OPTIONS,
  COMPANY_TYPE_OPTIONS,
  CURRENCY_OPTIONS,
  invoiceAddressColumns,
  invoiceAddresses,
  LANGUAGE_OPTIONS,
  OWNER_OPTIONS,
} from "../constants";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    width: "100%",
    minWidth: 0,
  },
  companyHeader: {
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalM,
    alignItems: "end",
    width: "100%",
  },
  detailsGrid: {
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
    width: "100%",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    minWidth: 0,
  },
  sectionTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  addressFields: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  fieldRow: {
    gridTemplateColumns: "minmax(90px, 125px) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS,
    width: "100%",
  },
  compactFieldRow: {
    gridTemplateColumns: "minmax(90px, 125px) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalXS,
    width: "100%",
  },
  inlineControls: {
    display: "grid",
    gridTemplateColumns: "minmax(48px, 0.3fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  payeeRow: {
    gridTemplateColumns:
      "minmax(90px, 105px) minmax(0, 1fr) minmax(100px, 120px) minmax(0, 0.55fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalXS,
    width: "100%",
  },
  fieldLabel: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground1,
    minWidth: 0
  },
  invoiceTable: {
    minWidth: 0,
  },
  invoicePreferences: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalM,
    alignItems: "center",
  },
  contactFields: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  consumerRow: {
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
  },
  checkbox: {
    minHeight: "32px",
    minWidth: 0,
  },
  profileRow: {
    alignItems: "start",
  },
  profileLabel: {
    paddingTop: tokens.spacingVerticalS,
  },
  alert: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
  },
  policyField: {
    width: "100%",
    maxWidth: "360px",
    minWidth: 0,
  },
});

const General: React.FC = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { control, setValue } = useFormContext<SupplierDetailsFormValues>();
  const selectedCountry = useWatch({ control, name: "country" });
  const selectedState = useWatch({ control, name: "state" });
  const {countries, states, cities, countriesStatus, statesStatus, citiesStatus, error} = useAppSelector((state) => state.locationData);

  useEffect(() => {
    if (countriesStatus === "idle") {
      dispatch(loadCountries());
    }
  }, [countriesStatus, dispatch]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(loadStates(selectedCountry));
    }
  }, [dispatch, selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      dispatch(
        loadCities({
          countryCode: selectedCountry,
          stateCode: selectedState || undefined,
        }),
      );
    }
  }, [dispatch, selectedCountry, selectedState]);

  const countryOptions = useMemo(
    () =>
      countries.map(({ countryCode, description }) => ({
        value: countryCode,
        label: description,
      })),
    [countries],
  );
  const stateOptions = useMemo(
    () =>
      states.map(({ id, description }) => ({
        value: id,
        label: description,
      })),
    [states],
  );
  const cityOptions = useMemo(
    () =>
      cities.map(({ id, description }) => ({
        value: id,
        label: description,
      })),
    [cities],
  );

  const clearLocationAfterCountryChange = () => {
    setValue("state", "", { shouldDirty: true, shouldValidate: true });
    setValue("city", "", { shouldDirty: true, shouldValidate: true });
  };
  const clearCityAfterStateChange = () => {
    setValue("city", "", { shouldDirty: true, shouldValidate: true });
  };

  const countryLoading =
    countriesStatus === "idle" || countriesStatus === "loading";

  return (
    <div className={styles.root}>
      {error && (
        <div className={styles.alert} role="alert">
          {error}
        </div>
      )}

      <ResponsiveGrid className={styles.companyHeader}>
        <FormDropdown
          name="companyType"
          control={control}
          label="Type"
          placeholder="Select"
          options={COMPANY_TYPE_OPTIONS}
        />
        <FormDropdown
          name="owner"
          control={control}
          label="Owner"
          placeholder="Select"
          options={OWNER_OPTIONS}
        />
        <FormInput
          name="scanReference"
          control={control}
          label="SCAN REF"
        />
        <FormInput name="companyId" control={control} label="ID" />
        <FormInput name="gcId" control={control} label="GC ID" />
        <FormDropdown
          name="status"
          control={control}
          label="Status"
          placeholder="Select"
          options={COMPANY_STATUS_OPTIONS}
        />
      </ResponsiveGrid>

      <ResponsiveGrid className={styles.detailsGrid}>
        <section className={styles.section}>
          <Typography className={styles.sectionTitle}>
            Name and address
          </Typography>

          <div className={styles.addressFields}>
            <FormInput
              name="companyName"
              control={control}
              label="Name:"
              labelPosition="left"
              className={styles.fieldRow}
            />
            <FormDropdown
              name="country"
              control={control}
              label="Country:"
              labelPosition="left"
              placeholder={countryLoading ? "Loading..." : "Select"}
              options={countryOptions}
              disabled={countryLoading}
              className={styles.fieldRow}
              onChange={clearLocationAfterCountryChange}
            />
            <FormInput
              name="address1"
              control={control}
              label="Address 1:"
              labelPosition="left"
              className={styles.fieldRow}
            />
            <FormInput
              name="address2"
              control={control}
              label="Address 2:"
              labelPosition="left"
              className={styles.fieldRow}
            />
            <FormInput
              name="address3"
              control={control}
              label="Address 3:"
              labelPosition="left"
              className={styles.fieldRow}
            />
            <FormDropdown
              name="city"
              control={control}
              label="City:"
              labelPosition="left"
              placeholder={
                selectedCountry
                  ? citiesStatus === "loading"
                    ? "Loading..."
                    : "Select"
                  : "Select country first"
              }
              options={cityOptions}
              disabled={!selectedCountry || citiesStatus === "loading"}
              className={styles.fieldRow}
            />
            <FormDropdown
              name="state"
              control={control}
              label="State / Country:"
              labelPosition="left"
              placeholder={
                selectedCountry
                  ? statesStatus === "loading"
                    ? "Loading..."
                    : "Select"
                  : "Select country first"
              }
              options={stateOptions}
              disabled={!selectedCountry || statesStatus === "loading"}
              className={styles.fieldRow}
              onChange={clearCityAfterStateChange}
            />
            <FormInput
              name="postalCode"
              control={control}
              label="Postal code:"
              labelPosition="left"
              className={styles.fieldRow}
            />
            <ResponsiveGrid className={styles.fieldRow}>
              <ResponsiveGridLabel className={styles.fieldLabel}>
                Telephone:
              </ResponsiveGridLabel>
              <div className={styles.inlineControls}>
                <FormInput
                  name="telephoneCountryCode"
                  control={control}
                  ariaLabel="Telephone country code"
                />
                <FormInput
                  name="telephone"
                  control={control}
                  ariaLabel="Telephone number"
                />
              </div>
            </ResponsiveGrid>
            <ResponsiveGrid className={styles.fieldRow}>
              <ResponsiveGridLabel className={styles.fieldLabel}>
                Fax:
              </ResponsiveGridLabel>
              <div className={styles.inlineControls}>
                <FormInput
                  name="faxCountryCode"
                  control={control}
                  ariaLabel="Fax country code"
                />
                <FormInput
                  name="faxNumber"
                  control={control}
                  ariaLabel="Fax number"
                />
              </div>
            </ResponsiveGrid>
            <FormInput
              name="email"
              control={control}
              label="e-mail:"
              labelPosition="left"
              className={styles.fieldRow}
              type="email"
            />
            <FormDropdown
              name="billableAt"
              control={control}
              label="Billable At:"
              labelPosition="left"
              placeholder="Select"
              options={BILLABLE_AT_OPTIONS}
              className={styles.fieldRow}
            />
            <ResponsiveGrid className={styles.payeeRow}>
              <ResponsiveGridLabel className={styles.fieldLabel}>
                Payee code:
              </ResponsiveGridLabel>
              <FormInput
                name="payeeCode"
                control={control}
                ariaLabel="Payee code"
              />
              <ResponsiveGridLabel className={styles.fieldLabel}>
                SCAC:
              </ResponsiveGridLabel>
              <FormInput name="scac" control={control} ariaLabel="SCAC" />
            </ResponsiveGrid>
            <ResponsiveGrid className={styles.payeeRow}>
              <ResponsiveGridLabel className={styles.fieldLabel}>
                Is Cost Plus:
              </ResponsiveGridLabel>
              <div className={styles.checkbox}>
                <Controller
                  name="isCostPlus"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={!!field.value}
                      onChange={(_, data) => field.onChange(data.checked)}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </div>
              <ResponsiveGridLabel className={styles.fieldLabel}>
                Copy to Debtor:
              </ResponsiveGridLabel>
              <div className={styles.checkbox}>
                <Controller
                  name="copyToDebtor"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={!!field.value}
                      onChange={(_, data) => field.onChange(data.checked)}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </div>
            </ResponsiveGrid>
          </div>
        </section>

        <div className={styles.contactFields}>
          <section className={styles.section}>
            <Typography className={styles.sectionTitle}>
              Invoicing addresses
            </Typography>
            <div className={styles.invoiceTable}>
              <ModalTable<InvoiceAddressRow>
                items={invoiceAddresses}
                columns={invoiceAddressColumns}
                getRowId={(row) => row.debtorNumber}
                compact
                fillWidth
              />
            </div>
            <ResponsiveGrid className={styles.invoicePreferences}>
              <FormDropdown
                name="defaultCurrency"
                control={control}
                label="Default currency:"
                labelPosition="left"
                placeholder="Select"
                options={CURRENCY_OPTIONS}
                className={styles.compactFieldRow}
              />
              <FormDropdown
                name="defaultLanguage"
                control={control}
                label="Default language:"
                labelPosition="left"
                placeholder="Select"
                options={LANGUAGE_OPTIONS}
                className={styles.compactFieldRow}
              />
            </ResponsiveGrid>
          </section>

          <section className={styles.section}>
            <ResponsiveGrid className={styles.fieldRow}>
              <ResponsiveGridLabel className={styles.fieldLabel}>
                Collector Code:
              </ResponsiveGridLabel>
              <FormInput
                name="collectorCode"
                control={control}
                ariaLabel="Collector code"
              />
            </ResponsiveGrid>
            <ResponsiveGrid className={styles.invoicePreferences}>
              <FormInput
                name="baId"
                control={control}
                label="BA ID:"
                labelPosition="left"
                className={styles.compactFieldRow}
              />
              <FormInput
                name="bookingAgent"
                control={control}
                label="Booking agent:"
                labelPosition="left"
                className={styles.compactFieldRow}
              />
            </ResponsiveGrid>
            <FormInput
              name="accountManager"
              control={control}
              label="Account manager:"
              labelPosition="left"
              className={styles.fieldRow}
            />
            <ResponsiveGrid className={styles.consumerRow}>
              <FormInput
                name="opsContacts"
                control={control}
                label="Ops contacts:"
                labelPosition="left"
                className={styles.fieldRow}
              />
              <Controller
                name="isConsumer"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label="Is Consumer:"
                    checked={!!field.value}
                    onChange={(_, data) => field.onChange(data.checked)}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </ResponsiveGrid>
            <ResponsiveGrid
              className={`${styles.fieldRow} ${styles.profileRow}`}
            >
              <ResponsiveGridLabel
                className={`${styles.fieldLabel} ${styles.profileLabel}`}
              >
                Client profile SP link:
              </ResponsiveGridLabel>
              <FormInput
                name="clientProfileSpLink"
                control={control}
                ariaLabel="Client profile SP link"
              />
            </ResponsiveGrid>
          </section>
        </div>
      </ResponsiveGrid>
    </div>
  );
};

export default General;