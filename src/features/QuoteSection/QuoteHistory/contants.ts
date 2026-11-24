
import { GridColumnDef } from "@/shared";
import { DropdownOption, QuoteHistoryFilterState, QuoteHistoryItem } from "./types";

export const DEFAULT_QUOTE_HISTORY_FILTERS: QuoteHistoryFilterState = {
  changeDateStart: "2026-11-02",
  changeDateEnd: "",
  form: "ALL",
};

export const FORM_FILTER_OPTIONS: DropdownOption[] = [
  { label: "All", value: "ALL" },
  { label: "Move Notes", value: "Move Notes" },
];

export const QUOTE_HISTORY_COLUMNS: GridColumnDef<QuoteHistoryItem>[] = [
  {
    key: "form",
    label: "Form",
    minWidth: 130,
  },
  {
    key: "field",
    label: "Field",
    minWidth: 180,
  },
  {
    key: "oldValue",
    label: "Old Value",
    minWidth: 140,
  },
  {
    key: "newValue",
    label: "New Value",
    minWidth: 140,
  },
  {
    key: "modifier",
    label: "Modifier",
    minWidth: 150,
  },
  {
    key: "changedDate",
    label: "Changed Date",
    minWidth: 180,
    accessor: (item) => item.changedDateIso || item.changedDate,
  },
];

export const INITIAL_QUOTE_HISTORY_ITEMS: QuoteHistoryItem[] = [
  {
    id: "1",
    form: "Move Notes",
    field: "Notes Subject",
    oldValue: "",
    newValue: "Test",
    modifier: "Vilas Palve",
    changedDate: "23/11/2026 07:24:56",
    changedDateIso: "2026-11-23",
  },
  {
    id: "2",
    form: "Move Notes",
    field: "Notes Subject Choice",
    oldValue: "",
    newValue: "123",
    modifier: "Vilas Palve",
    changedDate: "23/11/2026 07:24:57",
    changedDateIso: "2026-11-23",
  },
  {
    id: "3",
    form: "Move Notes",
    field: "Notes Text",
    oldValue: "",
    newValue: "456",
    modifier: "Vilas Palve",
    changedDate: "23/11/2026 07:24:57",
    changedDateIso: "2026-11-23",
  },
  {
    id: "4",
    form: "Move Notes",
    field: "Notes Subject",
    oldValue: "",
    newValue: "Test",
    modifier: "Vilas Palve",
    changedDate: "23/11/2026 07:24:56",
    changedDateIso: "2026-11-23",
  },
  {
    id: "5",
    form: "Move Notes",
    field: "Notes Subject Choice",
    oldValue: "",
    newValue: "123",
    modifier: "Vilas Palve",
    changedDate: "23/11/2026 07:24:57",
    changedDateIso: "2026-11-23",
  },
  {
    id: "6",
    form: "Move Notes",
    field: "Notes Text",
    oldValue: "",
    newValue: "456",
    modifier: "Vilas Palve",
    changedDate: "23/11/2026 07:24:57",
    changedDateIso: "2026-11-23",
  },
];
