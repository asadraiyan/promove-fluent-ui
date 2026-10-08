import React from "react";
import { useFormContext } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import { FormInput, FormDropdown, FieldLabel } from "../../../shared";

import type { AddressDetailsFormValues } from "../AddressDetails.types";
import { ADDRESS_DETAILS_DEFAULT_VALUES } from "../constants";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectAddressDetailsPerson } from "../reducers/addressDetailsSlice";

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(72px, 0.65fr) minmax(120px, 1.7fr) minmax(100px, 1.2fr) minmax(110px, 1.45fr) minmax(100px, 1.1fr)",
    gap: tokens.spacingHorizontalS,
    alignItems: "start",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    "& > div": {
      width: "100%",
      minWidth: 0,
    },
    "& select, & input": {
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
    },
  },
});

const NameSection: React.FC = () => {
  const { control, reset } = useFormContext<AddressDetailsFormValues>();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { people, error } = useAppSelector((state) => state.addressDetails);

  const handlePersonChange = (personId: string) => {
    const person = people.find(({ id }) => id === personId);
    if (!person) {
      dispatch(selectAddressDetailsPerson(null));
      reset(ADDRESS_DETAILS_DEFAULT_VALUES);
      return;
    }

    dispatch(selectAddressDetailsPerson(person.id));
    reset({
      ...person.formValues,
      country: person.formValues.country.id,
      state: person.formValues.state.id,
      city: person.formValues.city.id,
    });
  };

  return (
    <section>
      {error && <div role="alert">{error}</div>}
      <div className={styles.grid}>
        <div className={styles.field}>
          <FieldLabel>Prefix</FieldLabel>

          <FormDropdown
            name="prefix"
            control={control}
            options={people.map(({ id, label }) => ({
              value: id,
              label,
            }))}
            placeholder="Select"
            onChange={handlePersonChange}
          />
        </div>

        <div className={styles.field}>
          <FieldLabel>Name</FieldLabel>

          <FormInput name="firstName" control={control} placeholder="" />
        </div>

        <div className={styles.field}>
          <FieldLabel>Middle</FieldLabel>

          <FormInput name="middleName" control={control} placeholder="" />
        </div>

        <div className={styles.field}>
          <FieldLabel>Last</FieldLabel>

          <FormInput name="lastName" control={control} placeholder="" />
        </div>

        <div className={styles.field}>
          <FieldLabel>Nick Name</FieldLabel>

          <FormInput name="nickName" control={control} placeholder="" />
        </div>
      </div>
    </section>
  );
};

export default NameSection;
