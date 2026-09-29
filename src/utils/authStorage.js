const AUTH_STORAGE_KEY = "auth_data";

export function getStoredAuth() {
  const savedAuth =
    localStorage.getItem(AUTH_STORAGE_KEY);

  if (!savedAuth) {
    return null;
  }

  try {
    const parsedAuth =
      JSON.parse(savedAuth);

    if (
      !parsedAuth ||
      typeof parsedAuth !== "object"
    ) {
      return null;
    }

    if (
      !parsedAuth.user ||
      !parsedAuth.accessToken ||
      !parsedAuth.refreshToken
    ) {
      return null;
    }

    return parsedAuth;
  } catch (error) {
    console.error(
      "Failed to parse saved auth:",
      error
    );

    return null;
  }
}

export function saveAuth(authData) {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(authData)
  );
}

export function removeStoredAuth() {
  localStorage.removeItem(
    AUTH_STORAGE_KEY
  );
}