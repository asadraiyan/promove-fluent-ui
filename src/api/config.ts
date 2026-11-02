export const API_BASE_URL =
  typeof process !== "undefined" && process.env.REACT_APP_API_BASE_URL
    ? process.env.REACT_APP_API_BASE_URL
    : "";

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
