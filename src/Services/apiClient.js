import createApiClient from "./createApiClient";

const apiClient =
  createApiClient({
    baseURL:
      "https://dummyjson.com",

    timeout: 10000,
  });

export default apiClient;