export interface NoteItem {
  id: string;
  subject: string;
  subjectChoice: string;
  text: string;
  creationUser: string;
  creationDate: string;
  creationDateIso: string;
}

export interface NoteFormValues {
  date: string;
  enteredBy: string;
  subject: string;
  subjectChoice: string;
  text: string;
}

export interface NoteDropdownOption {
  label: string;
  value: string;
}
