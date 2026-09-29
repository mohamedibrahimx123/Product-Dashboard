import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  clearAuth,
} from "../utils/tokenManager";

import {
  emitSessionExpired,
} from "../utils/authEvents";

import {
  refreshAccessToken,
} from "./authService";

export default function createApiClient(
  options = {}
) {
  const client = axios.create(
    options
  );

  let isRefreshing = false;

  let failedQueue = [];

  function processQueue(
    error,
    token = null
  ) {
    failedQueue.forEach(
      function (promise) {
        if (error) {
          promise.reject(error);
        } else {
          promise.resolve(token);
        }
      }
    );

    failedQueue = [];
  }

  client.interceptors.request.use(
    function (config) {
      const accessToken =
        getAccessToken();

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    }
  );

  client.interceptors.response.use(
    function (response) {
      return response;
    },

    async function (error) {
      const originalRequest =
        error.config;

      if (
        error.response?.status !== 401
      ) {
        return Promise.reject(error);
      }

      if (
        originalRequest._retry
      ) {
        clearAuth();
        emitSessionExpired();

        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(
          function (resolve, reject) {
            failedQueue.push({
              resolve,
              reject,
            });
          }
        ).then(function (token) {
          originalRequest.headers.Authorization =
            `Bearer ${token}`;

          return client(
            originalRequest
          );
        });
      }

      originalRequest._retry = true;

      isRefreshing = true;

      const refreshToken =
        getRefreshToken();

      if (!refreshToken) {
        isRefreshing = false;

        clearAuth();
        emitSessionExpired();

        return Promise.reject(error);
      }

      try {
        const result =
          await refreshAccessToken(
            refreshToken
          );

        const newAccessToken =
          result.accessToken;

        updateAccessToken(
          newAccessToken
        );

        processQueue(
          null,
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return client(
          originalRequest
        );
      } catch (refreshError) {
        processQueue(
          refreshError,
          null
        );

        clearAuth();
        emitSessionExpired();

        return Promise.reject(
          refreshError
        );
      } finally {
        isRefreshing = false;
      }
    }
  );

  return client;
}