import React, { useEffect, useState } from "react";
import { makeStyles, tokens, Button } from "@fluentui/react-components";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { FormInput } from "@/shared/components/Input/Input";
import { FormDropdown } from "@/shared/components/Dropdown/Dropdown";
import { ResponsiveGrid } from "@/shared";
import mockData from "../../dummyJson/trackingData.json";

interface TransitGuideData {
  recordPoints: number;
  originTransitAvgDays: number;
  freightTransitAvgDays: number;
  customClearanceAvgDays: number;
  destinationTransitAvgDays: number;
  dtdTransitAvgDays: number;
  originTransitDaysRange: string;
  freightTransitDaysRange: string;
  customClearanceDaysRange: string;
  destinationTransitDaysRange: string;
  dtdTransitDaysRange: string;
  creationUser: string;
  modificationUser: string | null;
  creationTime: string;
  modificationTime: string | null;
}

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

const TrackingContent: React.FC<{ transitGuide: TransitGuideData | null }> = ({
  transitGuide,
}) => {
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
              <span className={styles.tableCellValue}>
                {transitGuide?.recordPoints}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Origin Transit Avg Days
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.originTransitAvgDays}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Freight Transit Avg Days
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.freightTransitAvgDays}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Custom Clearance Avg Days
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.customClearanceAvgDays}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Destination Transit Avg Days
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.destinationTransitAvgDays}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                DTD Transit Avg Days
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.dtdTransitAvgDays}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Creation User</span>
              <span className={styles.tableCellValue}>
                {transitGuide?.creationUser}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Modification User</span>
              <span className={styles.tableCellValue}>
                {transitGuide?.modificationUser || "-"}
              </span>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Origin Transit Days Range
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.originTransitDaysRange}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Freight Transit Days Range
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.freightTransitDaysRange}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Custom Clearance Days Range
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.customClearanceDaysRange}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                Destination Transit Days Range
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.destinationTransitDaysRange}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>
                DTD Transit Days Range
              </span>
              <span className={styles.tableCellValue}>
                {transitGuide?.dtdTransitDaysRange}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Creation Time</span>
              <span className={styles.tableCellValue}>
                {transitGuide?.creationTime}
              </span>
            </div>
            <div className={styles.tableRow}>
              <span className={styles.tableCellLabel}>Modification Time</span>
              <span className={styles.tableCellValue}>
                {transitGuide?.modificationTime || "-"}
              </span>
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
            type="number"
          />
          <FormInput
            className={styles.field}
            name="estimatedSailingTime"
            control={control}
            label="Estimated Sailing Time:"
            labelPosition="left"
            type="number"
          />
          <FormInput
            className={styles.field}
            name="varianceOfSailingTimeVsEstimated"
            control={control}
            label="Variance of Sailing Time vs Estimated:"
            labelPosition="left"
            type="number"
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
            type="number"
          />
          <FormInput
            className={styles.field}
            name="varianceAtArrival"
            control={control}
            label="Variance at Arrival:"
            labelPosition="left"
            type="number"
          />
        </div>
      </ResponsiveGrid>
    </div>
  );
};

export const Tracking: React.FC = () => {
  const [transitGuideData, setTransitGuideData] =
    useState<TransitGuideData | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setTransitGuideData(mockData.transitGuide);

        methods.reset(mockData.trackingInformation);
      }, 500);
    };

    fetchData();
  }, [methods]);

  const onSubmit = (data: any) => {
    console.log("Form Submitted Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TrackingContent transitGuide={transitGuideData} />
      </form>
    </FormProvider>
  );
};
