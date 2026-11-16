import type { GridColumnDef } from "@/shared/components/Table/ModalTable";
import initialActions from "./data/triggerActions.json";
import type { TriggerActionFormValues, TriggerActionRecord } from "./Triggers.types";

export const EMPTY_ACTION_FORM: TriggerActionFormValues = {
  actionCode: "",
  group: "",
  trigger: "Close of Event",
  eventDate: "",
  assignee: "",
  sequenceNumber: "",
  dueDate: "",
};

export const ACTION_CODE_OPTIONS = [
  { value: "TITLE", label: "TITLE" },
  { value: "TRIDBOL", label: "TRIDBOL" },
  { value: "TRIDRESSBOOK", label: "TRIDRESSBOOK" },
  {
    value: "CALL_EMAIL",
    label: "Call & Then Send into Email to Tenderer",
  },
];

export const GROUP_OPTIONS = [
  { value: "EXPORT DTP CAR", label: "EXPORT DTP CAR" },
  { value: "EXPORT RO-RO", label: "EXPORT RO-RO" },
  { value: "IMPORT PTD FCL", label: "IMPORT PTD FCL" },
  { value: "Brazil ROAD/VALE", label: "Brazil ROAD/VALE" },
];
export const EDIT_OPTIONS = [
  { value: "Edit", label: "Edit" },
  { value: "Copy", label: "Copy" },
  { value: "Save", label: "Save" },
];

export const OWNER_OPTIONS = [
  { value: "NA\\wmt1249", label: "NA\\wmt1249" },
  { value: "NA\\wmt1124", label: "NA\\wmt1124" },
  { value: "NA\\wmt7611", label: "NA\\wmt7611" },
];

export const MOVE_TYPE_OPTIONS = [
  { value: "Import", label: "Import" },
  { value: "Export", label: "Export" },
  { value: "Domestic", label: "Domestic" },
];

export const EVENT_DATE_OPTIONS = [
  { value: "SENDORDER", label: "SENDORDER" },
  { value: "ICS_BEGIN_PACKING_DATE", label: "ICS_BEGIN_PACKING_DATE" },
  { value: "ICS_ACTUAL_MATERIAL", label: "ICS_ACTUAL_MATERIAL" },
];

export const ASSIGNEE_OPTIONS = [
  { value: "Shipping Coordinator", label: "Shipping Coordinator" },
  { value: "Operations", label: "Operations" },
  { value: "Customer Service", label: "Customer Service" },
];

export const TRIGGER_OPTIONS = [
  { value: "Close of Event", label: "Close of Event" },
  { value: "Due Day", label: "Due Day" },
];

export const INITIAL_ACTIONS: TriggerActionRecord[] = initialActions;

export const TRIGGER_ACTION_COLUMNS: GridColumnDef<TriggerActionRecord>[] = [
  { key: "actionCode", label: "Action Code" },
  { key: "event", label: "Event" },
  { key: "group", label: "Group" },
  { key: "dueDate", label: "Due Date" },
  { key: "sequenceNumber", label: "Sequence Number" },
  { key: "modificationUser", label: "Modification User" },
  { key: "modificationDate", label: "Modification Date" },
  { key: "assignee", label: "Assignee" },
];
