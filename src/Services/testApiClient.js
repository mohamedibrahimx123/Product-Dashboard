import createApiClient from "./createApiClient";

import {
  mockApiAdapter,
} from "./mockApiAdapter";

const testApiClient =
  createApiClient({
    adapter:
      mockApiAdapter,
  });

export default testApiClient;