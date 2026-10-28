import type { Control } from "react-hook-form";
import type { useShipmentContentStyles } from "./ShipmentContent.styles";

export interface MoveTypeOption {
  id: string;
  from: string;
  to: string;
  mileage: string;
  cartons: string;
  volume: string;
  cans: string;
  group: string;
  questWebNumber: string;
  isfConfirmationNumber: string;
  quote: string;
  transportModeCode: string;
  isfErrorDescription: string;
  variation: string;
  tradeLane: string;
  goodsLeftAtBranch: string;
}

export interface ShipmentContentValues {
  sameAsOtherMoveType: boolean;
  moveTypeDetails: string;
  mileage: string;
  altImperial: boolean;
  releaseValue: string;
  declaredVehicleValue: string;
  cartonsPieces: string;
  cartonsVolume: string;
  ownerPrepackedVolume: string;
  totalNumber: string;
  totalVolume: string;
  tridentFile: string;
  sts: string;
  quoteNumber: string;
  variation: string;
  itnNumber: string;
  questWebNumber: string;
  isfConfirmationNumber: string;
  interfaceNotes: string;
}

export type ShipmentContentControl = Control<ShipmentContentValues>;
export type ShipmentContentStyles = ReturnType<
  typeof useShipmentContentStyles
>;
