import React, { useEffect } from "react";
import { makeStyles, tokens, Button } from "@fluentui/react-components";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FormInput } from "@/shared/components/Input/Input";
import { FormDate, ResponsiveGrid } from "@/shared";
import { fetchTrackingData, updateTrackingData } from "./slices/trackingSlice";

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
            name="masterScacCode"
            control={control}
            label="Master SCAC Code:"
            labelPosition="left"
          />
          <FormInput
            className={styles.field}
            name="vesselAirlineName"
            control={control}
            label="Vessel Name:"
            labelPosition="left"
          />
          <div className={styles.field}>
            <FormDate
              name="originalScheduledDepartureDate"
              control={control}
              label="Original Scheduled Departure Date:"
              orientation="horizontal"
              disabled
            />
          </div>
          <div className={styles.field}>
            <FormDate
              name="scheduledDepartureDate"
              control={control}
              label="Scheduled Departure Date:"
              orientation="horizontal"
              disabled
            />
          </div>
          <div className={styles.field}>
            <FormDate
              name="actualDepartureDate"
              control={control}
              label="Actual Departure Date:"
              orientation="horizontal"
              disabled
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
            name="estimatedSailingFlightTime"
            control={control}
            label="Estimated Sailing Time:"
            labelPosition="left"
            type="number"
          />
          <FormInput
            className={styles.field}
            name="varianceOfSailingFlightTimeVsEstimated"
            control={control}
            label="Variance of Sailing Time vs Estimated:"
            labelPosition="left"
            type="number"
          />
        </div>

        <div className={styles.column}>
          <FormInput
            className={styles.field}
            name="masterOblAwbNumber"
            control={control}
            label="Master OBL #:"
            labelPosition="left"
          />
          <FormInput
            className={styles.field}
            name="voyageFlightNumber"
            control={control}
            label="Voyage #:"
            labelPosition="left"
          />
          <div className={styles.field}>
            <FormDate
              name="originalScheduledArrivalDate"
              control={control}
              label="Original Scheduled Arrival Date:"
              orientation="horizontal"
              disabled
            />
          </div>
          <div className={styles.field}>
            <FormDate
              name="scheduledArrivalDate"
              control={control}
              label="Scheduled Arrival Date:"
              orientation="horizontal"
              disabled
            />
          </div>
          <div className={styles.field}>
            <FormDate
              name="predictedArrivalDate"
              control={control}
              label="Predicted Arrival Date:"
              orientation="horizontal"
              disabled
            />
          </div>
          <div className={styles.field}>
            <FormDate
              name="actualArrivalDate"
              control={control}
              label="Actual Arrival Date:"
              orientation="horizontal"
              disabled
            />
          </div>
          <FormInput
            className={styles.field}
            name="totalSailingFlightTime"
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
      <div
        style={{
          marginTop: tokens.spacingVerticalL,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="submit" appearance="primary">
          Save Tracking Details
        </Button>
      </div>
    </div>
  );
};
const defaultTrackingInformation = {
  masterScacCode: "",
  vesselAirlineName: "",
  varianceAtDeparture: null,
  estimatedSailingFlightTime: null,
  varianceOfSailingFlightTimeVsEstimated: null,
  masterOblAwbNumber: "",
  voyageFlightNumber: "",
  totalSailingFlightTime: null,
  varianceAtArrival: null,
  originalScheduledDepartureDate: null,
  scheduledDepartureDate: null,
  actualDepartureDate: null,
  originalScheduledArrivalDate: null,
  scheduledArrivalDate: null,
  predictedArrivalDate: null,
  actualArrivalDate: null,
};

export const Tracking: React.FC<{ goodsId?: string }> = ({ goodsId }) => {
  const dispatch = useDispatch();
  const { data: apiData } = useSelector((state: any) => state.tracking ?? {});

  const methods = useForm({
    defaultValues: defaultTrackingInformation,
  });

  useEffect(() => {
    if (goodsId) {
      dispatch(fetchTrackingData(goodsId) as any);
    }
    console.log("Tracking component mounted or goodsId changed:", goodsId);
  }, [dispatch, goodsId]);

  useEffect(() => {
    if (apiData?.trackingInformation) {
      methods.reset(apiData.trackingInformation);
    }
  }, [apiData, methods]);

  const onSubmit = (formData: any) => {
    if (!goodsId) {
      return;
    }

    const payload = {
      trackingInformation: formData,
    };

    dispatch(updateTrackingData({ goodsId, payload }) as any);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TrackingContent transitGuide={apiData?.transitGuide || null} />
      </form>
    </FormProvider>
  );
};
