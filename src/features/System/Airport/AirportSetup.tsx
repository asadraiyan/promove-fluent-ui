import React, { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Text, makeStyles, tokens } from "@fluentui/react-components";
import {
  EditRegular,
  DeleteRegular,
  AddRegular,
  SaveRegular,
  SearchRegular,
  DismissRegular,
} from "@fluentui/react-icons";

import dummyAirports from "./airportDummyData.json";
import { AirportFilterValues, AirportFormValues, AirportRecord } from "./types";
import {
  DEFAULT_OWNER_CODE,
  DEFAULT_USER,
  INITIAL_FILTER_VALUES,
  INITIAL_FORM_VALUES,
  STATUS_OPTIONS,
} from "./constants";
import {
  Checkbox,
  FormDropdown,
  FormInput,
  GridColumnDef,
  InputField,
  SharedDataGrid,
} from "@/shared";

const useStyles = makeStyles({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minHeight: "100vh",
    paddingBottom: tokens.spacingVerticalXXL,
  },
  topHeaderBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    boxShadow: tokens.shadow4,
  },
  headerTitleSection: {
    display: "flex",
    alignItems: "center",
    paddingRight: tokens.spacingHorizontalL,
    borderRight: `1px solid ${tokens.colorNeutralStrokeOnBrand}`,
  },
  filterControlsGroup: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    flexGrow: 1,
  },
  inlineFilterField: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  filterCodeInput: {
    width: "110px",
  },
  filterDescInput: {
    width: "240px",
  },
  headerActionsGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  whiteCheckbox: {},
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: `0 ${tokens.spacingHorizontalL}`,
  },
  formCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow2,
  },
  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: tokens.spacingVerticalS,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: tokens.spacingHorizontalL,
    alignItems: "start",
  },
  formActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
    alignSelf: "end",
    paddingTop: tokens.spacingVerticalS,
  },
  rowActions: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    alignItems: "center",
  },
});

const getFormattedToday = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const AirportSetup: React.FC = () => {
  const styles = useStyles();

  const [airports, setAirports] = useState<AirportRecord[]>(
    dummyAirports as AirportRecord[],
  );

  const [filterInputs, setFilterInputs] = useState<AirportFilterValues>(
    INITIAL_FILTER_VALUES,
  );
  const [appliedFilters, setAppliedFilters] = useState<AirportFilterValues>(
    INITIAL_FILTER_VALUES,
  );

  const [editingId, setEditingId] = useState<string | null>(null);

  const { control, handleSubmit, reset, watch } = useForm<AirportFormValues>({
    defaultValues: INITIAL_FORM_VALUES,
    mode: "onChange",
  });

  useEffect(() => {
    reset(INITIAL_FORM_VALUES);
  }, [reset]);

  const watchedAirportCode = watch("airportCode");

  const handleFind = () => {
    setAppliedFilters({ ...filterInputs });
  };

  const handleClearFilters = () => {
    setFilterInputs(INITIAL_FILTER_VALUES);
    setAppliedFilters(INITIAL_FILTER_VALUES);
  };

  const handleNew = () => {
    reset(INITIAL_FORM_VALUES);
    setEditingId(null);
  };

  const onSubmit = (values: AirportFormValues) => {
    const trimmedCode = values.airportCode.trim();
    if (!trimmedCode) {
      return;
    }

    const normalizedStatus = values.status || "Active";
    const formattedDate = getFormattedToday();

    if (editingId) {
      setAirports((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                airportCode: trimmedCode.toUpperCase(),
                description: values.description,
                status: normalizedStatus,
                modificationUser: DEFAULT_USER,
                modificationDate: formattedDate,
              }
            : item,
        ),
      );
    } else {
      const newRecord: AirportRecord = {
        id: String(Date.now()),
        airportCode: trimmedCode.toUpperCase(),
        ownerCode: DEFAULT_OWNER_CODE,
        description: values.description,
        status: normalizedStatus,
        modificationUser: DEFAULT_USER,
        modificationDate: formattedDate,
        pqPortTown: "",
        cityId: "",
        stateId: "",
      };
      setAirports((prev) => [...prev, newRecord]);
    }

    if (normalizedStatus === "Blocked") {
      setFilterInputs((prev) => ({ ...prev, showBlocked: true }));
      setAppliedFilters((prev) => ({ ...prev, showBlocked: true }));
    }

    handleNew();
  };

  const handleEditRow = (record: AirportRecord) => {
    setEditingId(record.id);
    reset({
      airportCode: record.airportCode,
      description: record.description,
      status: record.status,
    });
  };

  const handleDeleteRow = (id: string) => {
    setAirports((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      handleNew();
    }
  };

  const filteredAirports = useMemo(() => {
    return airports.filter((item) => {
      const matchesCode =
        !appliedFilters.airportCode.trim() ||
        item.airportCode
          .toLowerCase()
          .includes(appliedFilters.airportCode.trim().toLowerCase());

      const matchesDesc =
        !appliedFilters.description.trim() ||
        item.description
          .toLowerCase()
          .includes(appliedFilters.description.trim().toLowerCase());

      const matchesStatus = appliedFilters.showBlocked
        ? true
        : item.status !== "Blocked";

      return matchesCode && matchesDesc && matchesStatus;
    });
  }, [airports, appliedFilters]);

  const columns: GridColumnDef<AirportRecord>[] = useMemo(
    () => [
      {
        key: "airportCode",
        label: "AIRPORT_CODE",
        minWidth: 130,
      },
      {
        key: "ownerCode",
        label: "OWNER_CODE",
        minWidth: 120,
      },
      {
        key: "description",
        label: "DESCRIPTION",
        minWidth: 180,
      },
      {
        key: "status",
        label: "STATUS",
        minWidth: 100,
      },
      {
        key: "modificationUser",
        label: "MODIFICATION_USER",
        minWidth: 160,
      },
      {
        key: "modificationDate",
        label: "MODIFICATION_DATE",
        minWidth: 160,
      },
      {
        key: "pqPortTown",
        label: "PQ_PORT_TOWN",
        minWidth: 140,
      },
      {
        key: "cityId",
        label: "CITY_ID",
        minWidth: 120,
      },
      {
        key: "stateId",
        label: "STATE_ID",
        minWidth: 120,
      },
      {
        key: "id",
        label: "ACTIONS",
        sortable: false,
        minWidth: 150,
        renderCell: (item) => (
          <div className={styles.rowActions}>
            <Button
              size="small"
              appearance="subtle"
              icon={<EditRegular />}
              onClick={() => handleEditRow(item)}
              aria-label={`Edit ${item.airportCode}`}
            />
            <Button
              size="small"
              appearance="subtle"
              icon={<DeleteRegular />}
              onClick={() => handleDeleteRow(item.id)}
              aria-label={`Delete ${item.airportCode}`}
            />
          </div>
        ),
      },
    ],
    [styles.rowActions, editingId],
  );

  return (
    <div className={styles.pageContainer}>
      <header className={styles.topHeaderBar}>
        <div className={styles.headerTitleSection}>
          <Text size={400} weight="semibold">
            Airport set-up
          </Text>
        </div>

        <div className={styles.filterControlsGroup}>
          <div className={styles.inlineFilterField}>
            <Text size={200}>Airport Code:</Text>
            <InputField
              ariaLabel="Filter Airport Code"
              className={styles.filterCodeInput}
              value={filterInputs.airportCode}
              onChange={(val) =>
                setFilterInputs((prev) => ({ ...prev, airportCode: val }))
              }
            />
          </div>

          <div className={styles.inlineFilterField}>
            <Text size={200}>Description:</Text>
            <InputField
              ariaLabel="Filter Description"
              className={styles.filterDescInput}
              value={filterInputs.description}
              onChange={(val) =>
                setFilterInputs((prev) => ({ ...prev, description: val }))
              }
            />
          </div>

          <Checkbox
            className={styles.whiteCheckbox}
            label="Show Blocked"
            checked={filterInputs.showBlocked}
            onChange={(_, data) =>
              setFilterInputs((prev) => ({
                ...prev,
                showBlocked: Boolean(data.checked),
              }))
            }
          />
        </div>

        <div className={styles.headerActionsGroup}>
          <Button
            appearance="secondary"
            icon={<SearchRegular />}
            onClick={handleFind}
          >
            Find
          </Button>
          <Button
            appearance="secondary"
            icon={<DismissRegular />}
            onClick={handleClearFilters}
          >
            Clear
          </Button>
        </div>
      </header>

      <main className={styles.contentWrapper}>
        <section className={styles.formCard} aria-label="Airport Details Form">
          <div className={styles.formHeader}>
            <Text size={400} weight="semibold">
              {editingId ? "Edit Airport" : "Add Airport"}
            </Text>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
            <FormInput
              name="airportCode"
              control={control}
              label="Code"
              placeholder="e.g. BOM"
              defaultValue={INITIAL_FORM_VALUES.airportCode}
            />

            <FormInput
              name="description"
              control={control}
              label="Description"
              placeholder="Enter airport description"
              defaultValue={INITIAL_FORM_VALUES.description}
            />

            <FormDropdown
              name="status"
              control={control}
              label="Status"
              options={STATUS_OPTIONS}
              placeholder="Select status"
              defaultValue={INITIAL_FORM_VALUES.status}
            />

            <div className={styles.formActions}>
              <Button
                type="button"
                appearance="secondary"
                icon={<AddRegular />}
                onClick={handleNew}
              >
                New
              </Button>
              <Button
                type="submit"
                appearance="primary"
                icon={<SaveRegular />}
                disabled={!(watchedAirportCode || "").trim()}
              >
                Save
              </Button>
            </div>
          </form>
        </section>

        <SharedDataGrid<AirportRecord>
          items={filteredAirports}
          columns={columns}
          getRowId={(item) => item.id}
          showSearch={false}
          pageSize={10}
        />
      </main>
    </div>
  );
};

export default AirportSetup;
