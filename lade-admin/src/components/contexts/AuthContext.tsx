// src/context/OrderContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { axiosInstance } from "../lib/axios";

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  loading: boolean;
}

interface UserType {
  email: string;
  name: string,
  last_name: string,
  account_img: string,
  password: string
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserType>();

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      setIsAuthenticated(res.status === 200);
      setUserData({
        email: res.data.email,
        name: res.data.name,
        last_name: res.data.last_name,
        account_img: res.data.account_img,
        password: res.data.password
      });
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkAuth, loading, userData,setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
