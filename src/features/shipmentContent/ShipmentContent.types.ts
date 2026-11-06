import type { Control } from "react-hook-form";
import type { useShipmentContentStyles } from "./ShipmentContent.styles";

export interface MoveTypeOption {
  id: string;
  from: string;
  to: string;
  mileage: number | string;
  cartons: number | string;
  volume: number | string;
  cans: string | null;
  groupNumber?: number | string;
  questwebNumber: string | null;
  isfConfirmationNumber: string | null;
  quoteNumber: string | null;
  transportModeCode: string | null;
  isfErrorDescription: string | null;
  variation: string | null;
  tradeLane: string | null;
  goodsLeftAtBranchDate: string | null;
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

export interface ShipmentContentApiResponse {
  groupNumber: number;
  contents: {
    cartonsPiecesNumber: number | null;
    cartonsPiecesVolume: number | null;
    ownerPrepackedVolume: number | null;
    totalNumber: number | null;
    totalVolume: number | null;
    cratesNumber: number | null;
  };
  interfaces: {
    quoteNumber: string | null;
    variation: string | null;
    itnNumber: string | null;
    questwebNumber: string | null;
    isfConfirmationNumber: string | null;
    isfErrorDescription: string | null;
    transportModeCode: string | null;
  };
  vehicle: {
    mileage: number | null;
    declaredValueOfVehicles: number | null;
    releaseValueOfGoods: number | null;
  };
  summary: {
    liftVans: number | null;
    crates: number | null;
    overflow: number | null;
    airContainers: number | null;
  };
  moveTypeOptions: MoveTypeOption[];
}

export type ShipmentContentControl = Control<ShipmentContentValues>;
export type ShipmentContentStyles = ReturnType<typeof useShipmentContentStyles>;
