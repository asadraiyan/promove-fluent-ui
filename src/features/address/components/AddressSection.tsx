import React, { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import { FieldLabel, FormInput, FormDropdown } from "../../../shared";
import { AddressDetailsFormValues } from "../AddressDetails.types";
import { ADDRESS_TYPE_OPTIONS } from "../constants";
import locationData from "../locationData.json";

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

  const stateOptions = useMemo(() => {
    const country = locationData.countries.find(
      (option) => option.value === selectedCountry,
    );

    return country?.states.map(({ value, label }) => ({ value, label })) ?? [];
  }, [selectedCountry]);

  const cityOptions = useMemo(() => {
    const country = locationData.countries.find(
      (option) => option.value === selectedCountry,
    );
    const state = country?.states.find(
      (option) => option.value === selectedState,
    );

    return state?.cities ?? [];
  }, [selectedCountry, selectedState]);

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
          placeholder="Select Country"
          options={locationData.countries.map(({ value, label }) => ({
            value,
            label,
          }))}
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
