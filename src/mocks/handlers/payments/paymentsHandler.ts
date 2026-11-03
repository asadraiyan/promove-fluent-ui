import { http, HttpResponse } from "msw";
import mockExpenses from "../../data/paymentsData/expenses.json";
import mockRevenues from "../../data/paymentsData/revenues.json";
import { getApiUrl } from "@/api/config";

export const paymentsHandler = [
  http.get(getApiUrl("/api/expenses"), () => {
    return HttpResponse.json(mockExpenses, { status: 200 });
  }),
  http.get(getApiUrl("/api/revenues"), () => {
    return HttpResponse.json(mockRevenues, { status: 200 });
  }),
];
