import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useController, type Control } from "react-hook-form";
import { FieldLabel, FormDropdown, ResponsiveGrid, SearchableInput } from "@/shared";
import { OVERSEAS_SUMMARY_DROPDOWN_OPTIONS } from "../constants";
import type { OverseasSummaryFormValues } from "../OverseasSummary.types";
import { FormCheckbox, type SummaryTextFieldRenderer } from "./SummaryFormFields";

const useStyles = makeStyles({
  section: {
    paddingTop: tokens.spacingVerticalM,
    minWidth: 0,
  },
  sectionTitle: {
    margin: 0,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  divider: {
    border: "none",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: `${tokens.spacingVerticalM} 0 0`,
  },
  serviceGrid: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
    alignItems: "start",
    columnGap: tokens.spacingHorizontalL,
  },
  serviceFields: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
  },
  serviceTypeRow: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(100px, 0.55fr)",
    alignItems: "end",
    columnGap: tokens.spacingHorizontalS,
  },
  portGrid: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(160px, 0.55fr)",
    alignItems: "end",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
  },
  workflow: {
    gridColumn: "1 / -1",
  },
  holdReason: {
    gridColumn: "1 / -1",
  },
  checkboxField: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
  },
});

interface OtherKeyServiceSectionProps {
  control: Control<OverseasSummaryFormValues>;
  textField: SummaryTextFieldRenderer;
}

const OtherKeyServiceSection: React.FC<OtherKeyServiceSectionProps> = ({
  control,
  textField,
}) => {
  const styles = useStyles();
  const { field: portOfArrivalField } = useController({
    name: "portOfArrival",
    control,
  });

  return (
    <>
      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Other key service parameters:</h3>
        <ResponsiveGrid className={styles.serviceGrid}>
          <ResponsiveGrid className={styles.serviceFields}>
            <ResponsiveGrid className={styles.serviceTypeRow}>
              <FormDropdown
                name="serviceType"
                control={control}
                label="Service Type"
                labelPosition="left"
                options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.serviceType}
              />
              {textField("serviceTypeDetails", "", "text")}
            </ResponsiveGrid>
            <FormDropdown
              name="pricingType"
              control={control}
              label="Pricing Type"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.pricingType}
            />
            <FormDropdown
              name="deliveryType"
              control={control}
              label="Delivery Type"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.deliveryType}
            />
            <FormDropdown
              name="packingType"
              control={control}
              label="Packing Type"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.packingType}
            />
            <FormDropdown
              name="furnitureWrap"
              control={control}
              label="Furniture Wrap"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.furnitureWrap}
            />
            <FormDropdown
              name="commodityType"
              control={control}
              label="Commodity Type"
              labelPosition="left"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.commodityType}
            />
            <ResponsiveGrid className={styles.serviceTypeRow}>
              {textField("consolCode", "Consol Code")}
              <FieldLabel>Managed from the Consolidation screen</FieldLabel>
            </ResponsiveGrid>
            <FormDropdown
              name="surveyType"
              control={control}
              label="Survey Type"
              labelPosition="left"
              placeholder="Select"
              options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.surveyType}
            />
          </ResponsiveGrid>

          <ResponsiveGrid className={styles.portGrid}>
            <SearchableInput
              id="portOfArrival"
              label="Port of arrival"
              labelPosition="left"
              value={portOfArrivalField.value}
              onChange={portOfArrivalField.onChange}
              onSearch={() => undefined}
            />
            {textField("totalNumberOfLiftvans", "Total Number of Liftvans", "number")}
            <div className={styles.workflow}>
              <FormDropdown
                name="workflow"
                control={control}
                label="Workflow"
                labelPosition="left"
                options={OVERSEAS_SUMMARY_DROPDOWN_OPTIONS.workflow}
              />
            </div>
            <div className={styles.checkboxField}>
              <FormCheckbox
                control={control}
                name="shipmentOnHold"
                label="Shipment On Hold"
              />
            </div>
            {textField("shipmentHoldDate", "Shipment Hold Date", "date")}
            <div className={styles.holdReason}>
              {textField("shipmentHoldReason", "Shipment Hold Reason")}
            </div>
          </ResponsiveGrid>
        </ResponsiveGrid>
      </section>
    </>
  );
};

export default OtherKeyServiceSection;
