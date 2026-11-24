export interface QuoteHistoryItem {
  id: string;
  form: string;
  field: string;
  oldValue: string;
  newValue: string;
  modifier: string;
  changedDate: string;
  /** ISO date string (YYYY-MM-DD) used for accurate start/end date filtering */
  changedDateIso: string;
}

export interface QuoteHistoryFilterState {
  changeDateStart: string;
  changeDateEnd: string;
  form: string;
}

export interface DropdownOption {
  label: string;
  value: string;
}
