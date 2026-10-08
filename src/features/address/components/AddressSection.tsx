import React, { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import {
  FormInput,
  FormDropdown,
  ResponsiveGrid,
} from "../../../shared";
import { AddressDetailsFormValues } from "../AddressDetails.types";
import { ADDRESS_TYPE_OPTIONS } from "../constants";
import { useAppSelector } from "@/app/hooks";

const useStyles = makeStyles({
  grid: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalM,
  },
});

const AddressSection: React.FC = () => {
  const styles = useStyles();
  const { control, setValue } = useFormContext<AddressDetailsFormValues>();
  const selectedCountry = useWatch({ control, name: "country" });
  const selectedState = useWatch({ control, name: "state" });
  const { data: locationData, status, error } = useAppSelector(
    (state) => state.locationData,
  );
  const isLoading = status === "idle" || status === "loading";

  const stateOptions = useMemo(() => {
    if (!locationData) return [];

    const country = locationData.countries.find(({ id }) => id === selectedCountry);

    return country?.states.map(({ id, label }) => ({ value: id, label })) ?? [];
  }, [selectedCountry, locationData]);

  const cityOptions = useMemo(() => {
    if (!locationData) return [];

    const country = locationData.countries.find(({ id }) => id === selectedCountry);
    const state = country?.states.find(({ id }) => id === selectedState);

    return state?.cities.map(({ id, label }) => ({ value: id, label })) ?? [];
  }, [selectedCountry, selectedState, locationData]);

  const handleCountryChange = () => {
    setValue("state", "");
    setValue("city", "");
  };

  const handleStateChange = () => {
    setValue("city", "");
  };

  return (
    <section>
      {error && <div role="alert">{error}</div>}
      <ResponsiveGrid className={styles.grid}>
        <FormDropdown
          name="addressType"
          control={control}
          label="Address Type"
          labelPosition="left"
          placeholder="Delivery Address"
          options={ADDRESS_TYPE_OPTIONS}
        />
        <FormDropdown
          name="country"
          control={control}
          label="Country"
          labelPosition="left"
          placeholder={isLoading ? "Loading..." : "Select Country"}
          options={
            locationData?.countries.map(({ id, label }) => ({
              value: id,
              label,
            })) ?? []
          }
          onChange={handleCountryChange}
        />
        <FormInput
          name="address1"
          label="Address 1"
          labelPosition="left"
          control={control}
          placeholder="Enter address"
        />
        <FormInput
          name="address2"
          label="Address 2"
          labelPosition="left"
          control={control}
          placeholder="Enter address"
        />
        <FormInput
          name="address3"
          label="Address 3"
          labelPosition="left"
          control={control}
          placeholder="Enter address"
        />
        <FormDropdown
          name="state"
          control={control}
          label="State/Country"
          labelPosition="left"
          placeholder={
            selectedCountry ? "Select state" : "Select country first"
          }
          options={stateOptions}
          onChange={handleStateChange}
        />
        <FormDropdown
          name="city"
          control={control}
          label="City/Town"
          labelPosition="left"
          placeholder={selectedState ? "Select city" : "Select state first"}
          options={cityOptions}
        />
        <FormInput
          name="postcode"
          label="Postcode"
          labelPosition="left"
          control={control}
          placeholder="Enter postcode"
        />
      </ResponsiveGrid>
    </section>
  );
};

export default AddressSection;
