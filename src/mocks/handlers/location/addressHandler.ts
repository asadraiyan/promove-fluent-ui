import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../../api/config";
import addressDetails from "../../data/addressData/addressDetails.json";
import enquiryAddresses from "../../data/addressData/enquiryAddresses.json";
import { AddressDetailsResponse } from "@/features/address/AddressDetails.types";
import { AddressListRow } from "@/features/address/reducers/addressListSlice";

const addressDetailsData = [...(addressDetails as AddressDetailsResponse[])];
const addressListDate = [...(enquiryAddresses as AddressListRow[])];

const toAddressListRow = (address: AddressDetailsResponse): AddressListRow => ({
  addressId: address.addressId,
  addressTypeId: address.addressTypeId,
  addressType: address.addressType,
  name: [address.prefix, address.firstName, address.lastName]
    .filter(Boolean)
    .join(" "),
  address: [address.address1, address.address2, address.address3]
    .filter((part): part is string => Boolean(part))
    .join(", "),
  city: address.city?.name ?? "",
  country: address.country?.name.toUpperCase() ?? "",
});

export const addressHandler = [
  http.get(getApiUrl("/enquiryAddresses"), () =>
    HttpResponse.json(addressListDate),
  ),
  http.get(getApiUrl("/api/addresses/:addressId"), ({ params }) => {
    const addressId = Number(params.addressId);
    const address = addressDetailsData.find(
      (item) => item.addressId === addressId,
    );

    return address
      ? HttpResponse.json(address)
      : HttpResponse.json(
          { message: `Address ${String(params.addressId)} was not found.` },
          { status: 404 },
        );
  }),
  http.get(getApiUrl("/api/enquiries/:salesFileId/addresses"), ({ params }) => {
    const salesFileId = Number(params.salesFileId);
    const rows = addressDetailsData
      .filter((address) => address.salesFileId === salesFileId)
      .map(toAddressListRow);

    return HttpResponse.json(rows);
  }),
];
