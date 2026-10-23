import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { ResponsiveGrid } from "@/shared";
import { FormDate } from "@/shared/components/Date/FormDate";

const useStyles = makeStyles({
  section: {
    boxSizing: "border-box",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  heading: {
    margin: 0,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  fields: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    padding: tokens.spacingHorizontalM,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
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

const Destination: React.FC = () => {
  const styles = useStyles();

  return (
    <section className={styles.section} aria-labelledby="destination-heading">
      <h2 id="destination-heading" className={styles.heading}>
        Destination
      </h2>
      <ResponsiveGrid className={styles.fields}>
        <div className={styles.column}>
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="quarantineInDate"
            label="Quarantine In Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="customsClearanceDate"
            label="Customs Clearance Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="destinationSitInDate"
            label="Destination SIT In Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="scheduledDestinationSitOutDate"
            label="Scheduled Dest SIT Out Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="offeredDeliveryDate"
            label="Offered Delivery Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="requiredDeliveryDate"
            label="Required Delivery Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="partialDeliveryDate"
            label="Partial Delivery Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="actualDeliveryDate"
            label="Actual Delivery Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="auditDate"
            label="Audit Date"
          />
        </div>

        <div className={styles.column}>
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="quarantineOutDate"
            label="Quarantine Out Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="arrivedAtAgentDate"
            label="Arrived At Agent Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="actualDestinationSitOutDate"
            label="Actual Destination SIT Out Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="scheduledDeliveryDate"
            label="Scheduled Delivery Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="readyToBillDate"
            label="Ready to Bill Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="fileClosedDate"
            label="File Closed Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="arrivalDeliveryDate"
            label="Arrival Delivery Date"
          />
        </div>

        <div className={styles.column}>
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="readyToAuditDate"
            label="Ready To Audit Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="readyToRebillDate"
            label="Ready to Re-Bill Date"
          />
          <FormDate
            className={styles.field}
            orientation="horizontal"
            name="billingDisputedDate"
            label="Billing Disputed Date"
          />
        </div>
      </ResponsiveGrid>
    </section>
  );
};

export default Destination;