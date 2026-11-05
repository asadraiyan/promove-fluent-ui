import { getApiUrl } from "@/api/config";
import {
  ContainerApiRecord,
  ContainerRequestPayload,
  SeaContainerResponse,
} from "../SeaContainerDetails.types";

export type ShipmentDirection = "import" | "export";

const getErrorMessage = (action: string, status: number): string =>
  `Unable to ${action} shipment containers (${status}).`;

export const fetchShipmentContainers = async (
  goodsId: number,
  movingUnitsId?: number,
): Promise<SeaContainerResponse> => {
  const query =
    movingUnitsId === undefined
      ? ""
      : `?movingUnitsId=${encodeURIComponent(movingUnitsId)}`;
  const response = await fetch(
    getApiUrl(
      `/api/shipments/${encodeURIComponent(goodsId)}/containers${query}`,
    ),
  );
  if (!response.ok) {
    throw new Error(getErrorMessage("load", response.status));
  }
  return (await response.json()) as SeaContainerResponse;
};

export const createShipmentContainer = async (
  goodsId: number,
  direction: ShipmentDirection,
  payload: ContainerRequestPayload,
): Promise<ContainerApiRecord> => {
  const response = await fetch(
    getApiUrl(
      `/api/shipments/${encodeURIComponent(goodsId)}/containers?direction=${direction}`,
    ),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error(getErrorMessage("create", response.status));
  }
  return (await response.json()) as ContainerApiRecord;
};

export const updateShipmentContainer = async (
  goodsId: number,
  movingUnitsId: number,
  direction: ShipmentDirection,
  payload: ContainerRequestPayload,
): Promise<ContainerApiRecord> => {
  const response = await fetch(
    getApiUrl(
      `/api/shipments/${encodeURIComponent(goodsId)}/containers/${encodeURIComponent(movingUnitsId)}?direction=${direction}`,
    ),
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    throw new Error(getErrorMessage("update", response.status));
  }
  return (await response.json()) as ContainerApiRecord;
};

export const deleteShipmentContainer = async (
  goodsId: number,
  movingUnitsId: number,
  direction: ShipmentDirection,
): Promise<void> => {
  const response = await fetch(
    getApiUrl(
      `/api/shipments/${encodeURIComponent(goodsId)}/containers/${encodeURIComponent(movingUnitsId)}?direction=${direction}`,
    ),
    { method: "DELETE" },
  );
  if (!response.ok) {
    throw new Error(getErrorMessage("delete", response.status));
  }
};
