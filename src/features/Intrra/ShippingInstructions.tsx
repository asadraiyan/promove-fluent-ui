import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import { FieldLabel, FormInput, ResponsiveGrid, TextAreaField } from "@/shared";
import { SHIPPING_INSTRUCTION_DEFAULT_VALUES } from "./constants";

type ShippingInstructionValues = typeof SHIPPING_INSTRUCTION_DEFAULT_VALUES;

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 32px)",
    maxWidth: "1400px",
    margin: "24px auto",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalM,
  },
  mainGrid: {
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.9fr)",
    alignItems: "start",
    gap: tokens.spacingHorizontalL,
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  addressRow: {
    gridTemplateColumns: "minmax(95px, 100px) minmax(0, 1fr)",
    alignItems: "start",
    columnGap: tokens.spacingHorizontalS,
  },
  addressLabel: {
    paddingTop: tokens.spacingVerticalS,
    fontWeight: tokens.fontWeightRegular,
  },
  addressFields: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    minWidth: 0,
  },
  addressInput: {
    marginTop: "-1px",
    "& input": {
      minHeight: "27px",
      borderRadius: 0,
    },
  },
  stateZipGrid: {
    gridTemplateColumns: "minmax(0, 1fr) 40px minmax(0, 0.55fr) 34px minmax(0, 0.5fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalXS,
  },
  contactGrid: {
    gridTemplateColumns: "34px minmax(0, 1fr) 45px minmax(0, 1.2fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalXS,
  },
  smallLabel: {
    fontSize: tokens.fontSizeBase200,
    whiteSpace: "nowrap",
  },
  compactInput: {
    "& input": {
      minHeight: "27px",
    },
  },
  identifiers: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  identifierLabel: {
    fontWeight: tokens.fontWeightBold,
  },
  staticIdentifier: {
    color: tokens.colorNeutralForeground1,
  },
  detailsGrid: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
  },
  detailLabel: {
    fontWeight: tokens.fontWeightBold,
  },
  detailValue: {
    minHeight: "24px",
  },
  vesselGrid: {
    gridTemplateColumns: "auto minmax(0, 1fr) auto minmax(0, 0.45fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  commentsArea: {
    boxSizing: "border-box",
    minHeight: "96px",
    padding: tokens.spacingHorizontalS,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    "& textarea": {
      minHeight: "96px",
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  shipmentHeader: {
    gridTemplateColumns: "minmax(150px, auto) minmax(0, 1fr) minmax(100px, 0.4fr) minmax(100px, 0.4fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
  },
  shipmentLine: {
    marginTop: "-1px",
    "& input": {
      minHeight: "34px",
      borderRadius: 0,
    },
  },
  shipmentBody: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(100px, 0.4fr) minmax(100px, 0.4fr)",
    gap: tokens.spacingHorizontalM,
  },
  shipmentLines: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  hsCodeRow: {
    gridTemplateColumns: "minmax(95px, 100px) minmax(0, 1fr)",
    alignItems: "start",
    columnGap: tokens.spacingHorizontalS,
  },
  hsCodeLabel: {
    paddingTop: tokens.spacingVerticalS,
    fontWeight: tokens.fontWeightRegular,
  },
  hsCodeArea: {
    "& textarea": {
      minHeight: "80px",
    },
  },
});

const ShippingInstructions: React.FC = () => {
  const styles = useStyles();
  const { control } = useForm<ShippingInstructionValues>({
    defaultValues: SHIPPING_INSTRUCTION_DEFAULT_VALUES,
  });

  const renderAddress = (
    label: string,
    prefix: "shipper" | "consignee" | "notifyParty",
  ) => (
    <ResponsiveGrid className={styles.addressRow}>
      <FieldLabel className={styles.addressLabel}>{label}</FieldLabel>
      <div className={styles.addressFields}>
        {[1, 2, 3, 4].map((line) => (
          <FormInput
            key={line}
            name={`${prefix}.address${line}`}
            control={control}
            className={styles.addressInput}
          />
        ))}
        <ResponsiveGrid className={styles.stateZipGrid}>
          <span />
          <FieldLabel className={styles.smallLabel}>State</FieldLabel>
          <FormInput
            name={`${prefix}.state`}
            control={control}
            className={styles.compactInput}
          />
          <FieldLabel className={styles.smallLabel}>Zip</FieldLabel>
          <FormInput
            name={`${prefix}.zip`}
            control={control}
            className={styles.compactInput}
          />
        </ResponsiveGrid>
        <ResponsiveGrid className={styles.contactGrid}>
          <FieldLabel className={styles.smallLabel}>Tel:</FieldLabel>
          <FormInput
            name={`${prefix}.telephone`}
            control={control}
            className={styles.compactInput}
          />
          <FieldLabel className={styles.smallLabel}>E-mail:</FieldLabel>
          <FormInput
            name={`${prefix}.email`}
            control={control}
            className={styles.compactInput}
          />
        </ResponsiveGrid>
      </div>
    </ResponsiveGrid>
  );

  const renderDetail = (label: string, value: string) => (
    <div className={styles.detail}>
      <FieldLabel className={styles.detailLabel}>{label}</FieldLabel>
      <span className={styles.detailValue}>{value}</span>
    </div>
  );

  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>Shipping Instructions</h2>
      <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
        <ResponsiveGrid className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            {renderAddress("Shipper:", "shipper")}
            {renderAddress("Consignee:", "consignee")}
            {renderAddress("Notify Party:", "notifyParty")}
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.identifiers}>
              {renderDetail("Reg Number:", "")}
              {renderDetail("Booking Number:", "69001279")}
              {renderDetail("Please Issue:", "")}
              {renderDetail("ITN Number:", "")}
            </div>

            <ResponsiveGrid className={styles.vesselGrid}>
              <FieldLabel className={styles.detailLabel}>VESSEL</FieldLabel>
              <span className={styles.staticIdentifier}>Philadelphia Express</span>
              <FieldLabel className={styles.detailLabel}>VOYAGE</FieldLabel>
              <span className={styles.staticIdentifier}>060E</span>
            </ResponsiveGrid>

            <ResponsiveGrid className={styles.detailsGrid}>
              {renderDetail("Port of Receipt", "HOUSTON, TX, USA")}
              {renderDetail("Port of Load", "HOUSTON, TX, USA")}
              {renderDetail("Port of Discharge", "BREMERHAVEN, Germany")}
              {renderDetail("Port of Delivery", "BREMERHAVEN, Germany")}
            </ResponsiveGrid>

            <div className={styles.comments}>
              <FieldLabel>Body Comments:</FieldLabel>
              <div className={styles.commentsArea} />
            </div>
          </div>
        </ResponsiveGrid>

        <section className={styles.section}>
          <ResponsiveGrid className={styles.shipmentHeader}>
            <FieldLabel>Shipment Information:</FieldLabel>
            <FieldLabel className={styles.identifierLabel}>
              Property of Ruiz, Abraham
            </FieldLabel>
            <FieldLabel className={styles.detailLabel}>Weight: </FieldLabel>
            <FieldLabel className={styles.detailLabel}>Volume: </FieldLabel>
          </ResponsiveGrid>
          <ResponsiveGrid className={styles.shipmentBody}>
            <div className={styles.shipmentLines}>
              {[1, 2, 3, 4].map((line) => (
                <FormInput
                  key={line}
                  name={`shipmentLine${line}`}
                  control={control}
                  className={styles.shipmentLine}
                />
              ))}
            </div>
          </ResponsiveGrid>
        </section>

        <ResponsiveGrid className={styles.hsCodeRow}>
          <FieldLabel className={styles.hsCodeLabel}>HS CODE</FieldLabel>
          <TextAreaField
            name="hsCode"
            control={control}
            rows={3}
            className={styles.hsCodeArea}
          />
        </ResponsiveGrid>
      </form>
    </section>
  );
};

export default ShippingInstructions;
