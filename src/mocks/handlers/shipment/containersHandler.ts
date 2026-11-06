import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../../api/config";
import shipmentContainers from "../../../mocks/data/seaContainerDetails/shipmentContainers.json";
import {
  ContainerApiRecord,
  ContainerRequestPayload,
  SeaContainerResponse,
} from "@/features/seaContainerDetails/SeaContainerDetails.types";

interface ShipmentContainerData {
  goodsDropDetails: SeaContainerResponse["goodsDropDetails"];
  containers: ContainerApiRecord[];
}

const containerDatabase = shipmentContainers as Record<
  string,
  ShipmentContainerData
>;
let nextMovingUnitsId = 250974;

const toContainerRecord = (
  movingUnitsId: number,
  payload: ContainerRequestPayload,
): ContainerApiRecord => ({
  movingUnitsId,
  goodsDescription: null,
  type: payload.type,
  contReg: payload.contReg,
  sealNo: payload.sealNo,
  actualNetVolumeCuft: payload.actualNetVolumeCuft,
  actualNetWeightLbs: payload.actualNetWeightLbs,
  actualNetVolumeM3: payload.actualNetVolumeM3,
  actualNetWeightKg: payload.actualNetWeightKg,
  noOfPieces: payload.noOfPieces,
  noofLiftVans: payload.noofLiftVans,
  actualGrossVolumeCuft: payload.actualGrossVolumeCuft,
  actualGrossWeightLbs: payload.actualGrossWeightLbs,
  actualGrossVolumeM3: payload.actualGrossVolumeM3,
  actualGrossWeightKg: payload.actualGrossWeightKg,
  tareWeightLbs: payload.tareWeightLbs,
  tareWeightKg: payload.tareWeightKg,
  noofFreeDays: payload.noOfFreeDays,
});

export const containersHandler = [
  http.get(
    getApiUrl("/api/shipments/:goodsId/containers"),
    ({ params, request }) => {
      const { goodsId } = params;
      const data = containerDatabase[String(goodsId)];
      if (!data) {
        return HttpResponse.json(
          { message: `Shipment ${String(goodsId)} was not found.` },
          { status: 404 },
        );
      }

      const movingUnitsId = new URL(request.url).searchParams.get(
        "movingUnitsId",
      );
      const selectedContainer = movingUnitsId
        ? data.containers.find(
            (container) => container.movingUnitsId === Number(movingUnitsId),
          )
        : data.containers[0];
      const response: SeaContainerResponse = {
        goodsDropDetails: data.goodsDropDetails,
        containers: data.containers,
        containerDetails: selectedContainer ?? null,
      };
      return HttpResponse.json(response);
    },
  ),
  http.post(
    getApiUrl("/api/shipments/:goodsId/containers"),
    async ({ params, request }) => {
      const data = containerDatabase[String(params.goodsId)];
      if (!data) {
        return HttpResponse.json(
          { message: `Shipment ${String(params.goodsId)} was not found.` },
          { status: 404 },
        );
      }

      const payload = (await request.json()) as ContainerRequestPayload;
      const container = toContainerRecord(nextMovingUnitsId++, payload);
      data.containers.push(container);
      return HttpResponse.json(container, { status: 201 });
    },
  ),
  http.put(
    getApiUrl("/api/shipments/:goodsId/containers/:movingUnitsId"),
    async ({ params, request }) => {
      const data = containerDatabase[String(params.goodsId)];
      const movingUnitsId = Number(params.movingUnitsId);
      const index = data?.containers.findIndex(
        (container) => container.movingUnitsId === movingUnitsId,
      );
      if (!data || index === undefined || index < 0) {
        return HttpResponse.json(
          { message: `Container ${String(params.movingUnitsId)} was not found.` },
          { status: 404 },
        );
      }

      const payload = (await request.json()) as ContainerRequestPayload;
      const container = toContainerRecord(movingUnitsId, payload);
      data.containers[index] = container;
      return HttpResponse.json(container);
    },
  ),
  http.delete(
    getApiUrl("/api/shipments/:goodsId/containers/:movingUnitsId"),
    ({ params }) => {
      const data = containerDatabase[String(params.goodsId)];
      const movingUnitsId = Number(params.movingUnitsId);
      const index = data?.containers.findIndex(
        (container) => container.movingUnitsId === movingUnitsId,
      );
      if (!data || index === undefined || index < 0) {
        return HttpResponse.json(
          { message: `Container ${String(params.movingUnitsId)} was not found.` },
          { status: 404 },
        );
      }

      const result = data.containers.splice(index, 1);
      return HttpResponse.json(result, { status: 200 });
    },
  ),
];
