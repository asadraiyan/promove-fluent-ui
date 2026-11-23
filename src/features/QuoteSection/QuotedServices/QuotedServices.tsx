import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { makeStyles, Text, tokens } from "@fluentui/react-components";
import {
  Button,
  FormDropdown,
  FormInput,
  ResponsiveGrid,
  SearchableInput,
  SharedDataGrid,
} from "@/shared";
import {
  containerTypeOptions,
  currencyOptions,
  createQuotedTariffColumns,
  defaultQuotedServiceFormValues,
  initialQuotedServices,
  initialQuotedTariffs,
  quotedServiceColumns,
  serviceOptions,
} from "./constants";
import {
  type QuotedServiceFormData,
  type QuotedServiceRow,
  type QuotedTariffRow,
} from "./types";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100%",
    boxSizing: "border-box",
  },
  sectionCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  formLayout: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    columnGap: tokens.spacingHorizontalXXL,
    rowGap: tokens.spacingVerticalL,
    alignItems: "start",
    marginTop: tokens.spacingVerticalM,
  },
  formColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  tariffSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: 0,
    gridColumn: "1 / -1",
  },
  tariffHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  submitBar: {
    display: "flex",
    justifyContent: "flex-end",
    gridColumn: "1 / -1",
  },
});

export const QuotedServices: React.FC = () => {
  const styles = useStyles();
  const [rows, setRows] = useState<QuotedServiceRow[]>(initialQuotedServices);
  const [tariffs, setTariffs] =
    useState<QuotedTariffRow[]>(initialQuotedTariffs);
  const { control, handleSubmit, reset } = useForm<QuotedServiceFormData>({
    defaultValues: defaultQuotedServiceFormValues,
  });

  const handleSave = (data: QuotedServiceFormData) => {
    const selectedTariff = tariffs.find((tariff) => tariff.pick);
    const newRow: QuotedServiceRow = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      serviceDescription: data.service.trim(),
      serviceOrigin: data.originLocation.trim(),
      originState: data.originState.trim(),
      originCountry: data.originCountry.trim(),
      serviceDestination: data.destinationLocation.trim(),
      destinationState: data.destinationState.trim(),
      destinationCountry: data.destinationCountry.trim(),
      code: "",
      agent: data.agent.trim(),
      calculatedAmount: data.calculatedAmount.trim(),
      manualOverrideUsd: data.manualOverrideUsd.trim(),
      amountInCurrency: data.amountInCurrency.trim(),
      overrideCurrency: data.overrideCurrency,
      fxRate: data.fxRate.trim(),
      containerType: data.containerType,
      tariffAmount: selectedTariff?.amount ?? "",
      tariff: selectedTariff?.tariff ?? "",
      vendor: selectedTariff?.vendor ?? "",
    };

    setRows((currentRows) => [newRow, ...currentRows]);
    reset(defaultQuotedServiceFormValues);
  };

  const handleSearch = (fieldName: string) => {
    console.info(`Search triggered for ${fieldName}`);
  };

  const handlePickTariff = (id: string, checked: boolean) => {
    setTariffs((currentTariffs) =>
      currentTariffs.map((tariff) => ({
        ...tariff,
        pick: tariff.id === id && checked,
      })),
    );
  };

  const tariffColumns = createQuotedTariffColumns(handlePickTariff);

  return (
    <div className={styles.root}>
      <section className={styles.sectionCard}>
        <Text weight="semibold" size={400}>
          Quoted Services
        </Text>
        <SharedDataGrid
          items={rows}
          columns={quotedServiceColumns}
          getRowId={(item) => item.id}
          showSearch={false}
          enableColumnPinning={false}
        />
        <form onSubmit={handleSubmit(handleSave)}>
          <ResponsiveGrid className={styles.formLayout}>
            <ResponsiveGrid className={styles.formColumn}>
              <FormDropdown
                name="service"
                control={control}
                label="Service :"
                labelPosition="left"
                options={serviceOptions}
                placeholder="Select Service..."
              />

              <Controller
                name="originLocation"
                control={control}
                render={({ field }) => (
                  <SearchableInput
                    id="originLocation"
                    label="Location 1 :"
                    labelPosition="left"
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={() => handleSearch("originLocation")}
                    placeholder="Search location..."
                  />
                )}
              />

              <FormInput
                name="originState"
                control={control}
                label="State :"
                labelPosition="left"
              />

              <FormInput
                name="originCountry"
                control={control}
                label="Country :"
                labelPosition="left"
              />

              <FormInput
                name="manualOverrideUsd"
                control={control}
                label="Manual Override (USD) :"
                labelPosition="left"
                type="number"
                placeholder="0.00"
              />

              <FormInput
                name="amountInCurrency"
                control={control}
                label="Amount in Currency :"
                labelPosition="left"
                type="number"
                placeholder="0.00"
              />

              <FormDropdown
                name="containerType"
                control={control}
                label="Container Type :"
                labelPosition="left"
                options={containerTypeOptions}
                placeholder="Select Container Type..."
              />
            </ResponsiveGrid>

            <ResponsiveGrid className={styles.formColumn}>
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
                    onSearch={() => handleSearch("agent")}
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
                    label="Location 2 :"
                    labelPosition="left"
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={() => handleSearch("destinationLocation")}
                    placeholder="Search location..."
                  />
                )}
              />

              <FormInput
                name="destinationState"
                control={control}
                label="State :"
                labelPosition="left"
              />

              <FormInput
                name="destinationCountry"
                control={control}
                label="Country :"
                labelPosition="left"
              />

              <FormInput
                name="calculatedAmount"
                control={control}
                label="Calculated Amount :"
                labelPosition="left"
                readOnly
              />

              <FormDropdown
                name="overrideCurrency"
                control={control}
                label="Override Currency :"
                labelPosition="left"
                options={currencyOptions}
                placeholder="Select Currency..."
              />

              <FormInput
                name="fxRate"
                control={control}
                label="Fx Rate :"
                labelPosition="left"
                type="number"
                placeholder="1.00000000"
              />
            </ResponsiveGrid>

            <div className={styles.tariffSection}>
              <div className={styles.tariffHeader}>
                <Text weight="semibold">Tariff</Text>
                <Button
                  type="button"
                  appearance="secondary"
                  onClick={() => setTariffs(initialQuotedTariffs)}
                >
                  Get Tariffs
                </Button>
              </div>
              <SharedDataGrid
                items={tariffs}
                columns={tariffColumns}
                getRowId={(item) => item.id}
                showSearch={false}
                enableColumnPinning={false}
                emptyState={<Text>No tariffs available.</Text>}
              />
            </div>

            <div className={styles.submitBar}>
              <Button type="submit" appearance="primary">
                Save
              </Button>
            </div>
          </ResponsiveGrid>
        </form>
      </section>
    </div>
  );
};

export default QuotedServices;
