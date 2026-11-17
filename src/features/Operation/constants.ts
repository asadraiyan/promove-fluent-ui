import { TridentAccount, ExcludedPerson, AccountOption } from "./types";

export const initialAccounts: TridentAccount[] = [
  {
    id: "1",
    account: "Brookfield - Ally",
    sfdc: "164784",
    address: "c/o Runzheimer Intl, Westlake, US",
    eligibility: "Non contract lanes",
  },
  {
    id: "2",
    account: "Bosch - Agent Booked",
    sfdc: "134502",
    address: "... Karlsruhe, DE",
    eligibility: "Non contract lanes",
  },
];

export const initialCoordinators: ExcludedPerson[] = [
  { id: "1", name: "104201090" },
  { id: "2", name: "104201091" },
  { id: "3", name: "Kristie Hein" },
];

export const initialSupervisors: ExcludedPerson[] = [
  { id: "1", name: "John Alvin Ferfas" },
  { id: "2", name: "104201091" },
];

export const accountOptions: AccountOption[] = [
  {
    label: "Jean-Denis Jacques Fournier",
    value: "Jean-Denis Jacques Fournier",
    sfdc: "174589",
    address: "Rue de l'Union 1, Vevey, CH",
  },
  {
    label: "Brookfield - Ally",
    value: "Brookfield - Ally",
    sfdc: "164784",
    address: "c/o Runzheimer Intl, Westlake, US",
  },
];

export const eligibilityOptions = [
  { label: "Non contract lanes", value: "Non contract lanes" },
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
