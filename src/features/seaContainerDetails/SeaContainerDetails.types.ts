export interface GoodsDropDetails {
  dropDate: string;
  waitAndLoadDateTime: string;
  dropAt: string;
}

export interface ContainerDetails {
  type: string;
  contReg: string;
  sealNo: string;
  goodsDescription: string;
  freeDays: string;
  actualNetVolumeCft: string;
  actualNetWeightLbs: string;
  actualNetVolumeM3: string;
  actualNetWeightKg: string;
  actualGrossVolumeCft: string;
  actualGrossWeightLbs: string;
  actualGrossVolumeM3: string;
  actualGrossWeightKg: string;
  tareWeightLbs: string;
  tareWeightKg: string;
  noOfPieces: string;
  noOfLiftVans: string;
}

export interface ContainerRow
  extends ContainerDetails,
    Record<string, string | number> {
  id: string;
  movingUnitsId: number;
}

export interface ContainerApiRecord {
  movingUnitsId: number;
  goodsDescription: string | null;
  type: number | string | null;
  contReg: string | null;
  sealNo: string | null;
  actualNetVolumeCuft: number | null;
  actualNetWeightLbs: number | null;
  actualNetVolumeM3: number | null;
  actualNetWeightKg: number | null;
  noOfPieces: number | null;
  noofLiftVans: number | null;
  actualGrossVolumeCuft: number | null;
  actualGrossWeightLbs: number | null;
  actualGrossVolumeM3: number | null;
  actualGrossWeightKg: number | null;
  tareWeightLbs: number | null;
  tareWeightKg: number | null;
  noofFreeDays: number | null;
}

export interface SeaContainerResponse {
  goodsDropDetails: {
    dropDate: string | null;
    waitAndLoadDateTime: string | null;
    dropAt: string | null;
  };
  containers: ContainerApiRecord[];
  containerDetails: ContainerApiRecord | null;
}

export interface ContainerRequestPayload {
  type: number | string | null;
  contReg: string | null;
  sealNo: string | null;
  actualNetVolumeCuft: number | null;
  actualNetWeightLbs: number | null;
  actualNetVolumeM3: number | null;
  actualNetWeightKg: number | null;
  noOfPieces: number | null;
  noofLiftVans: number | null;
  actualGrossVolumeCuft: number | null;
  actualGrossWeightLbs: number | null;
  actualGrossVolumeM3: number | null;
  actualGrossWeightKg: number | null;
  tareWeightLbs: number | null;
  tareWeightKg: number | null;
  noOfFreeDays: number | null;
}
