import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../api/config";
import countries from "../data/countries.json";

export const countriesHandler = [
  http.get(getApiUrl("/countries"), () => {
    return HttpResponse.json(countries, { status: 200 });
  }),
];
