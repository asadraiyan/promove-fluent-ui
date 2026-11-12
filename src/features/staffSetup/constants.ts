import type { GridColumnDef } from "@/shared/components/Table/ModalTable";
import type { StaffFormValues, StaffRecord } from "./StaffSetup.types";

export const EMPTY_STAFF_FORM: StaffFormValues = {
  ownerCode: "",
  region: "",
  pmUserId: "",
  title: "",
  firstName: "",
  lastName: "",
  status: "Active",
  crewMember: "No",
  crewRole: "",
  initials: "",
  timeCardRef: "",
  niRef: "",
  toleranceLevel: "",
  phoneCode: "",
  phone: "",
  faxCode: "",
  fax: "",
  email: "",
  email2: "",
  email3: "",
  marginNegative: "",
  ccaMember: "No",
  marginPositive: "",
  supervisor: "",
  team: "",
  login: "",
  permissions: [],
};

export const STAFF_COLUMNS: GridColumnDef<StaffRecord>[] = [
  { key: "ownerCode", label: "Owner code" },
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
];

export const REGION_OPTIONS = [
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "east", label: "East" },
  { value: "west", label: "West" },
];

export const TITLE_OPTIONS = [
  { value: "mr", label: "Mr" },
  { value: "mrs", label: "Mrs" },
  { value: "ms", label: "Ms" },
  { value: "dr", label: "Dr" },
];

export const STAFF_STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export const CREW_ROLE_OPTIONS = [
  { value: "flight-crew", label: "Flight crew" },
  { value: "cabin-crew", label: "Cabin crew" },
  { value: "ground-crew", label: "Ground crew" },
];

export const TOLERANCE_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "standard", label: "Standard" },
  { value: "high", label: "High" },
];

export const SUPERVISOR_OPTIONS = [
  { value: "supervisor-1", label: "Supervisor 1" },
  { value: "supervisor-2", label: "Supervisor 2" },
];

export const TEAM_OPTIONS = [
  { value: "team-1", label: "Team 1" },
  { value: "team-2", label: "Team 2" },
];

export const PERMISSION_OPTIONS = [
  { value: "Staff setup", label: "Staff setup" },
  { value: "Shipments", label: "Shipments" },
  { value: "Tracking", label: "Tracking" },
  { value: "Invoicing", label: "Invoicing" },
  { value: "Reports", label: "Reports" },
];
