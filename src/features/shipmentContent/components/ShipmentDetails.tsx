import React from "react";
import { useController } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormInput,
  ResponsiveGrid,
  ResponsiveGridLabel,
  TextAreaField,
} from "@/shared";
import type {
  ShipmentContentControl,
  ShipmentContentStyles,
} from "../ShipmentContent.types";

interface ShipmentDetailsProps {
  control: ShipmentContentControl;
  styles: ShipmentContentStyles;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  control,
  styles,
}) => {
  const { field: sameAsField } = useController({
    name: "sameAsOtherMoveType",
    control,
  });
  const { field: imperialField } = useController({
    name: "altImperial",
    control,
  });

  return (
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
  );
};

export default ShipmentDetails;
