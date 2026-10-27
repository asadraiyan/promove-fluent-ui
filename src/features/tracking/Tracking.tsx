import React from "react";
import { makeStyles, tokens, Button } from "@fluentui/react-components";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { FormInput } from "@/shared/components/Input/Input";
import { FormDropdown } from "@/shared/components/Dropdown/Dropdown";
import { ResponsiveGrid } from "@/shared";

const useStyles = makeStyles({
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingHorizontalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingVerticalL,
  },
  sectionTitle: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase500,
    marginBottom: tokens.spacingVerticalS,
  },
  subSectionTitle: {
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeBase300,
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalS,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  fields: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    padding: tokens.spacingHorizontalM,
  },

  field: {
    minWidth: 0,
    gridTemplateColumns: "minmax(0, 1fr) minmax(110px, 0.85fr)",
    columnGap: tokens.spacingHorizontalXS,
    alignItems: "center",

    "& > div > div": {
      gridTemplateColumns: "minmax(0, 1fr) minmax(110px, 0.85fr)",
      alignItems: "center",
      columnGap: tokens.spacingHorizontalXS,
    },
    "& label": {
      justifySelf: "end",
      textAlign: "right",
      fontSize: tokens.fontSizeBase300,
      lineHeight: tokens.lineHeightBase300,
    },
    "& > div": {
      width: "100%",
      minWidth: 0,
    },
    "& input": {
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
  },

  tableContainer: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: tokens.colorBrandBackground2,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontWeight: tokens.fontWeightSemibold,
  },
  tableGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    padding: tokens.spacingVerticalM,
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
    padding: `${tokens.spacingVerticalXS} 0`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
  tableCellLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
  },
  tableCellValue: {
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeBase300,
  },
});

const defaultOptions = [
  { label: "Select...", value: "" },
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
];

const TrackingContent: React.FC = () => {
  const styles = useStyles();
  const { control } = useFormContext();

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionTitle}>Transit Guide</div>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span></span>
          <Button appearance="secondary" size="small">
            Refresh
          </Button>
        </div>
        <div className={styles.tableGrid}>
          <div className={styles.column}>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Record Points</span>
              <span className={styles.tableCellValue}>36</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Origin Transit Avg Days
              </span>
              <span className={styles.tableCellValue}>34</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Freight Transit Avg Days
              </span>
              <span className={styles.tableCellValue}>37</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Custom Clearance Avg Days
              </span>
              <span className={styles.tableCellValue}>12</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Destination Transit Avg Days
              </span>
              <span className={styles.tableCellValue}>11</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                DTD Transit Avg Days
              </span>
              <span className={styles.tableCellValue}>92</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Creation User</span>
              <span className={styles.tableCellValue}>Syed Sahul</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Modification User</span>
              <span className={styles.tableCellValue}></span>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Origin Transit Days Range
              </span>
              <span className={styles.tableCellValue}>24 - 43</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Freight Transit Days Range
              </span>
              <span className={styles.tableCellValue}>20 - 55</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Custom Clearance Days Range
              </span>
              <span className={styles.tableCellValue}>5 - 18</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Destination Transit Days Range
              </span>
              <span className={styles.tableCellValue}>3 - 19</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                DTD Transit Days Range
              </span>
              <span className={styles.tableCellValue}>75 - 110</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Creation Time</span>
              <span className={styles.tableCellValue}>27/10/2026</span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Modification Time</span>
              <span className={styles.tableCellValue}></span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.subSectionTitle}>
        Sea Freight Tracking Information
      </div>
      <ResponsiveGrid className={styles.fields}>
        <div className={styles.column}>
          <FormInput
            className={styles.field}
            name="masterSCACCode"
            control={control}
            label="Master SCAC Code:"
            labelPosition="left"
          />
          <FormInput
            className={styles.field}
            name="vesselName"
            control={control}
            label="Vessel Name:"
            labelPosition="left"
          />
          <div className={styles.field}>
            <FormDropdown
              name="originalScheduledDepartureDate"
              control={control}
              label="Original Scheduled Departure Date:"
              labelPosition="left"
              options={defaultOptions}
            />
          </div>
          <div className={styles.field}>
            <FormDropdown
              name="scheduledDepartureDate"
              control={control}
              label="Scheduled Departure Date:"
              labelPosition="left"
              options={defaultOptions}
            />
          </div>
          <div className={styles.field}>
            <FormDropdown
              name="actualDepartureDate"
              control={control}
              label="Actual Departure Date:"
              labelPosition="left"
              options={defaultOptions}
            />
          </div>
          <FormInput
            className={styles.field}
            name="varianceAtDeparture"
            control={control}
            label="Variance at Departure:"
            labelPosition="left"
          />
          <FormInput
            className={styles.field}
            name="estimatedSailingTime"
            control={control}
            label="Estimated Sailing Time:"
            labelPosition="left"
          />
          <FormInput
            className={styles.field}
            name="varianceOfSailingTimeVsEstimated"
            control={control}
            label="Variance of Sailing Time vs Estimated:"
            labelPosition="left"
          />
        </div>

        <div className={styles.column}>
          <FormInput
            className={styles.field}
            name="masterOBL"
            control={control}
            label="Master OBL #:"
            labelPosition="left"
          />
          <FormInput
            className={styles.field}
            name="voyageNumber"
            control={control}
            label="Voyage #:"
            labelPosition="left"
          />
          <div className={styles.field}>
            <FormDropdown
              name="originalScheduledArrivalDate"
              control={control}
              label="Original Scheduled Arrival Date:"
              labelPosition="left"
              options={defaultOptions}
            />
          </div>
          <div className={styles.field}>
            <FormDropdown
              name="scheduledArrivalDate"
              control={control}
              label="Scheduled Arrival Date:"
              labelPosition="left"
              options={defaultOptions}
            />
          </div>
          <div className={styles.field}>
            <FormDropdown
              name="predictedArrivalDate"
              control={control}
              label="Predicted Arrival Date:"
              labelPosition="left"
              options={defaultOptions}
            />
          </div>
          <div className={styles.field}>
            <FormDropdown
              name="actualArrivalDate"
              control={control}
              label="Actual Arrival Date:"
              labelPosition="left"
              options={defaultOptions}
            />
          </div>
          <FormInput
            className={styles.field}
            name="totalSailingTime"
            control={control}
            label="Total Sailing Time:"
            labelPosition="left"
          />
          <FormInput
            className={styles.field}
            name="varianceAtArrival"
            control={control}
            label="Variance at Arrival:"
            labelPosition="left"
          />
        </div>
      </ResponsiveGrid>
    </div>
  );
};

export const Tracking: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      masterSCACCode: "",
      vesselName: "",
      varianceAtDeparture: "",
      estimatedSailingTime: "",
      varianceOfSailingTimeVsEstimated: "",
      masterOBL: "",
      voyageNumber: "",
      totalSailingTime: "",
      varianceAtArrival: "",
      originalScheduledDepartureDate: "",
      scheduledDepartureDate: "",
      actualDepartureDate: "",
      originalScheduledArrivalDate: "",
      scheduledArrivalDate: "",
      predictedArrivalDate: "",
      actualArrivalDate: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TrackingContent />
      </form>
    </FormProvider>
  );
};
