import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, makeStyles, Text, tokens } from "@fluentui/react-components";
import { AddRegular, DeleteRegular, SaveRegular } from "@fluentui/react-icons";
import {
  FormDropdown,
  FormInput,
  GridColumnDef,
  SearchableInput,
  SharedDataGrid,
} from "@/shared";
// Adjust this import path to match your store location
// import {
//   loadCountries,
//   loadStates,
//   type LocationDataState,
//   type LocationOption,
// } from "@/store/locationDataSlice";
import { ServicePlanDetailFormData, ServicePlanRow } from "./types";
import {
  defaultServicePlanFormValues,
  dummyServicePlanMetadata,
  initialServicePlans,
  overrideCurrencyOptions,
  servicePlanOptions,
} from "./constans";
import { loadCountries, loadStates, LocationDataState, LocationOption } from "@/features/address/reducers/locationDataSlice";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    "@media (max-width: 768px)": {
      padding: tokens.spacingHorizontalS,
    },
  },
  sectionCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    padding: `${tokens.spacingVerticalXS} 0`,
  },
  detailSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: tokens.spacingHorizontalXXL,
    rowGap: tokens.spacingVerticalM,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
      columnGap: tokens.spacingHorizontalM,
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
});

export const ServicePlansSection: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch<any>();

  const countries = useSelector(
    (state: { locationData: LocationDataState }) =>
      state.locationData.countries,
  );
  const countriesStatus = useSelector(
    (state: { locationData: LocationDataState }) =>
      state.locationData.countriesStatus,
  );

  const [rows, setRows] = useState<ServicePlanRow[]>(initialServicePlans);
  const [originStates, setOriginStates] = useState<LocationOption[]>([]);
  const [destinationStates, setDestinationStates] = useState<LocationOption[]>(
    [],
  );

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<ServicePlanDetailFormData>({
      defaultValues: defaultServicePlanFormValues,
    });

  const selectedOriginCountry = watch("originCountry");
  const selectedDestinationCountry = watch("destinationCountry");

  useEffect(() => {
    if (countriesStatus === "idle") {
      dispatch(loadCountries());
    }
  }, [dispatch, countriesStatus]);

  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        label: country.description,
        value: country.countryCode,
      })),
    [countries],
  );

  const originStateOptions = useMemo(
    () =>
      originStates.map((state) => ({
        label: state.description,
        value: state.stateCode ?? state.id,
      })),
    [originStates],
  );

  const destinationStateOptions = useMemo(
    () =>
      destinationStates.map((state) => ({
        label: state.description,
        value: state.stateCode ?? state.id,
      })),
    [destinationStates],
  );

  const handleOriginCountryChange = async (countryCode: string) => {
    setValue("originState", "");
    setOriginStates([]);
    if (!countryCode) return;

    try {
      const result = (await dispatch(
        loadStates(countryCode),
      ).unwrap()) as LocationOption[];
      setOriginStates(result);
    } catch {
      setOriginStates([]);
    }
  };

  const handleDestinationCountryChange = async (countryCode: string) => {
    setValue("destinationState", "");
    setDestinationStates([]);
    if (!countryCode) return;

    try {
      const result = (await dispatch(
        loadStates(countryCode),
      ).unwrap()) as LocationOption[];
      setDestinationStates(result);
    } catch {
      setDestinationStates([]);
    }
  };

  const handleNew = () => {
    reset(defaultServicePlanFormValues);
    setOriginStates([]);
    setDestinationStates([]);
  };

  const handleSave = (data: ServicePlanDetailFormData) => {
    const newRow: ServicePlanRow = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      serviceDescription: data.service?.trim() ?? "",
      serviceOrigin: data.originLocation?.trim() ?? "",
      originState: data.originState?.trim() ?? "",
      originCountry: data.originCountry?.trim() ?? "",
      serviceDestination: data.destinationLocation?.trim() ?? "",
      destinationState: data.destinationState?.trim() ?? "",
      destinationCountry: data.destinationCountry?.trim() ?? "",
      code: dummyServicePlanMetadata.code,
      agent: data.agent?.trim() ?? "",
      calculatedAmount: dummyServicePlanMetadata.calculatedAmount,
      manualOverride:
        data.manualOverrideUsd !== undefined
          ? String(data.manualOverrideUsd).trim()
          : "",
      overrideCurrency: data.overrideCurrency,
      amountInCurrency: data.amountInCurrency,
      fxRate: data.fxRate,
    };

    setRows((prev) => [newRow, ...prev]);
    reset(defaultServicePlanFormValues);
    setOriginStates([]);
    setDestinationStates([]);
  };

  const handleDeleteRow = (id: string) => {
    setRows((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFieldSearch = (fieldName: string) => {
    console.info(`Search triggered for ${fieldName}`);
  };

  const columns: GridColumnDef<ServicePlanRow>[] = [
    { key: "serviceDescription", label: "Service Description", minWidth: 190 },
    { key: "serviceOrigin", label: "Service Origin", minWidth: 140 },
    { key: "originState", label: "State", minWidth: 90 },
    { key: "originCountry", label: "Country", minWidth: 110 },
    { key: "serviceDestination", label: "Service Destination", minWidth: 150 },
    { key: "destinationState", label: "State", minWidth: 90 },
    { key: "destinationCountry", label: "Country", minWidth: 110 },
    { key: "code", label: "Code", minWidth: 90 },
    { key: "agent", label: "Agent", minWidth: 140 },
    { key: "calculatedAmount", label: "Calculated Amount", minWidth: 140 },
    { key: "manualOverride", label: "Manual Override", minWidth: 130 },
    {
      key: "id",
      label: "",
      minWidth: 60,
      sortable: false,
      renderCell: (item) => (
        <Button
          icon={<DeleteRegular />}
          appearance="subtle"
          aria-label="Delete service plan"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteRow(item.id);
          }}
        />
      ),
    },
  ];

  return (
    <div className={styles.root}>
      {/* Top Table Section: Service Plans */}
      <div className={styles.sectionCard}>
        <Text weight="semibold" size={400}>
          Service Plans
        </Text>
        <SharedDataGrid
          items={rows}
          columns={columns}
          getRowId={(item) => item.id}
          showSearch={false}
          pageSize={6}
          enableColumnPinning={false}
        />
      </div>

      {/* Action Bar between Table and Service Plan Detail */}
      <div className={styles.actionBar}>
        <Button
          appearance="secondary"
          icon={<AddRegular />}
          onClick={handleNew}
        >
          New
        </Button>
        <Button
          appearance="primary"
          icon={<SaveRegular />}
          onClick={handleSubmit(handleSave)}
        >
          Save
        </Button>
      </div>

      {/* Bottom Form Section: Service Plan Detail */}
      <div className={styles.detailSection}>
        <Text weight="semibold" size={400}>
          Service Plan Detail
        </Text>

        <form onSubmit={handleSubmit(handleSave)} className={styles.detailGrid}>
          {/* Left Column */}
          <div className={styles.column}>
            <FormDropdown
              name="service"
              control={control}
              label="Service :"
              labelPosition="left"
              options={servicePlanOptions}
              placeholder="Select Service..."
            />

            <Controller
              name="originLocation"
              control={control}
              render={({ field }) => (
                <SearchableInput
                  id="originLocation"
                  label="Origin Location :"
                  labelPosition="left"
                  value={field.value}
                  onChange={field.onChange}
                  onSearch={() => handleFieldSearch("originLocation")}
                  placeholder="Search origin location..."
                />
              )}
            />

            <FormDropdown
              name="originState"
              control={control}
              label="State :"
              labelPosition="left"
              options={originStateOptions}
              placeholder="Select State..."
              disabled={
                !selectedOriginCountry || originStateOptions.length === 0
              }
            />

            <FormDropdown
              name="originCountry"
              control={control}
              label="Country :"
              labelPosition="left"
              options={countryOptions}
              placeholder="Select Country..."
              onChange={handleOriginCountryChange}
            />

            <FormInput
              name="manualOverrideUsd"
              control={control}
              label="Manual Override (USD) :"
              labelPosition="left"
              type="number"
              placeholder="0.00"
            />

            <FormDropdown
              name="overrideCurrency"
              control={control}
              label="Override Currency :"
              labelPosition="left"
              options={overrideCurrencyOptions}
              placeholder="Select Currency..."
            />
          </div>

          {/* Right Column */}
          <div className={styles.column}>
            <Controller
              name="agent"
              control={control}
              render={({ field }) => (
                <SearchableInput
                  id="agent"
                  label="Agent :"
                  labelPosition="left"
                  value={field.value}
                  onChange={field.onChange}
                  onSearch={() => handleFieldSearch("agent")}
                  placeholder="Search agent..."
                />
              )}
            />

            <Controller
              name="destinationLocation"
              control={control}
              render={({ field }) => (
                <SearchableInput
                  id="destinationLocation"
                  label="Destination Location :"
                  labelPosition="left"
                  value={field.value}
                  onChange={field.onChange}
                  onSearch={() => handleFieldSearch("destinationLocation")}
                  placeholder="Search destination location..."
                />
              )}
            />

            <FormDropdown
              name="destinationState"
              control={control}
              label="State :"
              labelPosition="left"
              options={destinationStateOptions}
              placeholder="Select State..."
              disabled={
                !selectedDestinationCountry ||
                destinationStateOptions.length === 0
              }
            />

            <FormDropdown
              name="destinationCountry"
              control={control}
              label="Country :"
              labelPosition="left"
              options={countryOptions}
              placeholder="Select Country..."
              onChange={handleDestinationCountryChange}
            />

            <FormInput
              name="amountInCurrency"
              control={control}
              label="Amount in Currency :"
              labelPosition="left"
              type="number"
              placeholder="0.00"
            />

            <FormInput
              name="fxRate"
              control={control}
              label="FX Rate :"
              labelPosition="left"
              type="number"
              placeholder="1.00000000"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
