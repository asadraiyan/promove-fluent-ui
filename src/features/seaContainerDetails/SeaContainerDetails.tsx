import React, { useEffect, useMemo, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  ContainerApiRecord,
  ContainerDetails,
  ContainerRequestPayload,
  ContainerRow,
  GoodsDropDetails,
  SeaContainerResponse,
} from "./SeaContainerDetails.types";
import { CONTAINER_COLUMNS, CONTAINER_TYPE_OPTIONS, DROP_AT_OPTIONS, EMPTY_CONTAINER, EMPTY_GOODS_DROP_DETAILS } from "./constants";
import {
  createSeaContainer,
  deleteSeaContainer,
  loadSeaContainerDetails,
  updateSeaContainer,
} from "./reducers/seaContainerDetailsSlice";
import type { ShipmentDirection } from "./api/containersApi";

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

const dateOnly = (value: string | null): string =>
  value ? value.slice(0, 10) : "";

const nullableString = (value: string | number | null | undefined): string =>
  value == null ? "" : String(value);

const mapRecordToForm = (record: ContainerApiRecord): ContainerDetails => ({
  type: nullableString(record.type),
  contReg: nullableString(record.contReg),
  sealNo: nullableString(record.sealNo),
  goodsDescription: nullableString(record.goodsDescription),
  freeDays: nullableString(record.noofFreeDays),
  actualNetVolumeCft: nullableString(record.actualNetVolumeCuft),
  actualNetWeightLbs: nullableString(record.actualNetWeightLbs),
  actualNetVolumeM3: nullableString(record.actualNetVolumeM3),
  actualNetWeightKg: nullableString(record.actualNetWeightKg),
  actualGrossVolumeCft: nullableString(record.actualGrossVolumeCuft),
  actualGrossWeightLbs: nullableString(record.actualGrossWeightLbs),
  actualGrossVolumeM3: nullableString(record.actualGrossVolumeM3),
  actualGrossWeightKg: nullableString(record.actualGrossWeightKg),
  tareWeightLbs: nullableString(record.tareWeightLbs),
  tareWeightKg: nullableString(record.tareWeightKg),
  noOfPieces: nullableString(record.noOfPieces),
  noOfLiftVans: nullableString(record.noofLiftVans),
});

const mapResponseToGoodsDropDetails = (
  response: SeaContainerResponse,
): GoodsDropDetails => ({
  dropDate: dateOnly(response.goodsDropDetails.dropDate),
  waitAndLoadDateTime: dateOnly(
    response.goodsDropDetails.waitAndLoadDateTime,
  ),
  dropAt: response.goodsDropDetails.dropAt ?? "",
});

const toNullableNumber = (value: string): number | null => {
  if (!value.trim()) return null;
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const mapFormToPayload = (
  values: ContainerDetails,
): ContainerRequestPayload => {
  const numericType = toNullableNumber(values.type);
  return {
    type:
      numericType === null && values.type.trim()
        ? values.type
        : numericType,
    contReg: values.contReg || null,
    sealNo: values.sealNo || null,
    actualNetVolumeCuft: toNullableNumber(values.actualNetVolumeCft),
    actualNetWeightLbs: toNullableNumber(values.actualNetWeightLbs),
    actualNetVolumeM3: toNullableNumber(values.actualNetVolumeM3),
    actualNetWeightKg: toNullableNumber(values.actualNetWeightKg),
    noOfPieces: toNullableNumber(values.noOfPieces),
    noofLiftVans: toNullableNumber(values.noOfLiftVans),
    actualGrossVolumeCuft: toNullableNumber(values.actualGrossVolumeCft),
    actualGrossWeightLbs: toNullableNumber(values.actualGrossWeightLbs),
    actualGrossVolumeM3: toNullableNumber(values.actualGrossVolumeM3),
    actualGrossWeightKg: toNullableNumber(values.actualGrossWeightKg),
    tareWeightLbs: toNullableNumber(values.tareWeightLbs),
    tareWeightKg: toNullableNumber(values.tareWeightKg),
    noOfFreeDays: toNullableNumber(values.freeDays),
  };
};

interface SeaContainerDetailsProps {
  goodsId?: number;
  direction?: ShipmentDirection;
}

const SeaContainerDetails: React.FC<SeaContainerDetailsProps> = ({
  goodsId = 80900,
  direction = "import",
}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { data, loadStatus, loadError, saveStatus, saveError } =
    useAppSelector((state) => state.seaContainerDetails);
  const [editingContainerId, setEditingContainerId] = useState<number | null>(
    null,
  );
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

  const containers: ContainerRow[] = (data?.containers ?? []).map(
    (record) => ({
      ...mapRecordToForm(record),
      id: String(record.movingUnitsId),
      movingUnitsId: record.movingUnitsId,
    }),
  );
  const containerTypeOptions = useMemo(() => {
    const options = [...CONTAINER_TYPE_OPTIONS];
    (data?.containers ?? []).forEach((container) => {
      if (
        container.type !== null &&
        !options.some((option) => option.value === String(container.type))
      ) {
        options.push({
          value: String(container.type),
          label: String(container.type),
        });
      }
    });
    return options;
  }, [data?.containers]);

  useEffect(() => {
    let active = true;
    const loadDetails = async () => {
      const result = await dispatch(loadSeaContainerDetails({ goodsId }));
      if (!active || !loadSeaContainerDetails.fulfilled.match(result)) return;

      goodsDropForm.reset(mapResponseToGoodsDropDetails(result.payload));
      if (result.payload.containerDetails) {
        const selected = result.payload.containerDetails;
        containerForm.reset(mapRecordToForm(selected));
        setEditingContainerId(selected.movingUnitsId);
      } else {
        containerForm.reset(EMPTY_CONTAINER);
        setEditingContainerId(null);
      }
    };
    void loadDetails();
    return () => {
      active = false;
    };
  }, [containerForm.reset, dispatch, goodsDropForm.reset, goodsId]);

  const refreshContainers = async () => {
    await dispatch(loadSeaContainerDetails({ goodsId }));
  };

  const addContainer = async (values: ContainerDetails) => {
    const result = await dispatch(
      createSeaContainer({
        goodsId,
        direction,
        payload: mapFormToPayload(values),
      }),
    );
    if (!createSeaContainer.fulfilled.match(result)) return;
    containerForm.reset(EMPTY_CONTAINER);
    setEditingContainerId(null);
    await refreshContainers();
  };

  const editContainer = async (container: ContainerRow) => {
    const result = await dispatch(
      loadSeaContainerDetails({
        goodsId,
        movingUnitsId: container.movingUnitsId,
      }),
    );
    if (!loadSeaContainerDetails.fulfilled.match(result)) return;
    const selected =
      result.payload.containerDetails ??
      result.payload.containers.find(
        (record) => record.movingUnitsId === container.movingUnitsId,
      );
    if (!selected) return;
    setEditingContainerId(selected.movingUnitsId);
    containerForm.reset(mapRecordToForm(selected));
  };

  const updateContainer = async (values: ContainerDetails) => {
    if (editingContainerId === null) return;
    const result = await dispatch(
      updateSeaContainer({
        goodsId,
        movingUnitsId: editingContainerId,
        direction,
        payload: mapFormToPayload(values),
      }),
    );
    if (!updateSeaContainer.fulfilled.match(result)) return;
    setEditingContainerId(null);
    containerForm.reset(EMPTY_CONTAINER);
    await refreshContainers();
  };

  const deleteContainer = async (container: ContainerRow) => {
    const result = await dispatch(
      deleteSeaContainer({
        goodsId,
        movingUnitsId: container.movingUnitsId,
        direction,
      }),
    );
    if (!deleteSeaContainer.fulfilled.match(result)) return;
    if (editingContainerId === container.movingUnitsId) {
      setEditingContainerId(null);
      containerForm.reset(EMPTY_CONTAINER);
    }
    await refreshContainers();
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
            onClick={() => void editContainer(container)}
          >
            <EditRegular />
          </Button>
          <Button
            type="button"
            appearance="subtle"
            className={styles.deleteButton}
            aria-label={`Delete container ${container.contReg || container.id}`}
            title="Delete container"
            onClick={() => void deleteContainer(container)}
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
      {loadStatus === "loading" && (
        <div role="status">Loading shipment containers...</div>
      )}
      {loadError && <div role="alert">{loadError}</div>}
      {saveStatus === "loading" && (
        <div role="status">Saving shipment container...</div>
      )}
      {saveError && <div role="alert">{saveError}</div>}

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
            options={[
              ...DROP_AT_OPTIONS,
              { value: "Residence", label: "Residence" },
            ]}
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
                options={containerTypeOptions}
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
              disabled={
                !hasContainerValues ||
                editingContainerId !== null ||
                saveStatus === "loading"
              }
            >
              Save
            </Button>
            <Button
              type="button"
              appearance="primary"
              className={styles.saveButton}
              disabled={
                editingContainerId === null || saveStatus === "loading"
              }
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
