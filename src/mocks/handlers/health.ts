import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../api/config";

export const healthHandlers = [
  http.get(getApiUrl("/health"), () => {
    return HttpResponse.json({ status: "success" }, { status: 200 });
  }),
];
