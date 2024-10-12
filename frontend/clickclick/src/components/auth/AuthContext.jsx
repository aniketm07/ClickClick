import React, { createContext, useContext, useState, useEffect } from "react";
import { checkAlreadyLoggedIn } from "../../lib/session";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(false);
  const [loading, setLoading] = useState(true);

  const initializeAuth = async () => {
    const loggedIn = await checkAlreadyLoggedIn();
    setAuthState(loggedIn);
    setLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
