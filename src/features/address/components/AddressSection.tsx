import React, { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import { FieldLabel, FormInput, FormDropdown } from "../../../shared";

import { AddressDetailsFormValues } from "../AddressDetails.types";
import { ADDRESS_TYPE_OPTIONS } from "../constants";
import locationData from "../locationData.json";

const useStyles = makeStyles({
  fieldSet: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  finalRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXXL,
  },
});

const AddressSection: React.FC = () => {
  const { control, setValue } = useFormContext<AddressDetailsFormValues>();
  const selectedCountry = useWatch({ control, name: "country" });
  const selectedState = useWatch({ control, name: "state" });
  const styles = useStyles();

  const stateOptions = useMemo(() => {
    const country = locationData.countries.find(
      (option) => option.value === selectedCountry
    );

    return country?.states.map(({ value, label }) => ({ value, label })) ?? [];
  }, [selectedCountry]);

  const cityOptions = useMemo(() => {
    const country = locationData.countries.find(
      (option) => option.value === selectedCountry
    );
    const state = country?.states.find(
      (option) => option.value === selectedState
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
      <div>

        {/* Address Type */}
        <div className={styles.fieldSet}>
          <FieldLabel>Address Type</FieldLabel>
          <FormDropdown
            name="addressType"
            control={control}
            placeholder="Delivery Address"
            options={ADDRESS_TYPE_OPTIONS}
          />
        </div>

        {/* Country */}
        <div className={styles.fieldSet}>
          <FieldLabel>Country</FieldLabel>
          <FormDropdown
            name="country"
            control={control}
            placeholder="Select country"
            options={locationData.countries.map(({ value, label }) => ({ value, label }))}
            onChange={handleCountryChange}
          />
        </div>

        {/* Address 1 */}
        <div className={styles.fieldSet}>
          <FieldLabel>Address 1</FieldLabel>
          <FormInput name="address1" control={control} placeholder="Enter address" />
        </div>

        {/* Address 2 */}
        <div className={styles.fieldSet}>
          <FieldLabel>Address 2</FieldLabel>
          <FormInput name="address2" control={control} placeholder="Enter address" />
        </div>

        {/* Address 3 */}
        <div className={styles.fieldSet}>
          <FieldLabel>Address 3</FieldLabel>
          <FormInput name="address3" control={control} placeholder="Enter address" />
        </div>

        {/* City/Town */}
        <div className={styles.fieldSet}>
          <FieldLabel>City/Town</FieldLabel>
          <FormDropdown
            name="city"
            control={control}
            placeholder={selectedState ? "Select city" : "Select state first"}
            options={cityOptions}
          />
        </div>

        <div className={styles.finalRow}>
          {/* State/Country */}
          <div className={styles.fieldSet}>
            <FieldLabel>State/Country</FieldLabel>
            <FormDropdown
              name="state"
              control={control}
              placeholder={selectedCountry ? "Select state" : "Select country first"}
              options={stateOptions}
              onChange={handleStateChange}
            />
          </div>

          {/* Postcode */}
          <div className={styles.fieldSet}>
            <FieldLabel>Postcode</FieldLabel>
            <FormInput name="postcode" control={control} placeholder="Enter postcode" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AddressSection;