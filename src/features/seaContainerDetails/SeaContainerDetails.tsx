import React, { useRef, useState } from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { makeStyles, tokens } from "@fluentui/react-components";
import { DeleteRegular, EditRegular } from "@fluentui/react-icons";
import { useController, useForm, useWatch } from "react-hook-form";

import {
  Button,
  FieldLabel,
  FormDropdown,
  FormInput,
  ResponsiveGrid,
  ResponsiveGridLabel,
} from "@/shared";
import { ModalTable, type GridColumnDef } from "@/shared/components/Table/ModalTable";
import type { ContainerDetails, ContainerRow, GoodsDropDetails } from "./SeaContainerDetails.types";
import { CONTAINER_COLUMNS, CONTAINER_TYPE_OPTIONS, DROP_AT_OPTIONS, EMPTY_CONTAINER, EMPTY_GOODS_DROP_DETAILS } from "./constants";

const useStyles = makeStyles({
  root: {
    boxSizing: "border-box",
    width: "calc(100% - 32px)",
    maxWidth: "1200px",
    margin: "24px auto",
    padding: tokens.spacingVerticalM,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    "& input, & select": {
      boxSizing: "border-box",
      width: "100%",
      minWidth: 0,
    },
  },
  heading: {
    margin: 0,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
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
  goodsDropGrid: {
    display : "flex",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    columnGap: tokens.spacingHorizontalL,
    rowGap: tokens.spacingVerticalM,
  },
  dateField: {
    gridTemplateColumns: "minmax(0, min(12rem, 40%)) minmax(0, 1fr)",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalM,
    minWidth: 0,
  },
  datePicker: {
    width: "100%",
    minWidth: 0,
  },
  divider: {
    border: "none",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: `${tokens.spacingVerticalM} 0 0`,
  },
  containerForm: {
    display: "grid",
    gridTemplateColumns: "minmax(200px, 1.15fr) minmax(360px, 2fr) minmax(140px, 0.8fr)",
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
  rowActions: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
  },
  editButton: {
  color: tokens.colorBrandForeground1,
  minWidth: "32px",
  fontSize: tokens.fontSizeBase400,
},
deleteButton: {
  color: tokens.colorPaletteRedForeground1,
  minWidth: "32px",
  fontSize: tokens.fontSizeBase400,
},

});

const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const toDate = (value: string): Date | null =>
  value ? new Date(`${value}T00:00:00`) : null;

const SeaContainerDetails: React.FC = () => {
  const styles = useStyles();
  const [containers, setContainers] = useState<ContainerRow[]>([]);
  const [editingContainerId, setEditingContainerId] = useState<string | null>(null);
  const nextContainerId = useRef(0);
  const goodsDropForm = useForm<GoodsDropDetails>({
    defaultValues: EMPTY_GOODS_DROP_DETAILS,
  });
  const containerForm = useForm<ContainerDetails>({
    defaultValues: EMPTY_CONTAINER,
  });
  const { field: dropDateField } = useController({
    name: "dropDate",
    control: goodsDropForm.control,
  });
  const { field: waitAndLoadDateTimeField } = useController({
    name: "waitAndLoadDateTime",
    control: goodsDropForm.control,
  });
  const containerValues = useWatch({ control: containerForm.control });
  const hasContainerValues = Object.values(containerValues).some(
    (value) => typeof value === "string" && value.trim().length > 0,
  );

  const addContainer = (values: ContainerDetails) => {
    nextContainerId.current += 1;
    setContainers((currentContainers) => [
      ...currentContainers,
      { ...values, id: String(nextContainerId.current) },
    ]);
    containerForm.reset(EMPTY_CONTAINER);
  };

  const editContainer = (container: ContainerRow) => {
    const { id, ...values } = container;
    setEditingContainerId(id);
    containerForm.reset(values);
  };

  const updateContainer = (values: ContainerDetails) => {
    if (editingContainerId === null) return;

    setContainers((currentContainers) =>
      currentContainers.map((container) =>
        container.id === editingContainerId
          ? { ...values, id: editingContainerId }
          : container,
      ),
    );
    setEditingContainerId(null);
    containerForm.reset(EMPTY_CONTAINER);
  };

  const deleteContainer = (container: ContainerRow) => {
    setContainers((currentContainers) =>
      currentContainers.filter((currentContainer) => currentContainer.id !== container.id),
    );
    if (editingContainerId === container.id) {
      setEditingContainerId(null);
      containerForm.reset(EMPTY_CONTAINER);
    }
  };

  const containerColumns: GridColumnDef<ContainerRow>[] = [
    ...CONTAINER_COLUMNS,
    {
      key: "id",
      label: "Actions",
      sortable: false,
      renderCell: (container) => (
        <div className={styles.rowActions}>
          <Button
            type="button"
            appearance="subtle"
            className={styles.editButton}
            aria-label={`Edit container ${container.contReg || container.id}`}
            title="Edit container"
            onClick={() => editContainer(container)}
          >
            <EditRegular />
          </Button>
          <Button
            type="button"
            appearance="subtle"
            className={styles.deleteButton}
            aria-label={`Delete container ${container.contReg || container.id}`}
            title="Delete container"
            onClick={() => deleteContainer(container)}
          >
            <DeleteRegular />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>Sea Container details</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Goods Drop Details</h3>
        <ResponsiveGrid className={styles.goodsDropGrid}>
          <ResponsiveGrid className={styles.dateField}>
            <ResponsiveGridLabel>
              <FieldLabel htmlFor="dropDate">Drop date</FieldLabel>
            </ResponsiveGridLabel>
            <div>
              <DatePicker
                id="dropDate"
                className={styles.datePicker}
                placeholder="Select a date"
                value={toDate(dropDateField.value)}
                onSelectDate={(date) =>
                  dropDateField.onChange(date ? formatDate(date) : "")
                }
                formatDate={(date) => (date ? formatDate(date) : "")}
              />
            </div>
          </ResponsiveGrid>
          <ResponsiveGrid className={styles.dateField}>
            <ResponsiveGridLabel>
              <FieldLabel htmlFor="waitAndLoadDateTime">
                Wait and Load date
              </FieldLabel>
            </ResponsiveGridLabel>
            <div>
              <DatePicker
                id="waitAndLoadDateTime"
                className={styles.datePicker}
                placeholder="Select a date"
                value={toDate(waitAndLoadDateTimeField.value)}
                onSelectDate={(date) =>
                  waitAndLoadDateTimeField.onChange(
                    date ? formatDate(date) : "",
                  )
                }
                formatDate={(date) => (date ? formatDate(date) : "")}
              />
            </div>
          </ResponsiveGrid>
          <FormDropdown
            name="dropAt"
            control={goodsDropForm.control}
            label="Drop at"
            labelPosition="left"
            placeholder="Select drop location"
            options={DROP_AT_OPTIONS}
          />
        </ResponsiveGrid>
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Containers</h3>
        <ModalTable<ContainerRow>
          items={containers}
          columns={containerColumns}
          getRowId={(container) => container.id}
          compact
          emptyState="No containers added yet."
        />
      </section>

      <hr className={styles.divider} />

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Container details</h3>
        <form
          onSubmit={containerForm.handleSubmit(addContainer)}
          noValidate
        >
          <ResponsiveGrid className={styles.containerForm}>
            <div className={styles.formColumn}>
              <FormDropdown
                name="type"
                control={containerForm.control}
                label="Type"
                labelPosition="left"
                placeholder="Select type"
                options={CONTAINER_TYPE_OPTIONS}
              />
              <FormInput
                name="contReg"
                control={containerForm.control}
                label="Cont Reg"
                labelPosition="left"
              />
              <FormInput
                name="sealNo"
                control={containerForm.control}
                label="Seal No"
                labelPosition="left"
              />
              <FormInput
                name="goodsDescription"
                control={containerForm.control}
                label="Goods Description"
                labelPosition="left"
              />
              <FormInput
                name="freeDays"
                control={containerForm.control}
                label="# of Free Days"
                labelPosition="left"
                type="number"
              />
            </div>

            <ResponsiveGrid className={styles.measurementGrid}>
              <FormInput
                name="actualNetVolumeCft"
                control={containerForm.control}
                label="Actual Net Volume (cuft)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="actualNetVolumeM3"
                control={containerForm.control}
                label="Actual Net Volume (M3)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="actualNetWeightLbs"
                control={containerForm.control}
                label="Actual Net Weight (Lbs)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="actualNetWeightKg"
                control={containerForm.control}
                label="Actual Net Weight (Kg)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="actualGrossVolumeCft"
                control={containerForm.control}
                label="Actual Gross Volume (cuft)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="actualGrossVolumeM3"
                control={containerForm.control}
                label="Actual Gross Volume (M3)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="actualGrossWeightLbs"
                control={containerForm.control}
                label="Actual Gross Weight (Lbs)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="actualGrossWeightKg"
                control={containerForm.control}
                label="Actual Gross Weight (Kg)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="tareWeightLbs"
                control={containerForm.control}
                label="Tare Weight (Lbs)"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="tareWeightKg"
                control={containerForm.control}
                label="Tare Weight (Kg)"
                labelPosition="left"
                type="number"
              />
            </ResponsiveGrid>

            <div className={styles.formColumn}>
              <FormInput
                name="noOfPieces"
                control={containerForm.control}
                label="No of Pieces"
                labelPosition="left"
                type="number"
              />
              <FormInput
                name="noOfLiftVans"
                control={containerForm.control}
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
              disabled={!hasContainerValues || editingContainerId !== null}
            >
              Save
            </Button>
            <Button
              type="button"
              appearance="primary"
              className={styles.saveButton}
              disabled={editingContainerId === null}
              onClick={containerForm.handleSubmit(updateContainer)}
            >
              Update
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SeaContainerDetails;
