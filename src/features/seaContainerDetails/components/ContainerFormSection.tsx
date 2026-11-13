
import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { UseFormReturn } from "react-hook-form";

import {
  Button,
  FormDropdown,
  FormInput,
  ResponsiveGrid,
} from "@/shared";

import { ContainerDetails } from "../SeaContainerDetails.types";

const useStyles = makeStyles({
  section: {
    paddingTop: tokens.spacingVerticalM,
  },
  sectionTitle: {
    margin: 0,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  containerForm: {
    display: "grid",
    gridTemplateColumns:
      "minmax(200px, 1.15fr) minmax(360px, 2fr) minmax(140px, 0.8fr)",
    alignItems: "start",
    gap: tokens.spacingHorizontalL,
  },
  formColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  measurementGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalS,
    minWidth: 0,
  },
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
  },
  saveButton: {
    minWidth: "96px",
  },
});

interface ContainerFormSectionProps {
  form: UseFormReturn<ContainerDetails>;
  containerTypeOptions: Array<{
    value: string;
    label: string;
  }>;
  hasContainerValues: boolean;
  isEditing: boolean;
  isSaving: boolean;
  onAdd: (values: ContainerDetails) => Promise<void>;
  onUpdate: (values: ContainerDetails) => Promise<void>;
}

const ContainerFormSection: React.FC<ContainerFormSectionProps> = ({
  form,
  containerTypeOptions,
  hasContainerValues,
  isEditing,
  isSaving,
  onAdd,
  onUpdate,
}) => {
  const styles = useStyles();

  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Container details</h3>

      <form onSubmit={form.handleSubmit(onAdd)} noValidate>
        <ResponsiveGrid className={styles.containerForm}>
          <div className={styles.formColumn}>
            <FormDropdown
              name="type"
              control={form.control}
              label="Type"
              labelPosition="left"
              placeholder="Select type"
              options={containerTypeOptions}
            />

            <FormInput
              name="contReg"
              control={form.control}
              label="Cont Reg"
              labelPosition="left"
            />

            <FormInput
              name="sealNo"
              control={form.control}
              label="Seal No"
              labelPosition="left"
            />

            <FormInput
              name="goodsDescription"
              control={form.control}
              label="Goods Description"
              labelPosition="left"
            />

            <FormInput
              name="freeDays"
              control={form.control}
              label="# of Free Days"
              labelPosition="left"
              type="number"
            />
          </div>

          <ResponsiveGrid className={styles.measurementGrid}>
            <FormInput
              name="actualNetVolumeCft"
              control={form.control}
              label="Actual Net Volume (cuft)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="actualNetVolumeM3"
              control={form.control}
              label="Actual Net Volume (M3)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="actualNetWeightLbs"
              control={form.control}
              label="Actual Net Weight (Lbs)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="actualNetWeightKg"
              control={form.control}
              label="Actual Net Weight (Kg)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="actualGrossVolumeCft"
              control={form.control}
              label="Actual Gross Volume (cuft)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="actualGrossVolumeM3"
              control={form.control}
              label="Actual Gross Volume (M3)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="actualGrossWeightLbs"
              control={form.control}
              label="Actual Gross Weight (Lbs)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="actualGrossWeightKg"
              control={form.control}
              label="Actual Gross Weight (Kg)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="tareWeightLbs"
              control={form.control}
              label="Tare Weight (Lbs)"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="tareWeightKg"
              control={form.control}
              label="Tare Weight (Kg)"
              labelPosition="left"
              type="number"
            />
          </ResponsiveGrid>

          <div className={styles.formColumn}>
            <FormInput
              name="noOfPieces"
              control={form.control}
              label="No of Pieces"
              labelPosition="left"
              type="number"
            />

            <FormInput
              name="noOfLiftVans"
              control={form.control}
              label="No of Lift Vans"
              labelPosition="left"
              type="number"
            />
          </div>
        </ResponsiveGrid>

        <div className={styles.actionRow}>
          <Button
            type="submit"
            appearance="primary"
            className={styles.saveButton}
            disabled={!hasContainerValues || isEditing || isSaving}
          >
            Save
          </Button>

          <Button
            type="button"
            appearance="primary"
            className={styles.saveButton}
            disabled={!isEditing || isSaving}
            onClick={form.handleSubmit(onUpdate)}
          >
            Update
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ContainerFormSection;
