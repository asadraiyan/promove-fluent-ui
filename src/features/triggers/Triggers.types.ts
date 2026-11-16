export interface TriggerActionFormValues {
  actionCode: string;
  group: string;
  trigger: string;
  eventDate: string;
  assignee: string;
  sequenceNumber: string;
  dueDate: string;
}

export interface TriggerActionRecord extends Record<string, string> {
  id: string;
  actionCode: string;
  event: string;
  group: string;
  dueDate: string;
  sequenceNumber: string;
  modificationUser: string;
  modificationDate: string;
  assignee: string;
  owner: string;
  moveType: string;
}

export interface TriggersHeaderProps {
  onFind: (filters: TriggerFilters) => void;
  onClear: () => void;
}

export interface TriggerFilters {
  actionCode: string;
  group: string;
  owner: string;
  moveType: string;
}
