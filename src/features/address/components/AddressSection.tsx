import React, { useState, useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import { FieldLabel, FormInput, FormDropdown } from "../../../shared";
import { AddressDetailsFormValues } from "../AddressDetails.types";
import { ADDRESS_TYPE_OPTIONS } from "../constants";

interface LocationOption {
  value: string;
  label: string;
}
interface StateOption extends LocationOption {
  cities: LocationOption[];
}
interface CountryOption extends LocationOption {
  states: StateOption[];
}
interface LocationDataResponse {
  countries: CountryOption[];
}

const useStyles = makeStyles({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "110px 1.5fr 80px 1fr",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalM,
    alignItems: "center",
  },
  labelCell: {
    justifySelf: "end",
    textAlign: "right",
  },
});

const AddressSection: React.FC = () => {
  const { control, setValue } = useFormContext<AddressDetailsFormValues>();
  const selectedCountry = useWatch({ control, name: "country" });
  const selectedState = useWatch({ control, name: "state" });
  const styles = useStyles();

  const [locationData, setLocationData] = useState<LocationDataResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/locationData.json");

        if (!response.ok) throw new Error("Network response was not ok");

        const data: LocationDataResponse = await response.json();
        setLocationData(data);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  const stateOptions = useMemo(() => {
    if (!locationData) return [];

    const country = locationData.countries.find(
      (option) => option.value === selectedCountry,
    );

    return country?.states.map(({ value, label }) => ({ value, label })) ?? [];
  }, [selectedCountry, locationData]);

  const cityOptions = useMemo(() => {
    if (!locationData) return [];

    const country = locationData.countries.find(
      (option) => option.value === selectedCountry,
    );
    const state = country?.states.find(
      (option) => option.value === selectedState,
    );

    return state?.cities ?? [];
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
      <div className={styles.gridContainer}>
        <div className={styles.labelCell}>
          <FieldLabel>Address Type</FieldLabel>
        </div>
        <FormDropdown
          name="addressType"
          control={control}
          placeholder="Delivery Address"
          options={ADDRESS_TYPE_OPTIONS}
        />
        <div /> <div />
        <div className={styles.labelCell}>
          <FieldLabel>Country</FieldLabel>
        </div>
        <FormDropdown
          name="country"
          control={control}
          placeholder={isLoading ? "Loading..." : "Select Country"}
          options={
            locationData?.countries.map(({ value, label }) => ({
              value,
              label,
            })) ?? []
          }
          onChange={handleCountryChange}
        />
        <div /> <div />
        <div className={styles.labelCell}>
          <FieldLabel>Address 1</FieldLabel>
        </div>
        <FormInput
          name="address1"
          control={control}
          placeholder="Enter address"
        />
        <div /> <div />
        <div className={styles.labelCell}>
          <FieldLabel>Address 2</FieldLabel>
        </div>
        <FormInput
          name="address2"
          control={control}
          placeholder="Enter address"
        />
        <div /> <div />
        <div className={styles.labelCell}>
          <FieldLabel>Address 3</FieldLabel>
        </div>
        <FormInput
          name="address3"
          control={control}
          placeholder="Enter address"
        />
        <div /> <div />
        <div className={styles.labelCell}>
          <FieldLabel>State/Country</FieldLabel>
        </div>
        <FormDropdown
          name="state"
          control={control}
          placeholder={
            selectedCountry ? "Select state" : "Select country first"
          }
          options={stateOptions}
          onChange={handleStateChange}
        />
        <div /> <div />
        <div className={styles.labelCell}>
          <FieldLabel>City/Town</FieldLabel>
        </div>
        <FormDropdown
          name="city"
          control={control}
          placeholder={selectedState ? "Select city" : "Select state first"}
          options={cityOptions}
        />
        <div className={styles.labelCell}>
          <FieldLabel>Postcode</FieldLabel>
        </div>
        <FormInput
          name="postcode"
          control={control}
          placeholder="Enter postcode"
        />
      </div>
    </section>
  );
};

export default AddressSection;
