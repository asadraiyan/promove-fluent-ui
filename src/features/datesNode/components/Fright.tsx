import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";
import { FormDate } from "@/shared/components/Date/FormDate";
import { FormDropdown } from "@/shared/components/Dropdown/Dropdown";
import { FormInput } from "@/shared/components/Input/Input";
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
  boxedSection: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
  },
  horizontalLine: {
    margin: tokens.spacingVerticalL,
    borderTop: "none",
  },
  fields: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    padding: tokens.spacingHorizontalM,
  },
  field: {
    minWidth: 0,
    gridTemplateColumns: "minmax(0, 1fr) minmax(110px, 0.85fr)",
    columnGap: tokens.spacingHorizontalXS,
    alignItems: "center",
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
});

export const Freight: React.FC = () => {
  const styles = useStyles();
  const { control } = useFormContext();

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionTitle}>Freight</div>

      <div className={styles.subSectionTitle}>Origin</div>
      <ResponsiveGrid className={styles.fields}>
        <div className={styles.column}>
          <FormDate
            className={styles.field}
            name="scheduledDepartureDate"
            label="Scheduled Departure Date:"
          />
          <FormDate
            className={styles.field}
            name="bookHaulageDate"
            label="Book Haulage Date:"
          />
          <FormDate
            className={styles.field}
            name="bookContainerDate"
            label="Book Container Date:"
          />
          <FormDate
            className={styles.field}
            name="etaAtOriginPort"
            label="ETA at Origin Port:"
          />
          <FormDate
            className={styles.field}
            name="portCutOffDate"
            label="Port Cut off Date:"
          />
        </div>

        <div className={styles.column}>
          <FormDate
            className={styles.field}
            name="actualDepartureDate"
            label="Actual Departure Date:"
          />
          <FormDate
            className={styles.field}
            name="documentCutoffDate"
            label="Document Cutoff Date:"
          />
          <FormDate
            className={styles.field}
            name="dropEmptyContainerDate"
            label="Drop Empty Container Date:"
          />
          <FormDate
            className={styles.field}
            name="lastFreeDateAtOrigin"
            label="Last Free Date at Origin:"
          />
          <FormDate
            className={styles.field}
            name="inlandCutOffDate"
            label="Inland Cut off Date:"
          />
        </div>

        <div className={styles.column}>
          <div className={styles.boxedSection}>
            <div className={styles.subSectionTitle}>Other SIT Dates:</div>
            <div className={styles.column}>
              <FormDate
                className={styles.field}
                name="otherSITInDate"
                label="Other SIT In Date:"
              />
              <FormDate
                className={styles.field}
                name="schOtherOutDate"
                label="Sch.Other Out Date:"
              />
              <FormDate
                className={styles.field}
                name="actOtherSITOutDate"
                label="Act.Other SIT Out Date:"
              />
              <FormDropdown
                name="reason"
                control={control}
                label="Reason:"
                labelPosition="left"
                options={[
                  { label: "Select a reason...", value: "" },
                  { label: "Option 1", value: "opt1" },
                  { label: "Option 2", value: "opt2" },
                ]}
              />
            </div>
          </div>
          <div>
            <FormDate
              className={styles.field}
              name="containerReturned"
              label="Container Returned:"
            />
          </div>
        </div>
      </ResponsiveGrid>

      <hr className={styles.horizontalLine} />

      <div className={styles.subSectionTitle} style={{ marginTop: 0 }}>
        Destination
      </div>
      <ResponsiveGrid className={styles.fields}>
        <div className={styles.column}>
          <FormDate
            className={styles.field}
            name="scheduledArrivalDate"
            label="Scheduled Arrival Date:"
          />
          <FormDate
            className={styles.field}
            name="freightReleaseDate"
            label="Freight Release Date:"
          />
          <FormDropdown
            name="dailyChargeSchedule"
            control={control}
            label="Daily Charge Schedule:"
            labelPosition="left"
            options={[
              { label: "Select schedule...", value: "" },
              { label: "Schedule A", value: "A" },
              { label: "Schedule B", value: "B" },
            ]}
          />
          <FormInput
            name="dailyChargeAmount"
            control={control}
            type="number"
            label="Daily Charge Amount:"
            labelPosition="left"
          />
        </div>

        <div className={styles.column}>
          <FormDate
            className={styles.field}
            name="actualArrivalDate"
            label="Actual Arrival Date:"
          />
          <FormDate
            className={styles.field}
            name="lastFreeDateAtPort"
            label="Last Free Date at Port: (Demurrage)"
          />
          <FormDate
            className={styles.field}
            name="lastFreeDateAtDestination"
            label="Last Free Date at Destination: (Detention/Per Diem)"
          />
        </div>

        <div className={styles.column}>
          <FormDate
            className={styles.field}
            name="outGateDate"
            label="Out Gate Date:"
          />
          <FormDate
            className={styles.field}
            name="inGateDate"
            label="In Gate Date:"
          />
        </div>
      </ResponsiveGrid>
    </div>
  );
};
