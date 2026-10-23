import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { FormDate } from "@/shared/components/Date/FormDate";

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
  gridResponsive: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
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

export const Origin: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionTitle}>Origin</div>

      <div className={styles.gridResponsive}>
        <div className={styles.column}>
          <FormDate name="enquiryDate" label="Enquiry Date:" />
          <FormDate name="authorizationDate" label="Authorization Date:" />
          <FormDate name="surveyDate" label="Survey Date:" />
          <FormDate name="requestedPackDate" label="Requested Pack Date:" />
          <FormDate name="residencePickupDate" label="Residence Pickup Date:" />
          <FormDate
            name="readyToGoAtAgentDate"
            label="Ready to Go at Agent Date:"
          />
          <FormDate
            name="recdAtConsolidationWarehouse"
            label="Recd at Consolidation Warehouse:"
          />
          <FormDate
            name="scheduledOriginSITOutDate"
            label="Scheduled Origin SIT Out Date:"
          />
          <FormDate
            name="actualOriginSITOutDate"
            label="Actual Origin SIT Out Date:"
          />
          <div>
            <FormDate name="withdrawalDate" label="Withdrawal Date:" />
          </div>
        </div>

        <div className={styles.column}>
          <FormDate
            name="shipmentCreationDate"
            label="Shipment Creation Date:"
          />
          <FormDate name="preferredSurveyDate" label="Preferred Survey Date:" />
          <FormDate name="introCallDate" label="Intro Call Date:" />
          <FormDate name="dpsReqPickUpDate" label="DPS Req PickUp Date:" />
          <FormDate name="activationDate" label="Activation Date:" />
          <FormDate name="packStartDate" label="Pack Start Date:" />
          <FormDate
            name="customsDocumentRecdDate"
            label="Customs Document Recd Date:"
          />
          <FormDate name="leftAgentDate" label="Left Agent Date:" />
          <FormDate name="originSITInDate" label="Origin SIT In Date:" />
          <div>
            <FormDate name="counselingDate" label="Counseling Date:" />
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.boxedSection}>
            <div className={styles.subSectionTitle}>Transit Dates:</div>
            <div className={styles.column}>
              <FormDate
                name="transshipmentInDate"
                label="Transshipment In Date:"
              />
              <FormDate
                name="transshipmentOutDate"
                label="Transshipment Out Date:"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
