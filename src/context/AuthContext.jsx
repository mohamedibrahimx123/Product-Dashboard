import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
} from "../Services/authService";

import {
  getStoredAuth,
  saveAuth,
  removeStoredAuth,
} from "../utils/authStorage";

import {
  onSessionExpired,
} from "../utils/authEvents";

export const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [auth, setAuth] = useState(
    getStoredAuth
  );

  useEffect(function () {
    return onSessionExpired(
      function () {
        removeStoredAuth();
        setAuth(null);
      }
    );
  }, []);

  async function login(
    email,
    password
  ) {
    const result = await loginUser(
      email,
      password
    );

    saveAuth(result);
    setAuth(result);

    return result;
  }

  function logout() {
    removeStoredAuth();
    setAuth(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user: auth?.user || null,
        isAuthenticated: Boolean(auth),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}