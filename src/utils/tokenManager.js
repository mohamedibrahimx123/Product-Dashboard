import {
  getStoredAuth,
  saveAuth,
  removeStoredAuth,
} from "./authStorage";

export function getAccessToken() {
  const auth = getStoredAuth();

  return auth?.accessToken || null;
}

export function getRefreshToken() {
  const auth = getStoredAuth();

  return auth?.refreshToken || null;
}

export function updateAccessToken(
  accessToken
) {
  const auth = getStoredAuth();

  if (!auth) {
    return;
  }

  const updatedAuth = {
    ...auth,
    accessToken,
  };

  saveAuth(updatedAuth);
}

export function clearAuth() {
  removeStoredAuth();
}