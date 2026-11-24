
import { NoteDropdownOption, NoteFormValues, NoteItem } from "./types";

export const SUBJECT_CHOICE_OPTIONS: NoteDropdownOption[] = [
  { label: "123", value: "123" },
  { label: "456", value: "456" },
  { label: "General", value: "General" },
];

export const DEFAULT_NOTE_FORM_VALUES: NoteFormValues = {
  date: "2026-11-23",
  enteredBy: "Vilas Palve",
  subject: "Test",
  subjectChoice: "123",
  text: "456",
};

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: "1",
    subject: "Test",
    subjectChoice: "123",
    text: "456",
    creationUser: "Vilas Palve",
    creationDate: "23/11/2026",
    creationDateIso: "2026-11-23",
  },
];
