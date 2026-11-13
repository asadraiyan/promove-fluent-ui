import React, { useEffect, useMemo, useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { DeleteRegular, EditRegular } from "@fluentui/react-icons";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/shared";
import { type GridColumnDef } from "@/shared/components/Table/ModalTable";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {ContainerDetails, ContainerRow, GoodsDropDetails} from "./SeaContainerDetails.types";
import {CONTAINER_COLUMNS, CONTAINER_TYPE_OPTIONS, EMPTY_CONTAINER, EMPTY_GOODS_DROP_DETAILS} from "./constants";
import {createSeaContainer, deleteSeaContainer, loadSeaContainerDetails,  updateSeaContainer} from "./reducers/seaContainerDetailsSlice";
import type { ShipmentDirection } from "./api/containersApi";
import {mapFormToPayload, mapRecordToForm, mapResponseToGoodsDropDetails} from "./SeaContainerDetails.utils";
import GoodsDropDetailsSection from "./components/GoodsDropDetailsSection";
import ContainerListSection from "./components/ContainerListSection";
import ContainerFormSection from "./components/ContainerFormSection";

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
  divider: {
    border: "none",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: `${tokens.spacingVerticalM} 0 0`,
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

  const [editingContainerId, setEditingContainerId] = useState<number | null>(null,);

  const goodsDropForm = useForm<GoodsDropDetails>({
    defaultValues: EMPTY_GOODS_DROP_DETAILS,
  });

  const containerForm = useForm<ContainerDetails>({
    defaultValues: EMPTY_CONTAINER,
  });

  const containerValues = useWatch({
    control: containerForm.control,
  });

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

      if (!active || !loadSeaContainerDetails.fulfilled.match(result)) {
        return;
      }

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

      <GoodsDropDetailsSection control={goodsDropForm.control} />

      <hr className={styles.divider} />

      <ContainerListSection
        containers={containers}
        columns={containerColumns}
      />

      <hr className={styles.divider} />

      <ContainerFormSection
        form={containerForm}
        containerTypeOptions={containerTypeOptions}
        hasContainerValues={hasContainerValues}
        isEditing={editingContainerId !== null}
        isSaving={saveStatus === "loading"}
        onAdd={addContainer}
        onUpdate={updateContainer}
      />
    </div>
  );
};

export default SeaContainerDetails;
