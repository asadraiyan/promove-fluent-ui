
import {
  ContainerApiRecord,
  ContainerDetails,
  ContainerRequestPayload,
  GoodsDropDetails,
  SeaContainerResponse,
} from "./SeaContainerDetails.types";

export const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export const toDate = (value: string): Date | null =>
  value ? new Date(`${value}T00:00:00`) : null;

const dateOnly = (value: string | null): string =>
  value ? value.slice(0, 10) : "";

const nullableString = (
  value: string | number | null | undefined,
): string => (value == null ? "" : String(value));

export const mapRecordToForm = (
  record: ContainerApiRecord,
): ContainerDetails => ({
  type: nullableString(record.type),
  contReg: nullableString(record.contReg),
  sealNo: nullableString(record.sealNo),
  goodsDescription: nullableString(record.goodsDescription),
  freeDays: nullableString(record.noofFreeDays),
  actualNetVolumeCft: nullableString(record.actualNetVolumeCuft),
  actualNetWeightLbs: nullableString(record.actualNetWeightLbs),
  actualNetVolumeM3: nullableString(record.actualNetVolumeM3),
  actualNetWeightKg: nullableString(record.actualNetWeightKg),
  actualGrossVolumeCft: nullableString(record.actualGrossVolumeCuft),
  actualGrossWeightLbs: nullableString(record.actualGrossWeightLbs),
  actualGrossVolumeM3: nullableString(record.actualGrossVolumeM3),
  actualGrossWeightKg: nullableString(record.actualGrossWeightKg),
  tareWeightLbs: nullableString(record.tareWeightLbs),
  tareWeightKg: nullableString(record.tareWeightKg),
  noOfPieces: nullableString(record.noOfPieces),
  noOfLiftVans: nullableString(record.noofLiftVans),
});

export const mapResponseToGoodsDropDetails = (
  response: SeaContainerResponse,
): GoodsDropDetails => ({
  dropDate: dateOnly(response.goodsDropDetails.dropDate),
  waitAndLoadDateTime: dateOnly(
    response.goodsDropDetails.waitAndLoadDateTime,
  ),
  dropAt: response.goodsDropDetails.dropAt ?? "",
});

const toNullableNumber = (value: string): number | null => {
  if (!value.trim()) return null;

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : null;
};

export const mapFormToPayload = (
  values: ContainerDetails,
): ContainerRequestPayload => {
  const numericType = toNullableNumber(values.type);

  return {
    type:
      numericType === null && values.type.trim()
        ? values.type
        : numericType,
    contReg: values.contReg || null,
    sealNo: values.sealNo || null,
    actualNetVolumeCuft: toNullableNumber(values.actualNetVolumeCft),
    actualNetWeightLbs: toNullableNumber(values.actualNetWeightLbs),
    actualNetVolumeM3: toNullableNumber(values.actualNetVolumeM3),
    actualNetWeightKg: toNullableNumber(values.actualNetWeightKg),
    noOfPieces: toNullableNumber(values.noOfPieces),
    noofLiftVans: toNullableNumber(values.noOfLiftVans),
    actualGrossVolumeCuft: toNullableNumber(values.actualGrossVolumeCft),
    actualGrossWeightLbs: toNullableNumber(values.actualGrossWeightLbs),
    actualGrossVolumeM3: toNullableNumber(values.actualGrossVolumeM3),
    actualGrossWeightKg: toNullableNumber(values.actualGrossWeightKg),
    tareWeightLbs: toNullableNumber(values.tareWeightLbs),
    tareWeightKg: toNullableNumber(values.tareWeightKg),
    noOfFreeDays: toNullableNumber(values.freeDays),
  };
};
