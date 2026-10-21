import React, { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { makeStyles, tokens } from "@fluentui/react-components";

import {
  FormInput,
  FormDropdown,
  ResponsiveGrid,
  SearchableInput,
  CommonEditDialog,
  GridColumnDef,
} from "../../../shared";
import { AddressDetailsFormValues } from "../AddressDetails.types";
import { ADDRESS_TYPE_OPTIONS } from "../constants";
import { useAppSelector } from "@/app/hooks";
import { ModalTable } from "@/shared/components/Table/ModalTable";

interface CitySearchResult {
  id: string;
  cityId: string;
  city: string;
  stateId: string;
  state: string;
  countryId: string;
  country: string;
}

const useStyles = makeStyles({
  grid: {
    gridTemplateColumns: "minmax(0, 1fr)",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalM,
  },
});

const AddressSection: React.FC = () => {
  const styles = useStyles();
  const { control, setValue } = useFormContext<AddressDetailsFormValues>();
  const selectedCountry = useWatch({ control, name: "country" });
  const selectedState = useWatch({ control, name: "state" });
  const selectedCity = useWatch({ control, name: "city" });
  const [citySearchText, setCitySearchText] = useState("");
  const [cityDialogSearchText, setCityDialogSearchText] = useState("");
  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false);
  const {
    data: locationData,
    status,
    error,
  } = useAppSelector((state) => state.locationData);
  const isLoading = status === "idle" || status === "loading";

  const citySearchResults = useMemo<CitySearchResult[]>(() => {
    if (!locationData) return [];

    const query = cityDialogSearchText.trim().toLowerCase();
    return locationData.countries.reduce<CitySearchResult[]>(
      (countries, country) => {
        country.states.forEach((state) => {
          state.cities.forEach((city) => {
            if (!query || city.label.toLowerCase().includes(query)) {
              countries.push({
                id: `${country.id}-${state.id}-${city.id}`,
                cityId: city.id,
                city: city.label,
                stateId: state.id,
                state: state.label,
                countryId: country.id,
                country: country.label,
              });
            }
          });
        });
        return countries;
      },
      [],
    );
  }, [cityDialogSearchText, locationData]);

  const stateOptions = useMemo(() => {
    if (!locationData) return [];

    const country = locationData.countries.find(
      ({ id }) => id === selectedCountry,
    );

    return country?.states.map(({ id, label }) => ({ value: id, label })) ?? [];
  }, [selectedCountry, locationData]);

  const selectedCityLabel = useMemo(() => {
    const country = locationData?.countries.find(
      ({ id }) => id === selectedCountry,
    );
    const state = country?.states.find(({ id }) => id === selectedState);
    return state?.cities.find(({ id }) => id === selectedCity)?.label ?? "";
  }, [selectedCity, selectedCountry, selectedState, locationData]);

  useEffect(() => {
    setCitySearchText(selectedCityLabel);
  }, [selectedCity, selectedCityLabel]);

  const cityColumns = useMemo<GridColumnDef<CitySearchResult>[]>(
    () => [
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "country", label: "Country" },
    ],
    [],
  );

  const handleRowClick = (city: CitySearchResult) => {
    setValue("country", city.countryId, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("state", city.stateId, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("city", city.cityId, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setCitySearchText(city.city);
    setIsCityDialogOpen(false);
  };

  const handleCountryChange = () => {
    setValue("state", "", { shouldDirty: true, shouldValidate: true });
    setValue("city", "", { shouldDirty: true, shouldValidate: true });
    setCitySearchText("");
  };

  const handleStateChange = () => {
    setValue("city", "", { shouldDirty: true, shouldValidate: true });
    setCitySearchText("");
  };

  const handleCityDialogClose = () => {
    setIsCityDialogOpen(false);
    setCitySearchText(selectedCityLabel);
  };

  const handleCitySearch = () => {
    if (citySearchText.trim().length >= 3) {
      setCityDialogSearchText(citySearchText);
      setIsCityDialogOpen(true);
    } else {
      alert("Search requires at least 3 characters.");
    }
  };

  return (
    <section>
      {error && <div role="alert">{error}</div>}
      <ResponsiveGrid className={styles.grid}>
        <FormDropdown
          name="addressType"
          control={control}
          label="Address Type"
          labelPosition="left"
          placeholder="Delivery Address"
          options={ADDRESS_TYPE_OPTIONS}
        />
        <FormDropdown
          name="country"
          control={control}
          label="Country"
          labelPosition="left"
          placeholder={isLoading ? "Loading..." : "Select Country"}
          options={
            locationData?.countries.map(({ id, label }) => ({
              value: id,
              label,
            })) ?? []
          }
          onChange={handleCountryChange}
        />
        <FormInput
          name="address1"
          label="Address 1"
          labelPosition="left"
          control={control}
          placeholder="Enter address"
        />
        <FormInput
          name="address2"
          label="Address 2"
          labelPosition="left"
          control={control}
          placeholder="Enter address"
        />
        <FormInput
          name="address3"
          label="Address 3"
          labelPosition="left"
          control={control}
          placeholder="Enter address"
        />
        <FormDropdown
          name="state"
          control={control}
          label="State/Country"
          labelPosition="left"
          placeholder={
            selectedCountry ? "Select state" : "Select country first"
          }
          options={stateOptions}
          onChange={handleStateChange}
        />
        <SearchableInput
          id="city"
          label="City/Town"
          labelPosition="left"
          value={citySearchText}
          placeholder="Search for a city"
          disabled={isLoading || !locationData}
          onChange={setCitySearchText}
          onSearch={handleCitySearch}
        />
        <FormInput
          name="postcode"
          label="Postcode"
          labelPosition="left"
          control={control}
          placeholder="Enter postcode"
        />
      </ResponsiveGrid>
      <CommonEditDialog
        open={isCityDialogOpen}
        heading={
          cityDialogSearchText.trim()
            ? `Cities matching "${cityDialogSearchText.trim()}"`
            : "Select a city"
        }
        content={
          <ModalTable<CitySearchResult>
            items={citySearchResults}
            columns={cityColumns}
            getRowId={(city) => city.id}
            onRowClick={handleRowClick}
            emptyState={
              cityDialogSearchText.trim()
                ? `No cities found for "${cityDialogSearchText.trim()}".`
                : "No cities are available."
            }
          />
        }
        actions={[
          {
            label: "Cancel",
            appearance: "secondary",
            onClick: handleCityDialogClose,
          },
        ]}
        onClose={handleCityDialogClose}
      />
    </section>
  );
};

export default AddressSection;
