import { ShipmentNotesValues } from "./ShipmentNotes.types";

export const SHIPMENT_NOTE_FIELDS: {
  name: keyof ShipmentNotesValues;
  label: string;
}[] = [
  { name: "ourResponsibilities", label: "Our responsibilities:" },
  { name: "operationalNotesForCrew", label: "Operational Notes for Crew:" },
  { name: "customerResponsibilities", label: "Customer responsibilities:" },
  { name: "noteForOperations", label: "Note for Operations (confidential):" },
  { name: "itemsNotToBeMoved", label: "Items not to be moved:" },
  {
    name: "moveCoordinatorNotes",
    label: "Notes for Move Coordinator/Authorized Shipments/Home Storage:",
  },
  { name: "additionalNotes", label: "Additional Notes:" },
  { name: "forwardingServicesNotes", label: "Note for Forwarding Services:" },
];