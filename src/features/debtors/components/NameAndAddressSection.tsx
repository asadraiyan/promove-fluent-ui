import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "../constants.json";
import {
  loadCountries,
  loadStates,
} from "@/features/address/reducers/locationDataSlice";
import { FormDropdown, FormInput } from "@/shared";
import { DebtorsFormData } from "../types";
import { Control } from "react-hook-form";

export const NameAndAddressSection: React.FC<{
  control: Control<DebtorsFormData>;
}> = ({ control }) => {
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
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <h4>Name and address</h4>
      <FormDropdown
        name="title"
        control={control}
        label="Title"
        labelPosition="left"
        options={constants.dropdownOptions.title}
      />
      <FormInput
        name="surname"
        control={control}
        label="Surname"
        labelPosition="left"
      />
      <FormInput
        name="middleName"
        control={control}
        label="Middle"
        labelPosition="left"
      />
      <FormInput
        name="firstName"
        control={control}
        label="First Name"
        labelPosition="left"
      />
      <FormDropdown
        name="country"
        control={control}
        label="Country"
        labelPosition="left"
        options={countryOptions}
        onChange={handleCountryChange}
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
        labelPosition="left"
        options={stateOptions}
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
    </div>
  );
};
