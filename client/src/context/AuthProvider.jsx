import { useEffect, useState } from "react";
import {
  clearStoredToken,
  getStoredToken,
  storeToken,
} from "../services/authStorage";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./AuthService";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = getStoredToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        clearStoredToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(formData, rememberDevice = false) {
    const authData = await loginUser(formData);

    storeToken(authData.token, rememberDevice);
    setUser(authData.user);

    return authData.user;
  }

  async function register(formData) {
    const authData = await registerUser(formData);

    storeToken(authData.token);
    setUser(authData.user);

    return authData.user;
  }

  async function logout() {
    try {
      await logoutUser();
    } finally {
      clearStoredToken();
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
