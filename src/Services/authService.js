export async function loginUser(
  email,
  password
) {
  await new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });

  if (!email || !password) {
    throw new Error(
      "Email and password are required"
    );
  }

  return {
    user: {
      id: 1,
      name: "Mohamed",
      email: email,
    },

    accessToken:
      "fake-access-token-123456",

    refreshToken:
      "fake-refresh-token-789012",
  };
}

export async function refreshAccessToken(
  refreshToken
) {
  await new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });

  if (!refreshToken) {
    throw new Error(
      "Refresh token is required"
    );
  }

  return {
    accessToken:
      "fake-new-access-token-654321",
  };
}