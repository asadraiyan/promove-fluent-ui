export interface AddressDetailsFormValues {
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;

  addressType: string;
  country: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  postcode: string;

  homeTel: string;
  officeTel: string;
  mobile1: string;
  mobile2: string;
  fax: string;
  email: string;
  preferred: string;
  alternateEmail: string;

  accessInfo: string;
  directions: string;

  identificationIndicator: string;
  customerDateOfBirth: string;
  foreignIdEIN: string;
  countryOfIssue: string;
}

export interface AddressReference {
  id: string;
  name: string;
}

export interface AddressPhoneNumber {
  areaCode: string;
  number: string;
}

export interface AddressDetailsResponse {
  addressId: number;
  salesFileId: number;
  addressType: string;
  ownerCode: string;
  addressTypeId: number;
  prefix: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  nickName: string | null;
  country: AddressReference | null;
  address1: string | null;
  address2: string | null;
  address3: string | null;
  city: AddressReference | null;
  state: AddressReference | null;
  postcode: string | null;
  homeTel: AddressPhoneNumber | null;
  officeTel: AddressPhoneNumber | null;
  mobile1: AddressPhoneNumber | null;
  mobile2: AddressPhoneNumber | null;
  fax: AddressPhoneNumber | null;
  email: string | null;
  alternateEmail: string | null;
  preferredContactId: number | null;
  accessInfo: string | null;
  directions: string | null;
}