import React from "react";
import { useFormContext } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import { FieldLabel, FormInput, FormDropdown } from "../../../shared";
import { AddressDetailsFormValues } from "../AddressDetails.types";
import {
  ADDRESS_TYPE_OPTIONS,
  COUNTRY_OPTIONS,
  STATE_OPTIONS,
} from "../constants";

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
  const { control } = useFormContext<AddressDetailsFormValues>();
  const styles = useStyles();

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
          placeholder="India"
          options={COUNTRY_OPTIONS}
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
          <FieldLabel>City/Town</FieldLabel>
        </div>
        <FormInput
          name="city"
          control={control}
          placeholder="Enter city/town"
        />
        <div /> <div />
        <div className={styles.labelCell}>
          <FieldLabel>State/Country</FieldLabel>
        </div>
        <FormDropdown
          name="state"
          control={control}
          placeholder="Tamil Nadu"
          options={STATE_OPTIONS}
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
