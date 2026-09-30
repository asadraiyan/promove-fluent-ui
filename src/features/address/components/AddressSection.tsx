import React from "react";
import { useFormContext } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import { FieldLabel, FormInput, FormDropdown } from "../../../shared";

import { AddressDetailsFormValues } from "../AddressDetails.types";
import { ADDRESS_TYPE_OPTIONS, COUNTRY_OPTIONS, STATE_OPTIONS } from "../constants";

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
  const { control } = useFormContext<AddressDetailsFormValues>();
  const styles = useStyles();

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
            placeholder="India"
            options={COUNTRY_OPTIONS}
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
          <FormInput
            name="city"
            control={control}
            placeholder="Enter city/town"
          />
        </div>

        <div className={styles.finalRow}>
          {/* State/Country */}
          <div className={styles.fieldSet}>
            <FieldLabel>State/Country</FieldLabel>
            <FormDropdown
              name="state"
              control={control}
              placeholder="Tamil Nadu"
              options={STATE_OPTIONS}
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