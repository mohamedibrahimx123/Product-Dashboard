import axios from "axios";

export async function mockApiAdapter(
  config
) {
  await new Promise(function (resolve) {
    setTimeout(resolve, 500);
  });

  const authorization =
    config.headers?.Authorization;

  const validToken =
    "Bearer fake-new-access-token-654321";

  if (authorization !== validToken) {
    throw new axios.AxiosError(
      "Unauthorized",
      "ERR_BAD_REQUEST",
      config,
      null,
      {
        data: {
          message: "Unauthorized",
        },

        status: 401,

        statusText: "Unauthorized",

        headers: {},

        config,
      }
    );
  }

  return {
    data: {
      id: 1,

      name: "Mohamed",

      email:
        "mohamed@example.com",

      message:
        "This is protected data.",
    },

    status: 200,

    statusText: "OK",

    headers: {},

    config,

    request: {},
  };
}