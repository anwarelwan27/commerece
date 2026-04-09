import { createContext, useContext, useState } from "react";
import {
  authApi,
  clearSession,
  getApiErrorMessage,
  getStoredToken,
  getStoredUser,
  storeSession,
} from "../api/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const saveAuthState = (session) => {
    setUser(session.user);
    setToken(session.token);
    storeSession(session);
  };

  const register = async (payload) => {
    setIsAuthLoading(true);

    try {
      const { data } = await authApi.register(payload);
      saveAuthState(data);
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to register right now."));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const login = async (payload) => {
    setIsAuthLoading(true);

    try {
      const { data } = await authApi.login(payload);
      saveAuthState(data);
      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to log in right now."));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthLoading,
        isAuthenticated: Boolean(user && token),
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
};
