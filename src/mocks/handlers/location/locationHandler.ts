import { http, HttpResponse } from "msw";
import { getApiUrl } from "../../../api/config";
import countries from "../../data/locationData/countries.json";
import states from "../../data/locationData/states.json";
import cities from "../../data/locationData/cities.json";

export const locationHandler = [
  http.get(getApiUrl("/countries"), () => {
    return HttpResponse.json(countries, { status: 200 });
  }),
  http.get(getApiUrl("/states"), ({ request }) => {
    const countryCode = new URL(request.url).searchParams.get("countryCode");
    const results = countryCode
      ? states.filter((state) => state.countryCode === countryCode)
      : states;

    return HttpResponse.json(results);
  }),
  http.get(getApiUrl("/cities"), ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const countryCode = searchParams.get("countryCode");
    const stateCode = searchParams.get("stateCode");
    const search = searchParams.get("search")?.trim().toLowerCase();
    const results = cities.filter(
      (city) =>
        (!countryCode || city.countryCode === countryCode) &&
        (!stateCode || city.stateCode === stateCode) &&
        (!search || city.description.toLowerCase().startsWith(search)),
    );

    return HttpResponse.json(results);
  }),
];
