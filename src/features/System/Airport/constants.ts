import { AirportFilterValues, AirportFormValues } from "./types";

export const STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Blocked", value: "Blocked" },
];

export const INITIAL_FORM_VALUES: AirportFormValues = {
  airportCode: "",
  description: "",
  status: "",
};

export const INITIAL_FILTER_VALUES: AirportFilterValues = {
  airportCode: "",
  description: "",
  showBlocked: false,
};

export const DEFAULT_USER = "USlvpalve";
export const DEFAULT_OWNER_CODE = "001";
