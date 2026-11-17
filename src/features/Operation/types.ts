export type TridentAccount = {
  id: string;
  account: string;
  sfdc: string;
  address: string;
  eligibility: string;
};

export type ExcludedPerson = {
  id: string;
  name: string;
};

export type ModalFormData = {
  account: string;
  sfdc: string;
  address: string;
  eligibility: string;
};

export type AccountOption = {
  label: string;
  value: string;
  sfdc: string;
  address: string;
};
