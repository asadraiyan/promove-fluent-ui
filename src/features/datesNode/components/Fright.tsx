import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useFormContext } from "react-hook-form";
import { FormDate } from "@/shared/components/Date/FormDate";
import { FormDropdown } from "@/shared/components/Dropdown/Dropdown";
import { FormInput } from "@/shared/components/Input/Input";

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
  grid3Col: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
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
});

export const Freight: React.FC = () => {
  const styles = useStyles();
  const { control } = useFormContext();

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionTitle}>Freight</div>

      <div className={styles.subSectionTitle}>Origin</div>
      <div className={styles.grid3Col}>
        <div className={styles.column}>
          <FormDate
            name="scheduledDepartureDate"
            label="Scheduled Departure Date:"
          />
          <FormDate name="bookHaulageDate" label="Book Haulage Date:" />
          <FormDate name="bookContainerDate" label="Book Container Date:" />
          <FormDate name="etaAtOriginPort" label="ETA at Origin Port:" />
          <FormDate name="portCutOffDate" label="Port Cut off Date:" />
        </div>

        <div className={styles.column}>
          <FormDate name="actualDepartureDate" label="Actual Departure Date:" />
          <FormDate name="documentCutoffDate" label="Document Cutoff Date:" />
          <FormDate
            name="dropEmptyContainerDate"
            label="Drop Empty Container Date:"
          />
          <FormDate
            name="lastFreeDateAtOrigin"
            label="Last Free Date at Origin:"
          />
          <FormDate name="inlandCutOffDate" label="Inland Cut off Date:" />
        </div>

        <div className={styles.column}>
          <div className={styles.boxedSection}>
            <div className={styles.subSectionTitle} style={{ marginTop: 0 }}>
              Other SIT Dates:
            </div>
            <div className={styles.column}>
              <FormDate name="otherSITInDate" label="Other SIT In Date:" />
              <FormDate name="schOtherOutDate" label="Sch.Other Out Date:" />
              <FormDate
                name="actOtherSITOutDate"
                label="Act.Other SIT Out Date:"
              />
              <FormDropdown
                name="reason"
                control={control}
                label="Reason:"
                options={[
                  { label: "Select a reason...", value: "" },
                  { label: "Option 1", value: "opt1" },
                  { label: "Option 2", value: "opt2" },
                ]}
              />
            </div>
          </div>
          <div style={{ marginTop: tokens.spacingVerticalM }}>
            <FormDate name="containerReturned" label="Container Returned:" />
          </div>
        </div>
      </div>

      <hr
        style={{
          margin: `${tokens.spacingVerticalL} 0`,
          borderColor: tokens.colorNeutralStroke2,
          borderTop: "none",
        }}
      />

      <div className={styles.subSectionTitle} style={{ marginTop: 0 }}>
        Destination
      </div>
      <div className={styles.grid3Col}>
        <div className={styles.column}>
          <FormDate
            name="scheduledArrivalDate"
            label="Scheduled Arrival Date:"
          />
          <FormDate name="freightReleaseDate" label="Freight Release Date:" />
          <FormDropdown
            name="dailyChargeSchedule"
            control={control}
            label="Daily Charge Schedule:"
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
          />
        </div>

        <div className={styles.column}>
          <FormDate name="actualArrivalDate" label="Actual Arrival Date:" />
          <FormDate
            name="lastFreeDateAtPort"
            label="Last Free Date at Port: (Demurrage)"
          />
          <FormDate
            name="lastFreeDateAtDestination"
            label="Last Free Date at Destination: (Detention/Per Diem)"
          />
        </div>

        <div className={styles.column}>
          <FormDate name="outGateDate" label="Out Gate Date:" />
          <FormDate name="inGateDate" label="In Gate Date:" />
        </div>
      </div>
    </div>
  );
};
