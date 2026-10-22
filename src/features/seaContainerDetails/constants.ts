import { GridColumnDef } from "@/shared/components/Table/ModalTable";
import { ContainerDetails, ContainerRow, GoodsDropDetails } from "./SeaContainerDetails.types";

export const EMPTY_GOODS_DROP_DETAILS: GoodsDropDetails = {
  dropDate: "",
  waitAndLoadDateTime: "",
  dropAt: "",
};

export const EMPTY_CONTAINER: ContainerDetails = {
  type: "",
  contReg: "",
  sealNo: "",
  goodsDescription: "",
  freeDays: "",
  actualNetVolumeCft: "",
  actualNetWeightLbs: "",
  actualNetVolumeM3: "",
  actualNetWeightKg: "",
  actualGrossVolumeCft: "",
  actualGrossWeightLbs: "",
  actualGrossVolumeM3: "",
  actualGrossWeightKg: "",
  tareWeightLbs: "",
  tareWeightKg: "",
  noOfPieces: "",
  noOfLiftVans: "",
};

export const DROP_AT_OPTIONS = [
  { value: "port", label: "Port" },
  { value: "warehouse", label: "Warehouse" },
  { value: "customer", label: "Customer" },
];

export const CONTAINER_TYPE_OPTIONS = [
  { value: "20ft", label: "20 FT" },
  { value: "40ft", label: "40 FT" },
  { value: "60ft", label: "60 FT"},
];

export const CONTAINER_COLUMNS: GridColumnDef<ContainerRow>[] = [
  { key: "type", label: "Type" },
  { key: "contReg", label: "Cont Reg" },
  { key: "sealNo", label: "Seal No" },
  { key: "goodsDescription", label: "Goods Description" },
  { key: "actualNetVolumeCft", label: "Act Net Vol (cft)" },
  { key: "actualNetWeightLbs", label: "Act Net Wt (lbs)" },
  { key: "actualNetVolumeM3", label: "Act Net Vol (m3)" },
  { key: "actualNetWeightKg", label: "Act Net Wgt (kg)" },
  { key: "actualGrossVolumeCft", label: "Act Gr Vol (cft)" },
  { key: "actualGrossWeightLbs", label: "Act Gr Wt (lbs)" },
  { key: "actualGrossVolumeM3", label: "Act Gr Vol (m3)" },
  { key: "actualGrossWeightKg", label: "Act Gr Wgt (kg)" },
  { key: "tareWeightLbs", label: "Tare Wt (lbs)" },
  { key: "tareWeightKg", label: "Tare Wt (kg)" },
  { key: "freeDays", label: "# of Free Days" },
  { key: "noOfPieces", label: "No of Pieces" },
  { key: "noOfLiftVans", label: "No of Lift Vans" },
];
