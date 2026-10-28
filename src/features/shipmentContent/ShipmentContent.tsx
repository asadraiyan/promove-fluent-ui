import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useController, useForm } from "react-hook-form";

import {
  Button,
  Checkbox,
  FormInput,
  ResponsiveGrid,
  ResponsiveGridLabel,
  SharedDataGrid,
  TextAreaField,
  type GridColumnDef,
} from "@/shared";

interface MoveTypeOption {
  id: string;
  from: string;
  to: string;
  mileage: string;
  cartons: string;
  volume: string;
  cans: string;
  group: string;
  questWebNumber: string;
  isfConfirmationNumber: string;
  quote: string;
  transportModeCode: string;
  isfErrorDescription: string;
  variation: string;
  tradeLane: string;
  goodsLeftAtBranch: string;
}

interface ShipmentContentValues {
  sameAsOtherMoveType: boolean;
  moveTypeDetails: string;
  mileage: string;
  altImperial: boolean;
  releaseValue: string;
  declaredVehicleValue: string;
  cartonsPieces: string;
  cartonsVolume: string;
  ownerPrepackedVolume: string;
  totalNumber: string;
  totalVolume: string;
  tridentFile: string;
  sts: string;
  quoteNumber: string;
  variation: string;
  itnNumber: string;
  questWebNumber: string;
  isfConfirmationNumber: string;
  interfaceNotes: string;
}

const moveTypeOptions: MoveTypeOption[] = [
  {
    id: "move-1",
    from: "US, Colorado Springs, 1450 Michelle C",
    to: "DE, Baumholder",
    mileage: "1564.28",
    cartons: "0",
    volume: "0.00",
    cans: "0",
    group: "1",
    questWebNumber: "",
    isfConfirmationNumber: "",
    quote: "",
    transportModeCode: "SEA",
    isfErrorDescription: "",
    variation: "",
    tradeLane: "",
    goodsLeftAtBranch: "",
  },
];

const columns: GridColumnDef<MoveTypeOption>[] = [
  { key: "from", label: "From", minWidth: 250 },
  { key: "to", label: "To", minWidth: 180 },
  { key: "mileage", label: "Mileage", minWidth: 100 },
  { key: "cartons", label: "Cartons", minWidth: 90 },
  { key: "volume", label: "Vol.", minWidth: 90 },
  { key: "cans", label: "Cans", minWidth: 80 },
  { key: "group", label: "Group", minWidth: 80 },
  { key: "questWebNumber", label: "Questweb #", minWidth: 130 },
  {
    key: "isfConfirmationNumber",
    label: "ISF Confirmation #",
    minWidth: 160,
  },
  { key: "quote", label: "Quote", minWidth: 100 },
  { key: "transportModeCode", label: "Transport Mode Code", minWidth: 170 },
  { key: "isfErrorDescription", label: "ISF_ERROR_DESC", minWidth: 170 },
  { key: "variation", label: "VARIATION", minWidth: 120 },
  { key: "tradeLane", label: "TRADE_LANE", minWidth: 130 },
  {
    key: "goodsLeftAtBranch",
    label: "GOODS_LEFT_AT_BRANCH",
    minWidth: 190,
  },
];

const useStyles = makeStyles({
  section: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1200px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    "@media (max-width: 560px)": {
      width: "calc(100% - 16px)",
      margin: "12px auto",
      padding: tokens.spacingVerticalS,
    },
  },
  heading: {
    margin: 0,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  moveGrid: {
    marginTop: tokens.spacingVerticalM,
  },
  detailHeading: {
    margin: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalS}`,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  details: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.3fr) minmax(320px, 1fr)",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  detailColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  selectionRow: {
    display: "grid",
    gridTemplateColumns: "minmax(180px, 0.8fr) minmax(0, 1.2fr)",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  checkbox: {
    minWidth: 0,
  },
  inlineFields: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(100px, 0.7fr)",
    columnGap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  mileageRow: {
    display: "grid",
    gridTemplateColumns: "auto minmax(70px, 1fr) auto auto",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    minWidth: 0,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "auto minmax(56px, 1fr) auto auto",
      columnGap: tokens.spacingHorizontalXS,
    },
  },
  field: {
    minWidth: 0,
    "& input": {
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
  },
  contentTitle: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  contentLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(140px, 0.8fr)",
    alignItems: "start",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(110px, 1fr) repeat(2, minmax(70px, 0.7fr))",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(90px, 1fr) repeat(2, minmax(0, 0.7fr))",
      columnGap: tokens.spacingHorizontalXS,
      rowGap: tokens.spacingVerticalXS,
    },
  },
  tridentActions: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  columnTitle: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  contentLabel: {
    color: tokens.colorNeutralForeground1,
  },
  interfaceHeader: {
    margin: 0,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  interfaceGrid: {
    display: "grid",
    gridTemplateColumns: "auto repeat(2, minmax(70px, 0.6fr))",
    alignItems: "end",
    gap: tokens.spacingVerticalS,
    "@media (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  interfaceActions: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    gridRow: "1 / span 3",
    "@media (max-width: 560px)": {
      gridRow: "auto",
      flexDirection: "row",
      flexWrap: "wrap",
      "& > button": {
        flex: "1 1 120px",
      },
    },
  },
  interfaceFinalRow: {
    gridRow: 3,
    "@media (max-width: 560px)": {
      gridRow: "auto",
    },
  },
  interfaceInput: {
    minWidth: 0,
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  quantityRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    marginTop: tokens.spacingVerticalM,
  },
  quantity: {
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
  },
});

const ShipmentContent: React.FC = () => {
  const styles = useStyles();
  const { control } = useForm<ShipmentContentValues>({
    defaultValues: {
      sameAsOtherMoveType: false,
      moveTypeDetails: "",
      mileage: "972",
      altImperial: false,
      releaseValue: "19280.00",
      declaredVehicleValue: "",
      cartonsPieces: "0",
      cartonsVolume: "0",
      ownerPrepackedVolume: "0",
      totalNumber: "0",
      totalVolume: "0",
      tridentFile: "",
      sts: "",
      quoteNumber: "",
      variation: "",
      itnNumber: "",
      questWebNumber: "",
      isfConfirmationNumber: "",
      interfaceNotes: "",
    },
  });
  const { field: sameAsField } = useController({
    name: "sameAsOtherMoveType",
    control,
  });
  const { field: imperialField } = useController({
    name: "altImperial",
    control,
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Shipment Content</h2>
      <div className={styles.moveGrid}>
        <SharedDataGrid
          items={moveTypeOptions}
          columns={columns}
          getRowId={(item) => item.id}
          showSearch={false}
          selectionMode="single"
          emptyState="No move type options."
        />
      </div>

      <h3 className={styles.detailHeading}>
        Details for selected move type option:
      </h3>
      <ResponsiveGrid className={styles.details}>
        <div className={styles.detailColumn}>
          <div className={styles.selectionRow}>
            <Checkbox
              className={styles.checkbox}
              label="Same as other move type option"
              checked={Boolean(sameAsField.value)}
              onChange={(_, data) => sameAsField.onChange(data.checked)}
            />
            <TextAreaField
              name="moveTypeDetails"
              control={control}
              className={styles.field}
              rows={2}
            />
          </div>

          <div>
            <h4 className={styles.contentTitle}>Contents</h4>
            <div className={styles.contentLayout}>
              <div className={styles.contentGrid}>
                <span className={styles.contentLabel}>Furniture</span>
                <span className={styles.columnTitle}>Number</span>
                <span className={styles.columnTitle}>Volume</span>
                <span className={styles.contentLabel}>Cartons/Pieces:</span>
                <FormInput
                  name="cartonsPieces"
                  control={control}
                  className={styles.field}
                  type="number"
                />
                <FormInput
                  name="cartonsVolume"
                  control={control}
                  className={styles.field}
                  type="number"
                />
                <span className={styles.contentLabel}>Owner prepacked:</span>
                <span />
                <FormInput
                  name="ownerPrepackedVolume"
                  control={control}
                  className={styles.field}
                  type="number"
                />
                <span className={styles.contentLabel}>
                  Total number, volume:
                </span>
                <FormInput
                  name="totalNumber"
                  control={control}
                  className={styles.field}
                  type="number"
                />
                <FormInput
                  name="totalVolume"
                  control={control}
                  className={styles.field}
                  type="number"
                />
              </div>
              <div className={styles.tridentActions}>
                <Button type="button" appearance="secondary">
                  Create Trident File
                </Button>
                <FormInput
                  name="tridentFile"
                  control={control}
                  className={styles.field}
                />
                <ResponsiveGrid className={styles.inlineFields}>
                  <ResponsiveGridLabel>STS:</ResponsiveGridLabel>
                  <FormInput
                    name="sts"
                    control={control}
                    className={styles.field}
                  />
                </ResponsiveGrid>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detailColumn}>
          <div className={styles.detailColumn}>
            <div className={styles.mileageRow}>
              <ResponsiveGridLabel>Mileage:</ResponsiveGridLabel>
              <div className={styles.field}>
                <FormInput name="mileage" control={control} type="number" />
              </div>
              <span>Miles</span>
              <Checkbox
                label="Alt imperial"
                checked={Boolean(imperialField.value)}
                onChange={(_, data) => imperialField.onChange(data.checked)}
              />
            </div>
            <FormInput
              name="releaseValue"
              control={control}
              label="Release value of goods (USD):"
              labelPosition="left"
              className={styles.field}
              type="number"
            />
            <FormInput
              name="declaredVehicleValue"
              control={control}
              label="Declared value of vehicles (USD/€):"
              labelPosition="left"
              className={styles.field}
              type="number"
            />
          </div>

          <div>
            <h4 className={styles.interfaceHeader}>Interfaces</h4>
            <div className={styles.interfaceGrid}>
              <div className={styles.interfaceActions}>
                <Button type="button" appearance="secondary">
                  Create Quote
                </Button>
                <Button type="button" appearance="secondary">
                  File Export EEI
                </Button>
                <Button type="button" appearance="secondary">
                  File ISF
                </Button>
              </div>
              <FormInput
                name="quoteNumber"
                control={control}
                label="Quote #"
                labelPosition="left"
                className={styles.interfaceInput}
              />
              <FormInput
                name="variation"
                control={control}
                label="Variation"
                labelPosition="left"
                className={styles.interfaceInput}
              />
              <FormInput
                name="itnNumber"
                control={control}
                label="ITN #"
                labelPosition="left"
                className={styles.interfaceInput}
              />
              <FormInput
                name="questWebNumber"
                control={control}
                label="Questweb #"
                labelPosition="top"
                className={`${styles.interfaceInput} ${styles.interfaceFinalRow}`}
              />
              <FormInput
                name="isfConfirmationNumber"
                control={control}
                label="ISF Confirmation #"
                labelPosition="top"
                className={`${styles.interfaceInput} ${styles.interfaceFinalRow}`}
              />
              <TextAreaField
                name="interfaceNotes"
                control={control}
                className={`${styles.interfaceInput} ${styles.fullWidth}`}
                rows={2}
              />
            </div>
          </div>
        </div>
      </ResponsiveGrid>

      <div className={styles.quantityRow}>
        <span className={styles.quantity}>Lift Vans: 5</span>
        <span className={styles.quantity}>Crates: 0</span>
        <span className={styles.quantity}>Overflow: 1</span>
        <span className={styles.quantity}>Air Containers: 0</span>
        <Button type="button" appearance="secondary">
          Vans
        </Button>
      </div>
    </section>
  );
};

export default ShipmentContent;
