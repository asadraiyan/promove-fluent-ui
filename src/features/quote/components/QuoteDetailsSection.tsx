import React from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { MoreHorizontalRegular } from "@fluentui/react-icons";
import { useController } from "react-hook-form";
import {
  Button,
  FormDropdown,
  FormInput,
  FormRadioGroup,
  ResponsiveGrid,
  SearchableInput,
} from "@/shared";
import type { QuoteFormSectionProps } from "../quote.types";
import {
  BRAND_OPTIONS,
  CONTAINER_TYPE_OPTIONS,
  CURRENCY_OPTIONS,
  FCL_DRAYAGE_OPTIONS,
  MEASUREMENT_SYSTEM_OPTIONS,
  SURVEY_TYPE_OPTIONS,
} from "../constants";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusMedium,
    minWidth: 0,
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  columns: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  fieldColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  fclFields: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  jobTypeField: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    alignItems: "end",
    gap: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  moreButton: {
    minWidth: "36px",
    height: "32px",
    marginBottom: "1px",
  },
  measurement: {
    gridTemplateColumns: "minmax(0, 1.15fr) minmax(280px, 1fr)",
    alignItems: "start",
    gap: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalS,
    minWidth: 0,
  },
  measurementLeft: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  measurementRows: {
    gridTemplateColumns: "minmax(120px, 1fr) minmax(70px, auto) minmax(120px, 170px)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
  },
  netHeading: {
    fontWeight: tokens.fontWeightSemibold,
    textAlign: "center",
  },
  measurementLabel: {
    textAlign: "right",
    color: tokens.colorNeutralForeground2,
  },
  unit: {
    color: tokens.colorNeutralForeground2,
  },
  measurementRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    gap: tokens.spacingVerticalL,
    minWidth: 0,
    height: "100%",
  },
  optimize: {
    minWidth: "150px",
  },
  awardDate: {
    display: "grid",
    gridTemplateColumns: "minmax(120px, auto) minmax(150px, 1fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    width: "100%",
    maxWidth: "430px",
    marginTop: "auto",
  },
  awardDateLabel: {
    textAlign: "right",
  },
});

export const QuoteDetailsSection: React.FC<QuoteFormSectionProps> = ({
  control,
}) => {
  const styles = useStyles();
  const { field: bookingAgent } = useController({ control, name: "bookingAgent" });
  const { field: corporateAccount } = useController({
    control,
    name: "corporateAccount",
  });
  const { field: originLocation } = useController({
    control,
    name: "originLocation",
  });
  const { field: destinationLocation } = useController({
    control,
    name: "destinationLocation",
  });
  const { field: originAgent } = useController({ control, name: "originAgent" });
  const { field: destinationAgent } = useController({
    control,
    name: "destinationAgent",
  });
  const { field: jobType } = useController({ control, name: "jobType" });

  return (
    <section className={styles.section} aria-labelledby="quote-details-title">
      <Text id="quote-details-title" className={styles.title}>
        Quote Details
      </Text>

      <div className={styles.fields}>
        <ResponsiveGrid className={styles.columns}>
          <div className={styles.fieldColumn}>
            <SearchableInput
              id="quote-booking-agent"
              label="Booking Agent"
              labelPosition="left"
              value={bookingAgent.value}
              onChange={bookingAgent.onChange}
              onSearch={() => undefined}
            />
            <FormDropdown
              name="brand"
              control={control}
              label="Brand"
              labelPosition="left"
              options={BRAND_OPTIONS}
            />
            <FormDropdown
              name="surveyType"
              control={control}
              label="Survey Type"
              labelPosition="left"
              placeholder="Select survey type"
              options={SURVEY_TYPE_OPTIONS}
            />
          </div>

          <div className={styles.fieldColumn}>
            <SearchableInput
              id="quote-corporate-account"
              label="Corporate Account"
              labelPosition="left"
              value={corporateAccount.value}
              onChange={corporateAccount.onChange}
              onSearch={() => undefined}
            />
            <FormInput
              name="firstName"
              control={control}
              label="First Name"
              labelPosition="left"
            />
            <FormInput
              name="lastName"
              control={control}
              label="Last Name"
              labelPosition="left"
            />
          </div>
        </ResponsiveGrid>

        <ResponsiveGrid className={styles.columns}>
          <div className={styles.fieldColumn}>
            <SearchableInput
              id="quote-origin-location"
              label="Origin Location"
              labelPosition="left"
              value={originLocation.value}
              onChange={originLocation.onChange}
              onSearch={() => undefined}
            />
            <FormInput name="originState" control={control} label="State" labelPosition="left" disabled />
            <FormInput name="originCountry" control={control} label="Country" labelPosition="left" disabled />
            <FormInput
              name="pickupAddress1"
              control={control}
              label="Pickup Address"
              labelPosition="left"
            />
            <FormInput
              name="pickupAddress2"
              control={control}
              ariaLabel="Pickup Address line 2"
            />
            <FormInput name="originZipCode" control={control} label="Zip Code" labelPosition="left" />
            <FormInput name="originPhoneHome" control={control} label="Phone Home" labelPosition="left" />
            <SearchableInput
              id="quote-origin-agent"
              label="Origin Agent"
              labelPosition="left"
              value={originAgent.value}
              onChange={originAgent.onChange}
              onSearch={() => undefined}
            />
          </div>

          <div className={styles.fieldColumn}>
            <SearchableInput
              id="quote-destination-location"
              label="Destination Location"
              labelPosition="left"
              value={destinationLocation.value}
              onChange={destinationLocation.onChange}
              onSearch={() => undefined}
            />
            <FormInput name="destinationState" control={control} label="State" labelPosition="left" disabled />
            <FormInput name="destinationCountry" control={control} label="Country" labelPosition="left" disabled />
            <FormInput
              name="deliveryAddress1"
              control={control}
              label="Delivery Address"
              labelPosition="left"
            />
            <FormInput
              name="deliveryAddress2"
              control={control}
              ariaLabel="Delivery Address line 2"
            />
            <FormInput name="destinationZipCode" control={control} label="Zip Code" labelPosition="left" />
            <FormInput name="destinationPhoneHome" control={control} label="Phone Home" labelPosition="left" />
            <SearchableInput
              id="quote-destination-agent"
              label="Destination Agent"
              labelPosition="left"
              value={destinationAgent.value}
              onChange={destinationAgent.onChange}
              onSearch={() => undefined}
            />
          </div>
        </ResponsiveGrid>

        <ResponsiveGrid className={styles.fclFields}>
          <div className={styles.fieldColumn}>
            <div className={styles.jobTypeField}>
              <SearchableInput
                id="quote-job-type"
                label="Job Type"
                labelPosition="left"
                value={jobType.value}
                onChange={jobType.onChange}
                onSearch={() => undefined}
              />
              <Button
                type="button"
                appearance="subtle"
                className={styles.moreButton}
                aria-label="More job type actions"
                title="More actions"
              >
                <MoreHorizontalRegular />
              </Button>
            </div>
            <FormDropdown
              name="containerType"
              control={control}
              label="Container Type"
              labelPosition="left"
              options={CONTAINER_TYPE_OPTIONS}
            />
            <FormDropdown
              name="fclDrayageOptions"
              control={control}
              label="FCL Drayage Options"
              labelPosition="left"
              options={FCL_DRAYAGE_OPTIONS}
            />
          </div>
          <div className={styles.fieldColumn}>
            <FormDropdown
              name="currency"
              control={control}
              label="Currency"
              labelPosition="left"
              options={CURRENCY_OPTIONS}
            />
          </div>
        </ResponsiveGrid>

        <ResponsiveGrid className={styles.measurement}>
          <div className={styles.measurementLeft}>
            <FormRadioGroup
              name="measurementSystem"
              control={control}
              options={MEASUREMENT_SYSTEM_OPTIONS}
              direction="horizontal"
            />
            <ResponsiveGrid className={styles.measurementRows}>
              <div />
              <div />
              <Text className={styles.netHeading}>Net</Text>
              <Text className={styles.measurementLabel}>Weight</Text>
              <Text className={styles.unit}>lbs</Text>
              <FormInput
                name="netWeight"
                control={control}
                type="number"
                ariaLabel="Net weight in pounds"
              />
              <Text className={styles.measurementLabel}>Volume</Text>
              <Text className={styles.unit}>cuft</Text>
              <FormInput
                name="netVolume"
                control={control}
                type="number"
                ariaLabel="Net volume in cubic feet"
              />
              <Text className={styles.measurementLabel}>Density</Text>
              <Text className={styles.unit}>lbs/gr cuft</Text>
              <FormInput
                name="imperialDensity"
                control={control}
                type="number"
                ariaLabel="Density in pounds per gross cubic foot"
              />
              <Text className={styles.measurementLabel}>Volume</Text>
              <Text className={styles.unit}>M3</Text>
              <FormInput
                name="metricVolume"
                control={control}
                type="number"
                ariaLabel="Volume in cubic meters"
                disabled
              />
            </ResponsiveGrid>
          </div>

          <div className={styles.measurementRight}>
            <Button type="button" appearance="primary" className={styles.optimize}>
              Optimize
            </Button>
            <div className={styles.awardDate}>
              <Text className={styles.awardDateLabel}>Move Award Date</Text>
              <FormInput
                name="moveAwardDate"
                control={control}
                ariaLabel="Move Award Date"
              />
            </div>
          </div>
        </ResponsiveGrid>
      </div>
    </section>
  );
};
