export interface GoodsDropDetails {
  dropDate: string;
  waitAndLoadDateTime: string;
  dropAt: string;
}

export interface ContainerDetails extends Record<string, string> {
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

export interface ContainerRow extends ContainerDetails {
  id: string;
}

