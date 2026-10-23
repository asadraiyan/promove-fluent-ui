import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { FormDate } from "@/shared/components/Date/FormDate";
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

export const Origin: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionTitle}>Origin</div>
      <ResponsiveGrid className={styles.fields}>
        <div className={styles.column}>
          <FormDate
            className={styles.field}
            name="enquiryDate"
            orientation="horizontal"
            label="Enquiry Date:"
          />
          <FormDate
            className={styles.field}
            name="authorizationDate"
            orientation="horizontal"
            label="Authorization Date:"
          />
          <FormDate
            className={styles.field}
            name="surveyDate"
            orientation="horizontal"
            label="Survey Date:"
          />
          <FormDate
            className={styles.field}
            name="requestedPackDate"
            orientation="horizontal"
            label="Requested Pack Date:"
          />
          <FormDate
            className={styles.field}
            name="residencePickupDate"
            orientation="horizontal"
            label="Residence Pickup Date:"
          />
          <FormDate
            className={styles.field}
            name="readyToGoAtAgentDate"
            orientation="horizontal"
            label="Ready to Go at Agent Date:"
          />
          <FormDate
            className={styles.field}
            name="recdAtConsolidationWarehouse"
            orientation="horizontal"
            label="Recd at Consolidation Warehouse:"
          />
          <FormDate
            className={styles.field}
            name="scheduledOriginSITOutDate"
            orientation="horizontal"
            label="Scheduled Origin SIT Out Date:"
          />
          <FormDate
            className={styles.field}
            name="actualOriginSITOutDate"
            orientation="horizontal"
            label="Actual Origin SIT Out Date:"
          />
          <div>
            <FormDate
              className={styles.field}
              name="withdrawalDate"
              orientation="horizontal"
              label="Withdrawal Date:"
            />
          </div>
        </div>

        <div className={styles.column}>
          <FormDate
            className={styles.field}
            name="shipmentCreationDate"
            orientation="horizontal"
            label="Shipment Creation Date:"
          />
          <FormDate
            className={styles.field}
            name="preferredSurveyDate"
            orientation="horizontal"
            label="Preferred Survey Date:"
          />
          <FormDate
            className={styles.field}
            name="introCallDate"
            orientation="horizontal"
            label="Intro Call Date:"
          />
          <FormDate
            className={styles.field}
            name="dpsReqPickUpDate"
            orientation="horizontal"
            label="DPS Req PickUp Date:"
          />
          <FormDate
            className={styles.field}
            name="activationDate"
            orientation="horizontal"
            label="Activation Date:"
          />
          <FormDate
            className={styles.field}
            name="packStartDate"
            orientation="horizontal"
            label="Pack Start Date:"
          />
          <FormDate
            className={styles.field}
            name="customsDocumentRecdDate"
            orientation="horizontal"
            label="Customs Document Recd Date:"
          />
          <FormDate
            className={styles.field}
            name="leftAgentDate"
            orientation="horizontal"
            label="Left Agent Date:"
          />
          <FormDate
            className={styles.field}
            name="originSITInDate"
            orientation="horizontal"
            label="Origin SIT In Date:"
          />
          <div>
            <FormDate
              className={styles.field}
              name="counselingDate"
              orientation="horizontal"
              label="Counseling Date:"
            />
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.boxedSection}>
            <div className={styles.subSectionTitle}>Transit Dates:</div>
            <div className={styles.column}>
              <FormDate
                className={styles.field}
                name="transshipmentInDate"
                orientation="horizontal"
                label="Transshipment In Date:"
              />
              <FormDate
                className={styles.field}
                name="transshipmentOutDate"
                orientation="horizontal"
                label="Transshipment Out Date:"
              />
            </div>
          </div>
        </div>
      </ResponsiveGrid>
    </div>
  );
};
