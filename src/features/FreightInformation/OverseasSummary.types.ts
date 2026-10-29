export interface OverseasSummaryFormValues {
  serviceCoordinator: string;
  supportCoordinator: string;
  billingCoordinator: string;
  controllingBranch: string;
  revenueBranch: string;
  originAgent: string;
  destinationAgent: string;
  requiredThroughGc: string;
  cod: boolean;
  amount: string;
  currency: string;
  tradeLane: string;
  freightLane: string;
  vip: boolean;
  seaFlag: boolean;
  partialAllowance: boolean;
  confidential: boolean;
  diplomaticDesignation: boolean;
  spoc: boolean;
  estimatedVolumeNetCft: string;
  estimatedVolumeGrossCft: string;
  estimatedVolumeDensity: string;
  estimatedVolumeNetM3: string;
  estimatedVolumeGrossM3: string;
  estimatedWeightNetLbs: string;
  estimatedWeightGrossLbs: string;
  estimatedWeightNetKg: string;
  estimatedWeightGrossKg: string;
  actualVolumeNetCft: string;
  actualVolumeGrossCft: string;
  actualVolumeDensity: string;
  actualVolumeNetM3: string;
  actualVolumeGrossM3: string;
  actualWeightNetLbs: string;
  actualWeightGrossLbs: string;
  actualWeightNetKg: string;
  actualWeightGrossKg: string;
  sitWeightNetLbs: string;
  sitWeightGrossLbs: string;
  sitWeightNetKg: string;
  sitWeightGrossKg: string;
  permanentStorageNetLbs: string;
  permanentStorageGrossLbs: string;
  permanentStorageNetKg: string;
  permanentStorageGrossKg: string;
  authorizedWeight: string;
  billedWeight: string;
  partialDeliveryWeight: string;
  specialWeight: string;
  surveyWeight: string;
  costCenter: string;
  employeePersonnelNumber: string;
  affiliateCode: string;
  entitledWeight: string;
  endingAssignmentDate: string;
  housingSpendableWaiver: boolean;
  housingSpendableWaiverDate: string;
  removalType: string;
  gbl: string;
  sitNumber: string;
  origin: string;
  serviceType: string;
  serviceTypeDetails: string;
  pricingType: string;
  deliveryType: string;
  packingType: string;
  furnitureWrap: string;
  commodityType: string;
  consolCode: string;
  surveyType: string;
  portOfArrival: string;
  totalNumberOfLiftvans: string;
  workflow: string;
  shipmentOnHold: boolean;
  shipmentHoldDate: string;
  shipmentHoldReason: string;
}

export type OverseasSummaryTextFieldName = {
  [Name in keyof OverseasSummaryFormValues]: OverseasSummaryFormValues[Name] extends string
    ? Name
    : never;
}[keyof OverseasSummaryFormValues];

export type OverseasSummaryCheckboxName = {
  [Name in keyof OverseasSummaryFormValues]: OverseasSummaryFormValues[Name] extends boolean
    ? Name
    : never;
}[keyof OverseasSummaryFormValues];

export interface MeasurementRowConfig {
  label: string;
  imperialUnit: string;
  metricUnit: string;
  imperialNet: OverseasSummaryTextFieldName;
  imperialGross: OverseasSummaryTextFieldName;
  metricNet: OverseasSummaryTextFieldName;
  metricGross: OverseasSummaryTextFieldName;
  imperialDensity?: OverseasSummaryTextFieldName;
}

export interface ActionDetailsValues {
  actionDescription: string;
  enquiry: string;
  shipment: string;
  completedCancelledOn: string;
  createdBy: string;
  actionDueDate: string;
  assignedTo: string;
  actionCreatedOn: string;
  originalActionDueDate: string;
  originallyAssignedTo: string;
  modifiedOn: string;
  modifiedBy: string;
  status: string;
  comment: string;
  remarks: string;
}

export interface ShipmentActionHistoryRow {
  id: string;
  file: string;
  description: string;
  status: string;
  date: string;
  assignedTo: string;
  comment: string;
  actionDetails: ActionDetailsValues;
  createdBy: string;
}
