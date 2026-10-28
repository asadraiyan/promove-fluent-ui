import type { GridColumnDef } from "@/shared";
import type {
  MoveTypeOption,
  ShipmentContentValues,
} from "./ShipmentContent.types";

export const moveTypeOptions: MoveTypeOption[] = [
  {
    id: "move-1",
    from: "US, Colorado Springs, 1450 Michelle C",
    to: "DE, Baumholder",
    mileage: "1564.28",
    cartons: "0",
    volume: "0.00",
    cans: "0",
    group: "1",
    questWebNumber: "",
    isfConfirmationNumber: "",
    quote: "",
    transportModeCode: "SEA",
    isfErrorDescription: "",
    variation: "",
    tradeLane: "",
    goodsLeftAtBranch: "",
  },
];

export const moveTypeColumns: GridColumnDef<MoveTypeOption>[] = [
  { key: "from", label: "From", minWidth: 250 },
  { key: "to", label: "To", minWidth: 180 },
  { key: "mileage", label: "Mileage", minWidth: 100 },
  { key: "cartons", label: "Cartons", minWidth: 90 },
  { key: "volume", label: "Vol.", minWidth: 90 },
  { key: "cans", label: "Cans", minWidth: 80 },
  { key: "group", label: "Group", minWidth: 80 },
  { key: "questWebNumber", label: "Questweb #", minWidth: 130 },
  {
    key: "isfConfirmationNumber",
    label: "ISF Confirmation #",
    minWidth: 160,
  },
  { key: "quote", label: "Quote", minWidth: 100 },
  { key: "transportModeCode", label: "Transport Mode Code", minWidth: 170 },
  { key: "isfErrorDescription", label: "ISF_ERROR_DESC", minWidth: 170 },
  { key: "variation", label: "VARIATION", minWidth: 120 },
  { key: "tradeLane", label: "TRADE_LANE", minWidth: 130 },
  {
    key: "goodsLeftAtBranch",
    label: "GOODS_LEFT_AT_BRANCH",
    minWidth: 190,
  },
];

export const defaultShipmentContentValues: ShipmentContentValues = {
  sameAsOtherMoveType: false,
  moveTypeDetails: "",
  mileage: "972",
  altImperial: false,
  releaseValue: "19280.00",
  declaredVehicleValue: "",
  cartonsPieces: "0",
  cartonsVolume: "0",
  ownerPrepackedVolume: "0",
  totalNumber: "0",
  totalVolume: "0",
  tridentFile: "",
  sts: "",
  quoteNumber: "",
  variation: "",
  itnNumber: "",
  questWebNumber: "",
  isfConfirmationNumber: "",
  interfaceNotes: "",
};
