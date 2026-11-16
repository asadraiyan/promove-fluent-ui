import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Control } from "react-hook-form";
import { DebtorsFormData } from "../types";
import constants from "../constants.json";
import {
  loadCountries,
  loadStates,
} from "@/features/address/reducers/locationDataSlice";
import { FormDropdown, FormInput } from "@/shared";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gap: tokens.spacingVerticalM + " " + tokens.spacingHorizontalM,
    gridTemplateColumns: "1fr",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const NameAndAddressSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
  const styles = useStyles();
  const dispatch = useDispatch<any>();
  const { countries, states } = useSelector((state: any) => state.locationData);

  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);

  const countryOptions = useMemo(
    () => countries.map((c: any) => ({ label: c.description, value: c.id })),
    [countries],
  );

  const stateOptions = useMemo(
    () => states.map((s: any) => ({ label: s.description, value: s.id })),
    [states],
  );

  const handleCountryChange = (countryCode: string) => {
    dispatch(loadStates(countryCode));
  };

  return (
    <div className={styles.grid}>
      <FormDropdown
        name="title"
        control={control}
        label="Title"
        options={constants.dropdownOptions.title}
      />
      <FormInput name="surname" control={control} label="Surname" />
      <FormInput name="middleName" control={control} label="Middle Name" />
      <FormInput name="firstName" control={control} label="First Name" />
      <FormDropdown
        name="country"
        control={control}
        label="Country"
        options={countryOptions}
        onChange={handleCountryChange}
      />
      <FormInput name="address1" control={control} label="Address 1" />
      <FormInput name="address2" control={control} label="Address 2" />
      <FormInput name="address3" control={control} label="Address 3" />
      <FormInput name="city" control={control} label="City" />
      <FormDropdown
        name="stateCounty"
        control={control}
        label="State/County"
        options={stateOptions}
      />
      <FormInput name="postalCode" control={control} label="Postal Code" />
      <FormInput name="telephone" control={control} label="Telephone" />
      <FormInput name="fax" control={control} label="Fax" />
      <FormInput name="email" control={control} label="E-mail" />
    </div>
  );
};
