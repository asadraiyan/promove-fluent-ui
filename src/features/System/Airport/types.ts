export interface AirportRecord {
  id: string;
  airportCode: string;
  ownerCode: string;
  description: string;
  status: string;
  modificationUser: string;
  modificationDate: string;
  pqPortTown: string;
  cityId: string;
  stateId: string;
}

export interface AirportFormValues {
  airportCode: string;
  description: string;
  status: string;
}

export interface AirportFilterValues {
  airportCode: string;
  description: string;
  showBlocked: boolean;
}
