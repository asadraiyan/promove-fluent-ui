import { http, HttpResponse } from "msw";
import { getApiUrl } from "@/api/config";
import mockPayments from "../../data/paymentsData/mockPayments.json";

export const paymentsHandler = [
  http.get(getApiUrl("/api/payments/:salesId"), () => {
    return HttpResponse.json(mockPayments, { status: 200 });
  }),
];
