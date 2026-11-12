export interface StaffFormValues {
  ownerCode: string;
  region: string;
  pmUserId: string;
  title: string;
  firstName: string;
  lastName: string;
  status: string;
  crewMember: string;
  crewRole: string;
  initials: string;
  timeCardRef: string;
  niRef: string;
  toleranceLevel: string;
  phoneCode: string;
  phone: string;
  faxCode: string;
  fax: string;
  email: string;
  email2: string;
  email3: string;
  marginNegative: string;
  ccaMember: string;
  marginPositive: string;
  supervisor: string;
  team: string;
  login: string;
  permissions: string[];
}

export interface StaffRecord extends Record<string, string> {
  id: string;
  ownerCode: string;
  firstName: string;
  lastName: string;
  region: string;
  pmUserId: string;
  title: string;
  status: string;
  crewMember: string;
  crewRole: string;
  initials: string;
  timeCardRef: string;
  niRef: string;
  toleranceLevel: string;
  phoneCode: string;
  phone: string;
  faxCode: string;
  fax: string;
  email: string;
  email2: string;
  email3: string;
  marginNegative: string;
  ccaMember: string;
  marginPositive: string;
  supervisor: string;
  team: string;
  login: string;
  permissions: string;
}

export interface StaffSetupHeaderProps {
  region: string;
  lastName: string;
  onRegionChange: (region: string) => void;
  onLastNameChange: (lastName: string) => void;
  onFind?: () => void;
  onClear: () => void;
}
