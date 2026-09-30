
import { AddressDetailsFormValues } from "./AddressDetails.types";

export const ADDRESS_DETAILS_DEFAULT_VALUES: AddressDetailsFormValues = {
    prefix: "",
    firstName: "",
    middleName: "",
    lastName: "",
    nickName: "",

    addressType: "",
    country: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    state: "",
    postcode: "",

    homeTel: "",
    officeTel: "",
    mobile1: "",
    mobile2: "",
    fax: "",
    email: "",
    preferred: "",
    alternateEmail: "",

    accessInfo: "",
    directions: "",

    identificationIndicator: "",
    customerDateOfBirth: "",
    foreignIdEIN: "",
    countryOfIssue: "",
};

export const ADDRESS_TYPE_OPTIONS = [
    {
        value: "delivery",
        label: "Delivery Address",
    },
    {
        value: "billing",
        label: "Billing Address",
    },
];

export const COUNTRY_OPTIONS = [
    {
        value: "india",
        label: "India",
    },
    {
        value: "usa",
        label: "United States",
    },
];

export const STATE_OPTIONS = [
    {
        value: "tamil-nadu",
        label: "Tamil Nadu",
    },
    {
        value: "uttar-pradesh",
        label: "Uttar Pradesh",
    },
    {
        value: "delhi",
        label: "Delhi",
    },
];

export const PREFIX_OPTIONS = [
    {
        value: "mr",
        label: "Mr.",
    },
    {
        value: "mrs",
        label: "Mrs.",
    },
    {
        value: "ms",
        label: "Ms.",
    },
    {
        value: "dr",
        label: "Dr.",
    },
]